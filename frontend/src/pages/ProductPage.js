import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import products from '../products';
import Rating from '../components/product/Rating';
import { Fragment } from 'react';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p._id === id);
  const {
    _id,
    brand,
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
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} className='rounded' fluid />
        </Col>
        <Col md={4}>
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
              <span className='product-detail-sideheading'>Description :</span>{' '}
              {description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={2}>
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
              <ListGroup.Item>
                <Button
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
    </Fragment>
  );
}
