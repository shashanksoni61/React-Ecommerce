import { axiosInstance as axios } from '../utils/apiClient';

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Image,
} from 'react-bootstrap';
import Moment from 'react-moment';

import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';

import { deliverOrder, getOrderByID, payOrder } from '../actions/orderAction';
import {
  CLEAR_CART_STATE,
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../actions/types';
import { loadScript } from '../utils';

export default function OrderDetailsPage({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { loading, order, error } = useSelector(state => state.order);
  const { success: successPaid, error: errorPaid } = useSelector(
    state => state.orderPaid
  );
  const {
    loading: loadingDelivered,
    success: successDelivered,
    error: errorDelivered,
  } = useSelector(state => state.orderDelivered);

  useEffect(() => {
    if (!user.name) {
      history.push('/login');
    }

    if (!window.Razorpay)
      loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!order || successPaid || id !== order._id || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderByID(id));
      dispatch({ type: CLEAR_CART_STATE });
    }
  }, [dispatch, history, user.name, id, order, successPaid, successDelivered]);

  const displayRazorPay = async () => {
    try {
      const { data: RAZORPAY_KEY_ID } = await axios.get('/api/config/razorpay');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${user.token}`,
        },
      };

      const { data: orderPayData } = await axios.get(
        `/api/orders/${id}/razorpay`,
        config
      );

      const options = {
        key: RAZORPAY_KEY_ID,
        currency: orderPayData.currency,
        amount: orderPayData.amount.toString(),
        order_id: orderPayData.id,
        name: 'Tech Shop',
        description: `At Your Service`,
        image: '/logo192.png',
        handler: async function (response) {
          const paymentResult = {
            orderCreationId: orderPayData.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            `/api/orders/${id}/payment_varify`,
            paymentResult,
            config
          );

          if (result.status === 200) {
            dispatch(payOrder(id, result.data));
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          phone_number: '9899999999',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Container>
      {loading && <Spinner />}
      {loadingDelivered && <Spinner />}
      {error && <Message variant='danger'>{error}</Message>}
      {errorPaid && <Message variant='danger'>{errorPaid}</Message>}
      {errorDelivered && <Message variant='danger'>{errorDelivered}</Message>}
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
                  <br />
                  <strong>Email : </strong>
                  {order.user.email}
                  <br />
                  <strong>Mobile No : </strong>
                  {order.shippingAddress.mobile}
                  <br />
                  <strong>Address : </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.pin},{order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on{' '}
                    <Moment format='ddd, MMMM Do YYYY'>
                      {order.deliveredAt}
                    </Moment>
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
                  <Message variant='success'>
                    Paid on{' '}
                    <Moment format='ddd, MMMM Do YYYY, h:mm A'>
                      {order.paidAt}
                    </Moment>
                  </Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Order Items</h4>
                {order.orderItems.length === 0 ? (
                  <Message variant='info'>Your Cart Is Empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className='align-items-center'>
                          <Col xs={4} sm={2} md={2}>
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
                              <strong> {item.name}</strong>
                            </Link>
                            <strong className='d-block'>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </strong>
                          </Col>

                          <Col className='d-none d-md-flex'>
                            <Link to={`/product/${item.product}`}>
                              <strong> {item.name}</strong>
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
                {!order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={displayRazorPay}
                    >
                      Pay Now
                    </Button>
                  </ListGroup.Item>
                )}
                {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
