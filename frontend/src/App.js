import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';

export default function App() {
  return (
    <Fragment>
      <Header />
      <main className='py-3'>
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
