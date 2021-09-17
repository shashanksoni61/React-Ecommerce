import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../components/layout/Spinner';
import Message from '../components/layout/Message';

import { getUserDetails } from '../actions/userListAction';

export default function UserEditAdminPage({ history, match }) {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(state => state.userDetails);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user.name, userId]);

  const formSubmitHandler = e => {
    e.preventDefault();
    console.log(name, email, isAdmin);
  };

  return (
    <Container>
      <Link to='/admin/users' className='btn btn-dark text-white my-3'>
        Go Back
      </Link>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Edit User</h1>
          {loading && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>}
          {!loading && !error && (
            <Form onSubmit={formSubmitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name='name'
                  type='text'
                  placeholder='Enter Full Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='email' className='mt-2'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='isAdmin' className='mt-2'>
                <Form.Check
                  id='admin'
                  type='checkbox'
                  label='is Admin'
                  checked={isAdmin}
                  name='isAdmin'
                  onChange={e => setIsAdmin(e.target.checked)}
                />
              </Form.Group>
              <Button
                type='submit'
                varient='primary'
                className='mt-3'
                onClick={formSubmitHandler}
              >
                Edit User
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
