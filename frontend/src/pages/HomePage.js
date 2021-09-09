import React, { Fragment, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/product/Product';
import { listProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log(products);
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
