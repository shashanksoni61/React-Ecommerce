import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
export default function Header() {
  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>TechShop</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/cart' className='nav-link-mobile-spacing'>
              <FaShoppingCart />
              <span>Cart</span>
            </Nav.Link>
            <Nav.Link href='/login' className='nav-link-mobile-spacing'>
              <FaUser />
              <span>Sign In</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
