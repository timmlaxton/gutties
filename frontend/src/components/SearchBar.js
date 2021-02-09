import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
export const SearchBar = (props) => {
	const { history } = props;
	const [keyword, setKeyword] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}${history.location.search}`);
		} else {
			history.push(`/${history.location.search}`);
		}
	};

	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Search gutties"
				className="mr-sm-2 ml-sm-5"
			></Form.Control>

			<Button type="submit" variant="outline-black" className="p-2">
				Search
			</Button>
		</Form>
	);
};

export default SearchBar;
