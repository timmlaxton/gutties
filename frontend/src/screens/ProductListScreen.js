import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts, deleteProduct, productCreate } from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'


const ProductListScreen = ({history, match}) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products} = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    dispatch({type: PRODUCT_CREATE_RESET})

    if(!userInfo && userInfo.isAdmin) {
      history.push('/login')
    }
      if(successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure')){
      dispatch(deleteProduct(id))
    }
  }

  const createproductHandler = (id) => {
    history.push(`/admin/product/create`)

    
  }

  return (
    <>
    <Row className='align-items-center'>
      <Col>
      <h1>Stock</h1>
      </Col>
      <Col className='text-right'>
        <Button className='my-3' onClick={createproductHandler}>
          <i className='fas fa-plus'></i>
          Add New Stock
        </Button>
      </Col>
    </Row>
    {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message> }
      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message> }
      {loading ? ( <Loader/> ) : error ? ( <Message variant='danger'>{error}</Message>
      ) : (
        <>
    <Table bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>brand</th>
          <th>price</th>
          <th>stock</th>
        </tr>
      </thead>
      <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td> {product.brand}</td>
                <td> £{product.price}</td>
                <td>  {product.countInStock}</td>
                  <td> 
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-dm' onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody> 
    </Table>
    </>
  )}
    </>
  )
}

export default ProductListScreen
