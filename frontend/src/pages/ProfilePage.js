import React, { useState, useEffect, Fragment } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';
import { updateUserProfile } from '../actions/authAction';

export default function ProfilePage({ history }) {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user, error } = useSelector(
    state => state.auth
  );

  let warning = 'Please Re-enter Same Password';

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  const { name, email, password, password2 } = formData;

  const formInputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (name && email && password && password2 && password === password2) {
      // dispatch(register(name, email, password));
      dispatch(updateUserProfile(name, email, password));
      console.log(formData);
    }
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        {loading && <Spinner />}
        {error && <Message variant='danger'>{error}</Message>}
        {password !== password2 && (
          <Message variant='danger'>{warning}</Message>
        )}
        {!loading && !error && (
          <Fragment>
            <Col xs={12} md={3}>
              <h2>Your Profile</h2>
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
                  Update
                </Button>
              </Form>
            </Col>
            <Col md={9}>
              <h2>Your Orders</h2>
            </Col>
          </Fragment>
        )}
      </Row>
    </Container>
  );
}
