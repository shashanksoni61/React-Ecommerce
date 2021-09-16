import React from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/authAction';
import { useHistory } from 'react-router';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

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
            {isAuthenticated && user ? (
              <NavDropdown title={user.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item className='nav-link-mobile-spacing'>
                    <FaUser />
                    <span>Profile</span>
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className='nav-link-mobile-spacing'
                >
                  <FiLogOut />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link className='nav-link-mobile-spacing'>
                  <FaUser />
                  <span>Sign In</span>
                </Nav.Link>
              </LinkContainer>
            )}
            {isAuthenticated && user.isAdmin && (
              <NavDropdown title='Admin' id='username'>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item className='nav-link-mobile-spacing'>
                    <FaUser />
                    <span>Users</span>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item className='nav-link-mobile-spacing'>
                    <span>Products</span>
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orders'>
                  <NavDropdown.Item className='nav-link-mobile-spacing'>
                    <span>Orders</span>
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                  onClick={logoutHandler}
                  className='nav-link-mobile-spacing'
                >
                  <FiLogOut />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
