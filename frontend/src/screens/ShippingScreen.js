import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'


const ShippingScreen = ({history}) => {
  const cart = useSelector(state => state.cart)
  const {shippingAddress}  = cart


  const [number, setNumber] = useState(shippingAddress.number)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postCode, setPostCode] = useState(shippingAddress.postCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({number, address, city, postCode, country}))
    history.push('/payment')
  }
  
  return <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Delivery Details</h1>
      <br/>
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='number'>
          <Form.Label> House / Flat Number</Form.Label>
          <Form.Control 
          type='text' 
          placeholder="Enter house / flat number" 
          value={number} 
          required
          onChange={(e) => setNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>


      <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
          type='text' 
          placeholder="Enter address" 
          value={address} 
          required
          onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control 
          type='text' 
          placeholder="Enter city" 
          value={city} 
          required
          onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postCode'>
          <Form.Label>PostCode</Form.Label>
          <Form.Control 
          type='text' 
          placeholder="Enter postcode" 
          value={postCode} 
          required
          onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control 
          type='text' 
          placeholder="Enter Country" 
          value={country} 
          required
          onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        
        <Button className='justify-content-center' type='submit' variant='primary'  >
          Continue
        </Button>
      </Form>
     </FormContainer>
     
  
}

export default ShippingScreen
