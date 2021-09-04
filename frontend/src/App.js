import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

export default function App() {
  return (
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to Tech Shop</h1>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
