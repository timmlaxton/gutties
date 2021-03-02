import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useURLQuery } from '../hooks';
const SIZES = [
	{
		label: 'Size 1',
		value: '1'
	},
	{
		label: 'Size 2',
		value: '2'
	},
	{
		label: 'Size 3',
		value: '3'
	},
	{
		label: 'Size 4',
		value: '4'
	},
	{
		label: 'Size 5',
		value: '5'
	},
	{
		label: 'Size 6',
		value: '6'
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
	},
	{
		label: 'Size 11',
		value: '11'
	},
	{
		label: 'Size 12',
		value: '12'
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
	},
	{
		label: 'Red',
		value: 'red'
	},
	{
		label: 'Brown',
		value: 'brown'
	}
];

const BRANDS = [
	{
		label: 'Adidas',
		value: 'adidas'
	},
	{
		label: 'Nike',
		value: 'nike'
	},
	{
		label: 'New Balance',
		value: 'new balance'
	},
	{
		label: 'Converse',
		value: 'converse'
	},
	{
		label: 'Puma',
		value: 'puma'
	}
];

const ProductFilter = (props) => {
	const query = useURLQuery();
	const history = useHistory();
	const params = useParams();

	const [form, setForm] = useState({
		size: query.get('size') || '',
		colour: query.get('colour') || '',
		brand: query.get('brand') || ''
	});

	const onFilterChange = (formKey) => (e) => {
		const value = e.target.value;
		const updatedForm = {
			...form,
			[formKey]: value
		};
		setForm(updatedForm);
		const { keyword = '' } = params;
		history.push(`/search/${keyword}?size=${updatedForm.size}&colour=${updatedForm.colour}&brand=${updatedForm.brand}`);
	};

	const resetFilters = () => {
		setForm({
			size: '',
			colour: '',
			brand: ''
		});

		history.replace('/');
	};

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
				<Form.Group>
					<Form.Label>Brand</Form.Label>
					<Form.Control as="select" onChange={onFilterChange('brand')} custom>
						<option value="" selected={form.brand === ''}>
							Select Brand
						</option>
						{BRANDS.map((brand) => {
							return (
								<option value={brand.value} key={brand.value} selected={brand.value === form.brand}>
									{brand.label}
								</option>
							);
						})}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Button variant="link" onClick={resetFilters}>
						Reset filters
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default ProductFilter;
