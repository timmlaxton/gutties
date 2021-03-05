import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import LazyHero from 'react-lazy-hero';

const HomeScreen = () => {
	return (
		<div className="title-container">
			<LazyHero
				className="hero"
				imageSrc="https://images.unsplash.com/photo-1490525535718-60047f3c8a09?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80"
			></LazyHero>

			<h2 className="title">Gutties: Trainers for kicking about in</h2>
		</div>
	);
};

export default HomeScreen;
