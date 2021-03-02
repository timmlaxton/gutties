import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';
import ProductFilter from '../components/ProductFilter';
import { useURLQuery } from '../hooks';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword || '';
	const query = useURLQuery();
	const size = query.get('size');
	const colour = query.get('colour');
	const brand = query.get('brand');
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(
			listProducts(keyword, {
				size,
				colour,
				brand
			})
		);
	}, [dispatch, keyword, size, colour, brand]);

	return (
		<Row>
			<Col xs={3}>
				<h2>Filter</h2>
				<ProductFilter />
			</Col>
			<Col xs={9}>
				<h1>Trainers</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">{error}</Message>
				) : (
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				)}
			</Col>
		</Row>
	);
};

export default HomeScreen;
