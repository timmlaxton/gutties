import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavDropdown, Form, Button, FormControl, Container} from 'react-bootstrap';

const Header = () => {
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
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Women's" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Kids" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      </Nav>
     
    
    <Form inline className="auto">
      <FormControl className="searchbar" type="text" placeholder="Search" aria-label="Search"/>
      <Button className="searchbutton" variant="outline-grey">Search</Button>
    </Form>
    <Nav className="ml-auto" >
    <LinkContainer to='/cart'>
      <Nav.Link><i className="fas fa-shopping-cart"></i>
      </Nav.Link>
      </LinkContainer>
      <LinkContainer to='/login'>
      <Nav.Link ><i className="fas fa-user"></i>
      </Nav.Link>
      </LinkContainer> 
      </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    </header>
  )
}

export default Header
