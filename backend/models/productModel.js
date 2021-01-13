import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({

  name: {type: String, required: true},
  rating: {type: Number, required: true},
  comment: {type: String, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
}, 
{
  timestamps: true
})

const productSchema = mongoose.Schema(
  {
    
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true, 
  },
  size: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true, 
    defualt: 0
  },
  // colour: {
  //   type: String,
  //   required: true, 
  // },
  countInStock: {
    type: Number,
    required: true, 
    defualt: 0
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true, 
    default: 0
  },
  description: {
    type: String,
    required: true, 
  },
  numReviews: {
    type: Number,
    required: true, 
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
}, 
{
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product