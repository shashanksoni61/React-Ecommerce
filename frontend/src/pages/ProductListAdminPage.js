import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';

import { deleteProduct, listProducts } from '../actions/productAction';

export default function ProductListAdminPage({ history }) {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector(state => state.productDelete);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, user, successDelete]);

  const createProductHandler = product => {};

  const deleteProductHandler = prodId => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(prodId));
    }
  };
  return (
    <Fragment>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button className='my-3 ' onClick={createProductHandler}>
            <FaPlus className='d-inline' />{' '}
            <span className='d-none d-md-inline'>Create Product</span>
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Spinner />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className='d-flex justify-content-around'>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
}
