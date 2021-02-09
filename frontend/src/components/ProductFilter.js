import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useURLQuery } from '../hooks';
const SIZES = [
	{
		label: 'Size 1',
		value: '1'
	},
	{
		label: 'Size 7',
		value: '7'
	},
	{
		label: 'Size 8',
		value: '8'
	},
	{
		label: 'Size 9',
		value: '9'
	},
	{
		label: 'Size 10',
		value: '10'
	}
];

const COLOURS = [
	{
		label: 'White',
		value: 'white'
	},
	{
		label: 'Black',
		value: 'black'
	},
	{
		label: 'Green',
		value: 'green'
	},
	{
		label: 'Blue',
		value: 'blue'
	}
];

const ProductFilter = (props) => {
	const query = useURLQuery();
	const history = useHistory();
	const params = useParams();

	const [form, setForm] = useState({
		size: query.get('size') || '',
		colour: query.get('colour') || ''
	});

	const onFilterChange = (formKey) => (e) => {
		const value = e.target.value;
		const updatedForm = {
			...form,
			[formKey]: value
		};
		setForm(updatedForm);
		const { keyword = '' } = params;
		history.push(`/search/${keyword}?size=${updatedForm.size}&colour=${updatedForm.colour}`);
	};

	useEffect(() => {
		if (!params.keyword) {
			setForm({
				size: '',
				colour: ''
			});
			history.replace('/');
		}
	}, [params.keyword]);

	console.log('props', props);

	return (
		<div>
			<Form>
				<Form.Group>
					<Form.Label>Shoe size</Form.Label>
					<Form.Control as="select" onChange={onFilterChange('size')} custom>
						<option value="" selected={form.size === ''}>
							Select size
						</option>
						{SIZES.map((size) => {
							return (
								<option value={size.value} key={size.value} selected={size.value === form.size}>
									{size.label}
								</option>
							);
						})}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Colour</Form.Label>
					<Form.Control as="select" onChange={onFilterChange('colour')} custom>
						<option value="" selected={form.colour === ''}>
							Select colour
						</option>
						{COLOURS.map((colour) => {
							return (
								<option value={colour.value} key={colour.value} selected={colour.value === form.colour}>
									{colour.label}
								</option>
							);
						})}
					</Form.Control>
				</Form.Group>
			</Form>
		</div>
	);
};

export default ProductFilter;
