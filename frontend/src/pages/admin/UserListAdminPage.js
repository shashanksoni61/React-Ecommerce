import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

import Message from '../../components/layout/Message';
import Spinner from '../../components/layout/Spinner';

import { deleteUser, getAllUsers } from '../../actions/userListAction';
import { USER_DETAILS_RESET } from '../../actions/types';

export default function UserListPage({ history }) {
  const dispatch = useDispatch();

  const { loading, users, error } = useSelector(state => state.userList);
  const { user } = useSelector(state => state.auth);
  const { success: userDeleteSuccess } = useSelector(state => state.userDelete);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getAllUsers());
      dispatch({ type: USER_DETAILS_RESET });
    } else {
      history.push('/login');
    }
  }, [dispatch, history, user, userDeleteSuccess]);

  const deleteUserHandler = userId => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <Fragment>
      <h2>Users</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td className='d-flex justify-content-around'>
                  <Link to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteUserHandler(user._id)}
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
