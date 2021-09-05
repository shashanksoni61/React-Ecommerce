import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
export default function Header() {
  return (
    <Navbar bg='dark' expand='md'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>TechShop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link className='nav-link-mobile-spacing'>
                <FaShoppingCart />
                <span>Cart</span>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to='/login'>
              <Nav.Link className='nav-link-mobile-spacing'>
                <FaUser />
                <span>Sign In</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
