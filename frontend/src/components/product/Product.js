import React from 'react';
import { Card } from 'react-bootstrap';

export default function Product({ product }) {
  return (
    <Card className='rounded bg-grey p-3 m-3'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} varient='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} * from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text className='text-'>
          <strong>${product.price}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
