import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// Fetch all products
// GET /api/products
// public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})


// Fetch a single products
// GET /api/products/:id
// public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// Delete a  products
// DELETE /api/products/:id
// private admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    await product.remove()
    res.json({msessage: 'Product removed'})
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts, getProductById, deleteProduct
}