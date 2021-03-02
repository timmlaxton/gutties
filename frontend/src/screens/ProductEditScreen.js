import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, createProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id;

	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState(false);
	const [size, setSize] = useState(0);
	const [colour, setColour] = useState('');
	const [price, setPrice] = useState(0);
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [featured, setFeatured] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	const dispatch = useDispatch();

	const isCreateProductMode = match.path.includes('/admin/product/create');

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => (isCreateProductMode ? state.productCreate : state.productUpdate));
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

	useEffect(() => {
		if (!isCreateProductMode) {
			dispatch(listProductDetails(productId));
		}
	}, []);

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: isCreateProductMode ? PRODUCT_CREATE_RESET : PRODUCT_UPDATE_RESET });
			history.push('/admin/productlist');
		}
		if (isCreateProductMode) return;

		setName(product.name);
		setBrand(product.brand);
		setCategory(product.category);
		setSize(product.size);
		setColour(product.colour);
		setPrice(product.price);
		setImagePreview(product.image);
		setCountInStock(product.countInStock);
		setDescription(product.description);
		setFeatured(product.featured);
	}, [dispatch, productId, product, history, successUpdate, isCreateProductMode]);

	const onUploadImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				setImagePreview(e.target.result);
			};

			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	const uploadFileHandler = async () => {
		if (!image) return '';
		const file = image;
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			const { data } = await axios.post('/api/upload', formData, config);

			// setImage(data)
			return data;
			// setUploading(false)
		} catch (error) {
			console.error(error);
			setUploading(false);
			throw new Error('There was a problem');
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		let finalImage = imageUrl;
		if (!finalImage && image) {
			finalImage = await uploadFileHandler();
		}

		const payload = {
			_id: productId,
			name,
			brand,
			category,
			size,
			colour,
			price,
			countInStock,
			description,
			featured,
			...(finalImage && { image: finalImage })
		};

		dispatch(isCreateProductMode ? createProduct(payload) : updateProduct(payload));
	};

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>{isCreateProductMode ? 'Create Product' : 'Edit Product'}</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId="name">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="name"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="brand"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>

						{
							<Form.Group controlId="size">
								<Form.Label>Select size</Form.Label>
								<Form.Control as="select" onChange={(e) => setSize(e.target.value)}>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
								</Form.Control>
							</Form.Group>
						}

						<Form.Group controlId="colour">
							<Form.Label>Colour</Form.Label>
							<Form.Control
								type="colour"
								placeholder="Enter colour"
								value={colour}
								onChange={(e) => setColour(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="category">
							<Form.Label>Select Category</Form.Label>
							<Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
								<option value="Trainers">Trainers</option>
								<option value="Boots">Boots</option>
								<option value="Shoes">Shoes</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							></Form.Control>

							<Form.File id="image-file" label="Choose File" custom onChange={onUploadImage}></Form.File>
							{uploading && <Loader />}
						</Form.Group>

						{imagePreview ? <Image src={imagePreview} fluid /> : null}

						<Form.Group controlId="countInStock">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter number of stock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								placeholder="Enter description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={3}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="featured">
							<Form.Label>Featured</Form.Label>
							<Form.Check
								checked={featured}
								type="checkbox"
								onChange={(e) => setFeatured(e.target.checked)}
							></Form.Check>
						</Form.Group>

						<Button type="submit" variant="primary">
							{isCreateProductMode ? 'Create' : 'Update'}
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
