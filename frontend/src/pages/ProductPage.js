import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Rating from '../components/product/Rating';
import Spinner from '../components/layout/Spinner';
import Message from '../components/layout/Message';
import { productDetails } from '../actions/productAction';

export default function ProductPage({ history }) {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(state => state.products);
  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    console.log('add to cart button clicked ');
    history.push(`/cart/${id}?qty=${quantity}`);
  };

  const {
    brand,
    message,
    category,
    countInStock,
    description,
    image,
    name,
    numReviews,
    price,
    rating,
  } = product;

  return (
    <Fragment>
      <Link to='/' className='btn btn-dark text-white my-3'>
        Go Back
      </Link>
      {loading && <Spinner />}
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {!loading && !error && !message && (
        <Row>
          <Col md={6} lg={6}>
            <Image src={image} alt={name} className='rounded' fluid />
          </Col>
          <Col md={6} lg={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3> {name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={rating} numReviews={numReviews} />
              </ListGroup.Item>
              <ListGroup.Item>
                <span className='product-detail-sideheading'>Price :</span>$
                {price}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className='product-detail-sideheading'>
                  Description :
                </span>{' '}
                {description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={2}>
            <Card>
              <ListGroup variend='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col className='product-detail-sideheading'>Price</Col>
                    <Col>$ {price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col className='product-detail-sideheading'>Status</Col>
                    <Col>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className='product-detail-sideheading'>Quantity</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={e => setQuantity(e.target.value)}
                        >
                          {[...Array(countInStock).keys()].map((x, i) => (
                            <option key={x + 1} value={x + 1}>
                              {' '}
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block w-100'
                    type='button'
                    disabled={countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
}
