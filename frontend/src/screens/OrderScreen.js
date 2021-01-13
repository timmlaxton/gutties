import React, {useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'

  const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

  const OrderScreen = ({match, history}) => {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error} = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay} = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver} = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo} = userLogin

  const itemsPrice = React.useMemo(() => {
    return Array.isArray(order?.orderItems) ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0) : 0
  }, [order?.orderItems])

    
  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    }
    const addPayPalScript = async () => {
      const {data: clientId} = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      } 
      document.body.appendChild(script)
    }

    if(!order || successPay || successDeliver ) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))
    } else if(!order.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo ])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  
  return  loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
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
                    {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}
                    </Message> : <Message variant='danger'>This item is still to be shipped</Message>}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {order.paymentMethod} <i className="fab fa-paypal"></i>
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
                <Col>£{itemsPrice}</Col>
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
              {!order.isPaid && (
                 <ListGroup.Item>
                   {loadingPay && <Loader /> }
                   {!sdkReady ? ( <Loader/> ) : (
                     <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}
                     />
                   )}
                 </ListGroup.Item>
               )}
               {loadingDeliver && <Loader/>}
               {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                 <ListGroup.Item>
                   <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                     Delivered?
                   </Button>
                 </ListGroup.Item>
               )}
              </ListGroup>
           </Card>
         </Col>
       </Row>
   </>
  
}

export default OrderScreen