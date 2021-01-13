import React from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, NavDropdown, Navbar, Container} from 'react-bootstrap';
import {SearchBar} from '../components/SearchBar'
import {logout} from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container> 
          <LinkContainer to='/'> 
  <Navbar.Brand>Gutties</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    
      <Nav className="mr-auto"> 
      <NavDropdown title="Men's" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">New</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Trainers</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Boots</NavDropdown.Item>
        
      </NavDropdown>
      <NavDropdown title="Women's" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        
      </NavDropdown>
      <NavDropdown title="Kids" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      </NavDropdown>
      </Nav>
     
    
    <Route render={({history}) => <SearchBar history={history} />}/>
    <Nav className="ml-auto" >
    <LinkContainer to='/cart'>
      <Nav.Link><i className="fas fa-shopping-cart"></i>
      </Nav.Link>
      </LinkContainer>
      {userInfo ? (
        <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      ) : <LinkContainer to='/login'>
      <Nav.Link ><i className="fas fa-user"></i>
      </Nav.Link>
      </LinkContainer> }
      {userInfo && userInfo.isAdmin && (
         <NavDropdown title='Admin' id='adminmenu'>
         <LinkContainer to='/admin/userlist'>
           <NavDropdown.Item>Users</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/productlist'>
           <NavDropdown.Item>Products</NavDropdown.Item>
         </LinkContainer>
         <LinkContainer to='/admin/orderlist'>
           <NavDropdown.Item>Orders</NavDropdown.Item>
         </LinkContainer>
       </NavDropdown>
      )}
      </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header
