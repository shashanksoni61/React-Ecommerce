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
import Moment from 'react-moment';

import Rating from '../components/product/Rating';
import Spinner from '../components/layout/Spinner';
import Message from '../components/layout/Message';

import { productDetails } from '../actions/productAction';
import { addToCart } from '../actions/cartAction';
import { createProductReview } from '../actions/productAction';
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/types';

export default function ProductPage({ history }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { user } = useSelector(state => state.auth);
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = useSelector(state => state.productReview);
  const { loading, error, product } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    // history.push(`/cart/${id}?qty=${quantity}`);
    dispatch(addToCart(id, Number(quantity)));
    setItemAdded(true);
    setTimeout(() => {
      setItemAdded(false);
      history.push('/');
    }, 2000);
  };

  const submitReviewHandler = e => {
    e.preventDefault();
    setReviewAdded(true);
    dispatch(createProductReview(id, { rating, comment }));
    setRating(0);
    setComment('');
    setTimeout(() => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setReviewAdded(false);
    }, 1500);
  };

  const {
    message,
    countInStock,
    description,
    image,
    name,
    numReviews,
    price,
    rating: productRating,
    reviews,
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
        <Fragment>
          <Row>
            <Col md={6} lg={5}>
              <Image src={image} alt={name} className='rounded' fluid />
            </Col>
            <Col md={6} lg={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3> {name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating rating={productRating} numReviews={numReviews} />
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
            <Col lg={3}>
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
                      <Col>
                        {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='product-detail-sideheading'>
                          Quantity
                        </Col>
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
                  {itemAdded && (
                    <ListGroup.Item>
                      <Message variant='success'>Item Added</Message>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className='mt-3'>
              <h2>Reviews</h2>
              {reviews && reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {reviews &&
                  reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.comment}</p>
                      <Moment format='DD-MM-YYYY'>{review.createdAt}</Moment>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h3>Write a Customer Review</h3>
                  {loadingReview && <Spinner />}
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {reviewAdded && successReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {user.name ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type='submit'
                        variant='primary'
                        className='mt-3'
                      >
                        Add Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      You must be <Link to='/login'>signed in</Link> to write a
                      review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
}
