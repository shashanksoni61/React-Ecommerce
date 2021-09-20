import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Fragment>
      <Link to='/' className='btn btn-dark text-white my-3'>
        Go Back
      </Link>
      <div className='d-flex flex-column align-items-center mt-5'>
        <h1 className='x-large text-primary'>
          <i className='fas fa-exclamation-triangle' /> Page Not Found
        </h1>
        <p className='large'>Sorry, this page does not exist</p>
      </div>
    </Fragment>
  );
}
