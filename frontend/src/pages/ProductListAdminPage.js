import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import Message from '../components/layout/Message';
import Spinner from '../components/layout/Spinner';

import { listProducts } from '../actions/productAction';

export default function ProductListAdminPage({ history }) {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, user]);

  const createProductHandler = product => {};

  const deleteUserHandler = userId => {
    if (window.confirm('Are you sure')) {
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
                    onClick={() => deleteUserHandler(product._id)}
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
