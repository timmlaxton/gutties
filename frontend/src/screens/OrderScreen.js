import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card, Form,} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails} from '../actions/orderActions'
import {addToCart, removeFromCart} from '../actions/cartActions'



const OrderScreen = ({match}) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error} = orderDetails

if(!loading) {
    const addDecimals = (num) => {
      return (Math.round(num *100) / 100).toFixed(2)
  }
  
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  }
 

  useEffect(() => {
    if(!order || order._id !== orderId) {
        dispatch(getOrderDetails(orderId))
    }
}, [order, orderId])

  
  
  return (
  loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
  <h1>Order {order._id}</h1>
  <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Delivery address</h2> 
                    <Col md={3}> 
                      {order.shippingAddress.name},  {' '} 
                      {order.shippingAddress.number}, {' '} 
                      {order.shippingAddress.address}, {' '}  
                      {order.shippingAddress.city}, {'  '}
                      {order.shippingAddress.postCode},{' '}
                      {order.shippingAddress.country}
                    </Col>
                    
                  </ListGroup.Item>

   

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {order.paymentMethod} <i class="fab fa-paypal"></i>
                    {order.isPaid ? ( <Message variant='success'>Paid on {order.paidAt}</Message> ) : (
                    <Message variant='danger'>Please pay to confirm order</Message> )}
                  </ListGroup.Item>

                  <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty <Link to="/">return to homepage</Link></Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price}  = £{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
           </ListGroup>
         </Col>
         
         <Col md={4}>
           <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
              <ListGroup.Item> 
              <Row>
                <Col>Items</Col>
                <Col>£{order.itemsPrice}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item> 
              <Row>
                <Col>Postage & Packing</Col>
                <Col>£{order.shippingPrice}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item> 
              <Row>
                <Col>Total Price</Col>
                <Col>£{order.totalPrice}</Col>
              </Row>
              </ListGroup.Item>
             
              </ListGroup>
           </Card>
         </Col>
       </Row>
   </>
  )
}

export default OrderScreen