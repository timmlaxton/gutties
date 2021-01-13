import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'
import Product from '../models/productModel.js'


// @desc    Create new order
// @route   POST /api/order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400).send({
      error: true,
      message: 'No order items'
    })
    return
  } 
  
  const session = await mongoose.startSession()
  
  try {
    await session.withTransaction(async () => {
      const {productsById, productIds} = orderItems.reduce((acc, product) => {
        acc.productsById[product.product] = product
        acc.productIds.push(product.product)
        return acc
      }, {productsById: {}, productIds: []})

      console.log('productIds', {productIds, productsById})
      const products = await Product.find({_id: {
        $in: productIds
      }})
      

      const result = await Promise.all(products.map(productDoc => {
        return (async () => {
          console.log(productDoc)
          const orderProduct = productsById[productDoc._id]
          const orderProductPrice = parseFloat(orderProduct.price)
          const productPrice = parseFloat(productDoc.price)
          if (productDoc.countInStock < orderProduct.qty) throw new Error(`${productDoc.name} is out of stock!`)
          if (productPrice !== orderProductPrice) throw new Error(`${productDoc.name} has price mismatch! Current price: ${productDoc.price}, provided price: ${orderProduct.price}`)
          
          productDoc.countInStock = productDoc.countInStock - orderProduct.qty
          console.log('Count in stock', productDoc.countInStock)
          return productDoc.save({session})
        })()
      }))
      console.log(result)    
      
      const createdOrder = await Order.create([{
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }], {session})
  
      res.status(201).json(createdOrder?.[0])  
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: true,
      message: error.message
    })
  } finally {
    session.endSession()
  }
})

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID 
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
const order = await (await Order.findById(req.params.id)).populate('user', 'name email')

if(order) {
  res.json(order)
} else {
  res.status(404)
  throw new Error('Order not found')
}

})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  
  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    
  const updatedOrder = await order.save()

  res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
  
  })

  // @desc    Update order to delivered
// @route   GET /api/orders:id/deliver
// @access  Private Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get users orders
// @route   GET /api/orders/myorders
// @access  Private
  const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  res.json(orders)
  
  })

// @desc    Get users orders
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
  
})
  


export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, createOrder, updateOrderToDelivered}