import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/layout/Message';

import CheckoutSteps from '../components/layout/CheckoutSteps';
import { Link } from 'react-router-dom';
import { createORder } from '../actions/orderAction';

export default function ShippingPage({ history }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const {
    cartItems,
    paymentMethod,
    shippingAddress: { address, pin, city, country },
  } = cart;
  const { order, error, success } = useSelector(state => state.order);

  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  cart.shippingPrice = Number(cart.itemsPrice > 500 ? 0 : 50).toFixed(2);
  cart.taxPrice = Number(
    cart.itemsPrice > 1000 ? cart.itemsPrice * 0.1 : cart.itemsPrice * 0.08
  ).toFixed(2);

  cart.totalItemsPrice = Number(
    Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
    }
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, isAuthenticated, success]);

  const placeOrderHandler = () => {
    dispatch(
      createORder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalItemsPrice,
      })
    );
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address : </strong>
                {address + ',' + city + ',' + pin + ',' + country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Payment Method</h4>
              <p>
                <strong>Mathod :</strong> {paymentMethod || 'Not Selected'}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Cart Items</h4>
              {cartItems.length === 0 ? (
                <Message variant='info'>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row className=''>
                        <Col xs={4} sm={2} md={1}>
                          <Link to={`/product/${item.product}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Link>
                        </Col>

                        <Col className='d-sm-none '>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <strong className='d-block'>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </strong>
                        </Col>

                        <Col className='d-none d-md-flex'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col className='d-none d-md-flex'>
                          <strong>
                            {' '}
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}{' '}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
