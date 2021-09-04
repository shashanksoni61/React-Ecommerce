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
            <Nav.Link href='/cart'>
              <FaShoppingCart /> Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <FaUser />
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
