import React, { Fragment } from 'react';
import { Col, Row } from 'react-bootstrap';
import products from '../products';
import Product from '../components/product/Product';

export default function HomePage() {
  return (
    <Fragment>
      <h2>Latest Products</h2>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
}
