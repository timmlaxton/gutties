import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import {addToCart, removeFromCart} from '../actions/cartActions'



const PlaceOrderScreen = ({history, match, location}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const productId = match.params.id
 

  
  const addDecimals = (num) => {
    return (Math.round(num *100) / 100).toFixed(2)
}

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

  cart.shippingPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)

 

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error, message: errorMessage} = orderCreate

  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId))
    } 
    if(success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success, dispatch, productId])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod = "paypal",
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  return (
    <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
              <Col md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Delivery address</h2> 
                    <Col md={3}> 
                      {cart.shippingAddress.name}, {'  '}  
                      {cart.shippingAddress.number}, {'  '} 
                      {cart.shippingAddress.address}, {' '}  
                      {cart.shippingAddress.city}, {'  '}
                      {cart.shippingAddress.postCode},{' '}
                      {cart.shippingAddress.country}
                    </Col>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod} <i class="fab fa-paypal"></i>

                  </ListGroup.Item>

                  <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to="/">return to homepage</Link></Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
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
                        <Col>Qty</Col>
                    <Col>
                    <Form.Control
                  as='select'
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(
                      addToCart(item.product, Number(e.target.value))
                    )
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
                    </Col>
                        <Col md={4}>
                          {item.qty} x  = £{item.qty * item.price}
                          <Button
                  type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <i className='fas fa-trash'></i>
                </Button>
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
                <Col>£{cart.itemsPrice}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item> 
              <Row>
                <Col>Postage & Packing</Col>
                <Col>£{cart.shippingPrice}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item> 
              <Row>
                <Col>Total Price</Col>
                <Col>£{cart.totalPrice}</Col>
              </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              {error && <Message variant='danger'>{errorMessage}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block' 
                disabled={cart.cartItmed === 0}
                onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
              </ListGroup>
           </Card>
         </Col>
       </Row>
    </>
  )
}

export default PlaceOrderScreen