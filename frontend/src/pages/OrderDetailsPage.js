import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from 'react-bootstrap';
import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';
import { getOrderByID } from '../actions/orderAction';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { loading, order, error, success } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(getOrderByID(id));
  }, []);

  order.itemsPrice = order.orderItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const placeOrderHandler = () => {};
  return (
    <Container>
      {loading && <Spinner />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <h3>Order {order._id}</h3>
              <ListGroup.Item>
                <h4>Shipping</h4>
                <p>
                  <strong>Name : </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Address : </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.pin},{order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Payment Method</h4>
                <p>
                  <strong>Mathod :</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Paid at {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Cart Items</h4>
                {order.orderItems.length === 0 ? (
                  <Message variant='info'>Your Cart Is Empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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
                    <Col>Items Price</Col>
                    <Col>$ {order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$ {order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$ {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>$ {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
