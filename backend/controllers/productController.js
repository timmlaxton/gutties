import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Fetch all products
// GET /api/products
// public
const getProducts = asyncHandler(async (req, res) => {
	const { keyword, size, colour, brand } = req.query;
	let payload = {};

	if (keyword) {
		payload.$or = [
			{
				name: {
					$regex: keyword,
					$options: 'i'
				}
			},
			{
				brand: {
					$regex: keyword,
					$options: 'i'
				}
			},
			{
				category: {
					$regex: keyword,
					$options: 'i'
				}
			}
		];

		/*payload.name = {
			$regex: keyword,
			$options: 'i'
		};*/
	}

	if (size) {
		payload.size = parseInt(size);
	}

	if (colour) {
		payload.colour = {
			$regex: colour,
			$options: 'i'
		};
	}

	if (brand) {
		payload.brand = {
			$regex: brand,
			$options: 'i'
		};
	}
	console.log({ payload });
	const products = await Product.find(payload);
	console.log({ products });
	res.json(products);
});

// Fetch a single products
// GET /api/products/:id
// public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// Delete a  products
// DELETE /api/products/:id
// private admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ msessage: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// Create a product
// POST /api/products
// private admin
const createProduct = asyncHandler(async (req, res) => {
	const { name, image, brand, category, size, colour, price, countInStock, description, featured } = req.body;
	const product = new Product({
		name,
		image,
		brand,
		category,
		size,
		price,
		countInStock,
		description,
		featured,
		colour
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// Update product
// PUT /api/products/:id
// private admin

const updateProduct = asyncHandler(async (req, res) => {
	const { name, image, brand, category, size, price, colour, countInStock, description, featured } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.size = size;
		product.price = price;
		product.countInStock = countInStock;
		product.description = description;
		product.featured = featured;
		product.colour = colour;

		if (image) {
			product.image = image;
		}

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Errro('Product not found');
	}
});

// Create new Review
// PUT /api/products/:id/reviews
// private
const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.user.name,
			rating: Number(rating),
			comment,
			user: req.user._id
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added' });
	} else {
		res.status(404);
		throw new Errro('Product not found');
	}
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview };
