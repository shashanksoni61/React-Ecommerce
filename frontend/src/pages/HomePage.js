import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/product/Product';
import Spinner from '../components/layout/Spinner';
import Message from '../components/layout/Message';
import { listProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const { search } = useParams();

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(listProducts(search));
  }, [dispatch, search]);
  return (
    <Fragment>
      <h2>Latest Products</h2>
      {loading && <Spinner />}
      {error && <Message variant='danger'>{error}</Message>}
      {!loading && !error && (
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
}
