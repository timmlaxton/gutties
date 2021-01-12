import express from 'express'
const router = express.Router()
import { deleteProduct, getProductById, getProducts, createProduct } from '../controllers/productController.js'
import {protect, admin} from '../middleware/authMddleware.js'


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id', ).get(getProductById).delete(protect, admin, deleteProduct)


export default router