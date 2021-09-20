import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Search({ history }) {
  const [searchText, setSearchText] = useState('');

  const formSubmitHandler = e => {
    e.preventDefault();
    if (searchText.trim()) {
      history.push(`/search/${searchText}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={formSubmitHandler} className='d-flex gap-2 mt-2 mt-md-0'>
      <Form.Control
        type='text'
        name='search'
        onChange={e => setSearchText(e.target.value)}
        placeholder='Seach Products By Name Or Brand...'
        className='mr-sm-2 ml-sm-5'
      />

      <Button type='submit' variant='outline-primary'>
        Search
      </Button>
    </Form>
  );
}
