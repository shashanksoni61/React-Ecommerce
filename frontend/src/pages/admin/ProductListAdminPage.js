import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import Message from '../../components/layout/Message';
import Spinner from '../../components/layout/Spinner';

import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../../actions/types';

export default function ProductListAdminPage({ history }) {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector(state => state.products);
  const { user } = useSelector(state => state.auth);

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector(state => state.productDelete);

  const {
    loading: loadingCreate,
    success: successCreate,
    product: productCreate,
    error: errorCreate,
  } = useSelector(state => state.productCreate);

  useEffect(() => {
    if (successCreate) {
      history.push(`/admin/products/${productCreate._id}/edit?type=Add`);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (user && user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, user, successDelete, successCreate]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

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
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                  <Link to={`/admin/products/${product._id}/edit`}>
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

// In Case if i want to use Modal in future

// import React, { useState, useEffect, Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import { Form, Table, Button, Row, Col, Modal } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

// import Message from '../components/layout/Message';
// import Spinner from '../components/layout/Spinner';

// import { deleteProduct, listProducts } from '../actions/productAction';

// export default function ProductListAdminPage({ history }) {
//   const dispatch = useDispatch();

//   const { loading, products, error } = useSelector(state => state.products);
//   const { user } = useSelector(state => state.auth);
//   const {
//     loading: loadingDelete,
//     success: successDelete,
//     error: errorDelete,
//   } = useSelector(state => state.productDelete);

//   //Model
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState(0);
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);
//   //Create product end

//   useEffect(() => {
//     if (user && user.isAdmin) {
//       dispatch(listProducts());
//     } else {
//       history.push('/login');
//     }
//   }, [dispatch, history, user, successDelete]);

//   const uploadFileHandler = e => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);
//     console.log(formData);
//     console.log(file.name);
//   };

//   const formSubmitHandler = () => {};

//   const deleteProductHandler = prodId => {
//     if (window.confirm('Are you sure')) {
//       dispatch(deleteProduct(prodId));
//     }
//   };
//   return (
//     <Fragment>
//       <Row className='align-items-center'>
//         <Col>
//           <h1>Products</h1>
//         </Col>
//         <Col style={{ textAlign: 'right' }}>
//           <Button className='my-3 ' onClick={handleShow}>
//             <FaPlus className='d-inline' />{' '}
//             <span className='d-none d-md-inline'>Create Product</span>
//           </Button>
//           {/* Create Product Modal */}
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header>
//               <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={formSubmitHandler}>
//                 <Form.Group controlId='name'>
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type='name'
//                     placeholder='Enter name'
//                     value={name}
//                     onChange={e => setName(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId='price'>
//                   <Form.Label>Price</Form.Label>
//                   <Form.Control
//                     type='number'
//                     placeholder='Enter price'
//                     value={price}
//                     onChange={e => setPrice(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId='image'>
//                   <Form.Label>Image</Form.Label>
//                   <Form.Control
//                     type='text'
//                     placeholder='Enter image url'
//                     value={image}
//                     onChange={e => setImage(e.target.value)}
//                   ></Form.Control>
//                   <Form.File
//                     id='image-file'
//                     label='Choose File'
//                     custom
//                     onChange={uploadFileHandler}
//                   ></Form.File>
//                 </Form.Group>

//                 <Form.Group controlId='brand'>
//                   <Form.Label>Brand</Form.Label>
//                   <Form.Control
//                     type='text'
//                     placeholder='Enter brand'
//                     value={brand}
//                     onChange={e => setBrand(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId='countInStock'>
//                   <Form.Label>Count In Stock</Form.Label>
//                   <Form.Control
//                     type='number'
//                     placeholder='Enter countInStock'
//                     value={countInStock}
//                     onChange={e => setCountInStock(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId='category'>
//                   <Form.Label>Category</Form.Label>
//                   <Form.Control
//                     type='text'
//                     placeholder='Enter category'
//                     value={category}
//                     onChange={e => setCategory(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Form.Group controlId='description'>
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     type='text'
//                     placeholder='Enter description'
//                     value={description}
//                     onChange={e => setDescription(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 <Button type='submit' variant='primary'>
//                   Update
//                 </Button>
//               </Form>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant='secondary' onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant='primary' onClick={handleClose}>
//                 Create
//               </Button>
//             </Modal.Footer>
//           </Modal>
//           {/* Create Product Modal */}
//         </Col>
//       </Row>
//       {loadingDelete && <Spinner />}
//       {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
//       {loading ? (
//         <Spinner />
//       ) : error ? (
//         <Message variant='danger'>{error}</Message>
//       ) : (
//         <Table striped bordered hover responsive className='table-sm'>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>NAME</th>
//               <th>PRICE</th>
//               <th>CATEGORY</th>
//               <th>BRAND</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <tr key={product._id}>
//                 <td>{product._id}</td>
//                 <td>{product.name}</td>
//                 <td>${product.price}</td>
//                 <td>{product.category}</td>
//                 <td>{product.brand}</td>
//                 <td className='d-flex justify-content-around'>
//                   <Button
//                     variant='light'
//                     className='btn-sm'
//                     onClick={handleShow}
//                   >
//                     <FaEdit />
//                   </Button>

//                   <Button
//                     variant='danger'
//                     className='btn-sm'
//                     onClick={() => deleteProductHandler(product._id)}
//                   >
//                     <FaTrash />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Fragment>
//   );
// }
