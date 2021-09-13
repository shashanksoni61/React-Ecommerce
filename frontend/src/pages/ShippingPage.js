import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../components/layout/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartAction';

export default function ShippingPage({ history }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { shippingAddress } = useSelector(state => state.cart);

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    pin: shippingAddress.pin || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
  }, [history, isAuthenticated]);

  const { address, pin, city, state } = formData;

  const formInputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (address && pin && city && state) {
      dispatch(saveShippingAddress(formData));
      history.push('/payment');
    }
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name='address'
                type='text'
                placeholder='Enter Address'
                value={address}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='pin-code'>
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                name='pin'
                type='text'
                placeholder='Enter Pin Code'
                value={pin}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                name='city'
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='state'>
              <Form.Label>State</Form.Label>
              <Form.Control
                name='state'
                type='text'
                placeholder='Enter State'
                value={state}
                onChange={e => formInputHandler(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Button type='submit' varient='primary' className='mt-3'>
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
