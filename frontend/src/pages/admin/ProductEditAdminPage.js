import { axiosInstance as axios } from '../../utils/apiClient';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/layout/Message';
import Spinner from '../../components/layout/Spinner';

import { productDetails, updateProduct } from '../../actions/productAction';
import { PRODUCT_UPDATE_RESET } from '../../actions/types';

export default function ProductEditAdminPage({
  match,
  history,
  location: { search },
}) {
  const prodId = match.params.id;
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { loading, error, product } = useSelector(state => state.products);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector(state => state.productUpdate);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const pageType = search ? search.split('=')[1] : 'Update';

  useEffect(() => {
    if (user || user.isAdmin) {
      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        history.push('/admin/products');
      } else {
        if (!product.name || product._id !== prodId) {
          dispatch(productDetails(prodId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }
    } else {
      history.push('/login');
    } // eslint-disable-next-line
  }, [dispatch, history, product.name, prodId, successUpdate]);

  const formSubmitHandler = () => {
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': `${user.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error.message);
      setUploading(false);
      setImage('');
    }
  };

  return (
    <Container>
      <Link to='/admin/products' className='btn btn-dark text-white my-3'>
        Go Back
      </Link>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>{pageType} Product</h1>
          {loading && <Spinner />}
          {loadingUpdate && <Spinner />}
          {error && <Message variant='danger'>{error}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {!loading && !error && (
            <Form onSubmit={formSubmitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter image url'
                  value={image}
                  onChange={e => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id='image-file'
                  label='Choose File'
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Spinner />}
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter countInStock'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-3'>
                {pageType} Product
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
