import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authAction';
import Message from '../components/layout/Message';

export default function RegisterPage({ history, location: { search } }) {
  const dispatch = useDispatch();

  const { isAuthenticated, user, error } = useSelector(state => state.auth);

  let warning = 'Please Re-enter Same Password';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const redirect = search ? search.split('=')[1] : '/';
  useEffect(() => {
    if (isAuthenticated && user) {
      history.push(redirect);
    }
  }, [history, redirect, isAuthenticated, user]);

  const { name, email, password, password2 } = formData;

  const formInputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (name && email && password && password2 && password === password2) {
      dispatch(register(name, email, password));
    }
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {error && <Message variant='danger'>{error}</Message>}
          {password !== password2 && (
            <Message variant='danger'>{warning}</Message>
          )}
          <h1>Register Here</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='text'
                placeholder='Enter Full Name'
                value={name}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => formInputHandler(e)}
                required
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
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Confirm Password'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                minLength={6}
                name='password2'
                type='password'
                placeholder='Re-Enter Your Password'
                value={password2}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Button type='submit' varient='primary' className='mt-3'>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='py-3 justify-content-md-center'>
        <Col xs={12} md={6}>
          <span className='text-muted'>Already A Customer ? </span>
          <Link to='/login'>Sign In Here</Link>
        </Col>
      </Row>
    </Container>
  );
}
