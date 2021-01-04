import asyncHandler from 'express-async-handler'
import Order from '../models/productModel.js'


// create new products
// POST /api/orders
// private
const addOrderItems = asyncHandler(async (req, res) => {
  const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totlaprice} = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totlaprice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

export {
  addOrderItems
}