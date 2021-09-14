import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../components/layout/CheckoutSteps';

import { savePaymentMethod } from '../actions/cartAction';

export default function ShippingPage({ history }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { shippingAddress, paymentMethod: payMeth } = useSelector(
    state => state.cart
  );

  const [paymentMethod, setPaymentMethod] = useState(payMeth || 'PayPal');

  useEffect(() => {
    console.log(paymentMethod);
    if (!isAuthenticated) {
      history.push('/login');
    }
    if (!shippingAddress.address) {
      history.push('/shipping');
    }
  }, [history, isAuthenticated, shippingAddress, paymentMethod]);

  //   const { address, pin, city, state } = formData;

  const formSubmitHandler = e => {
    e.preventDefault();
    if (paymentMethod) {
      console.log(paymentMethod);
      dispatch(savePaymentMethod(paymentMethod));
      history.push('/placeorder');
    }
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment</h1>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group>
              <Form.Label as='legend'>Select Payment Method</Form.Label>
              <Form.Check
                id='paypal'
                type='radio'
                label='Paypal or Debit Card'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                name='paymentMethod'
                onChange={() => setPaymentMethod('PayPal')}
              />
              <Form.Check
                id='CoD'
                type='radio'
                label='Cash On Delivery'
                value='CoD'
                checked={paymentMethod === 'CoD'}
                name='paymentMethod'
                onChange={() => setPaymentMethod('CoD')}
              />
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
