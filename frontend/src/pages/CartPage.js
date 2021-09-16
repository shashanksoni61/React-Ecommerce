import React, { Fragment, useEffect } from 'react';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';

import Message from '../components/layout/Message';

import { addToCart, removeFromCart } from '../actions/cartAction';

export default function CartPage() {
  const history = useHistory();
  const { search } = useLocation();
  const { id } = useParams();
  const qty = search ? Number(search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (id && id.length === 24) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeItemFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const cartCheckoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Fragment>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 && (
            <Message>
              Your cart is empty{' '}
              <Link to='/' className='text-warning'>
                Continue Shopping
              </Link>
            </Message>
          )}

          {cartItems.length > 0 && (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row className='justify-content-between align-items-center d-md-none'>
                    <Col xs={3} sm={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={5}>
                      <Row>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>${item.price}</Col>
                      </Row>
                    </Col>
                    <Col xs={3} className='text-center'>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x, i) => (
                          <option key={x + 1} value={x + 1}>
                            {' '}
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        className='mt-2'
                        type='button'
                        variant='light'
                        onClick={() => removeItemFromCartHandler(item.product)}
                      >
                        <FaTrash className='text-primary' />
                      </Button>
                    </Col>
                  </Row>

                  <Row className='justify-content-between align-items-center d-none d-md-flex'>
                    <Col xs={2} sm={2} md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col xs={4} sm={4} md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col xs={2} sm={1} md={2}>
                      ${item.price}
                    </Col>
                    <Col xs={3} sm={2} md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x, i) => (
                          <option key={x + 1} value={x + 1}>
                            {' '}
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={1} sm={1} md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeItemFromCartHandler(item.product)}
                      >
                        <FaTrash className='text-primary' />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='mt-sm-3'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) Items
                </h3>
                <h3>
                  Cart Total : $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn btn-block'
                  disabled={cartItems.length === 0}
                  onClick={cartCheckoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
