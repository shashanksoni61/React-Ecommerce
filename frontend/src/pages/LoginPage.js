import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authAction';
import Message from '../components/layout/Message';

export default function LoginPage({ history, location: { search } }) {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (isAuthenticated && user) {
      history.push(redirect);
    }
  });

  const { email, password } = formData;

  const formInputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
    }
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        {error && <Message variant='danger'>{error}</Message>}
        <Col xs={12} md={6}>
          <h1>Sign In</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => formInputHandler(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                minLength={6}
                name='password'
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={e => formInputHandler(e)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' varient='primary' className='mt-3'>
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='py-3 justify-content-md-center'>
        <Col xs={12} md={6}>
          <span className='text-muted'>New Customer ? </span>
          <Link to='/register'>Register Here</Link>
        </Col>
      </Row>
    </Container>
  );
}
