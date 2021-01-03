import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-3'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
              <Nav.Link>
                Log In
              </Nav.Link>
          </LinkContainer>
          ):(
         <Nav.Link disabled>
                Log In
              </Nav.Link>
               )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
              <Nav.Link>
                Delivery Details
              </Nav.Link>
          </LinkContainer>
          ):(
         <Nav.Link disabled>
                Delivery Details
              </Nav.Link>
               )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/login'>
              <Nav.Link>
                Payment
              </Nav.Link>
          </LinkContainer>
          ):(
         <Nav.Link disabled>
                Payment
              </Nav.Link>
               )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/login'>
              <Nav.Link>
               Place Order
              </Nav.Link>
          </LinkContainer>
          ):(
         <Nav.Link disabled>
                Place Order
              </Nav.Link>
               )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
