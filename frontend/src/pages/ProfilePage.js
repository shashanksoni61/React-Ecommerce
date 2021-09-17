import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import { FaTimesCircle } from 'react-icons/fa';
import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';
import { updateUserProfile } from '../actions/authAction';
import { getUserOrders } from '../actions/userOrdersAction';

export default function ProfilePage({ history }) {
  const dispatch = useDispatch();

  const { isAuthenticated, loading, user, error } = useSelector(
    state => state.auth
  );

  const {
    loading: userOrdersLoading,
    orders,
    errors: userOrdersErrors,
  } = useSelector(state => state.userOrders);

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
    } else {
      dispatch(getUserOrders());
    }
  }, [dispatch, isAuthenticated, history]);

  const { name, email, password, password2 } = formData;

  const formInputHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    if (name && email && password && password2 && password === password2) {
      dispatch(updateUserProfile(name, email, password));
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
            <Col md={9} className='mt-sm-2 mt-md-0'>
              <h2>Your Orders</h2>
              <h5>Total Orders {orders && orders.length}</h5>
              {userOrdersLoading && <Spinner />}
              {userOrdersErrors && (
                <Message variant='danger'>{userOrdersErrors}</Message>
              )}
              {!userOrdersLoading && !userOrdersErrors && (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className='table-sm text-center'
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map(order => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>
                            <Moment format='ddd, MMMM Do YYYY, h:mm A'>
                              {order.createdAt}
                            </Moment>
                          </td>
                          <td>$ {order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              <Moment format='ddd, MMMM Do YYYY, h:mm A'>
                                {order.paidAt}
                              </Moment>
                            ) : (
                              <FaTimesCircle style={{ color: 'red' }} />
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              <Moment format='ddd, MMMM Do YYYY, h:mm A'>
                                {order.deliveredAt}
                              </Moment>
                            ) : (
                              <FaTimesCircle style={{ color: 'red' }} />
                            )}
                          </td>
                          <td>
                            <Link to={`/orders/${order._id}`}>
                              <Button className='btn-sm'>Details</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </Col>
          </Fragment>
        )}
      </Row>
    </Container>
  );
}
