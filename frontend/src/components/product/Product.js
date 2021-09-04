import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product({ product }) {
  return (
    <Card className='rounded bg-grey p-3 m-3'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} varient='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
