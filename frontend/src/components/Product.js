import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
	return (
		<Card className="my-1 p-6">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div" className="mb-1">
						<strong>{product.brand}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div" className="mb-2">
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text>£{product.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
