import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import UserListAdminPage from './pages/admin/UserListAdminPage';
import UserEditAdminPage from './pages/admin/UserEditAdminPage';
import ProductListAdminPage from './pages/admin/ProductListAdminPage';
import ProductEditAdminPage from './pages/admin/ProductEditAdminPage';

export default function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/product/:id' component={ProductPage} exact />
            <Route path='/cart/:id?' component={CartPage} exact />
            <Route path='/login' component={LoginPage} exact />
            <Route path='/register' component={RegisterPage} exact />
            <Route path='/profile' component={ProfilePage} exact />
            <Route path='/shipping' component={ShippingPage} exact />
            <Route path='/payment' component={PaymentPage} exact />
            <Route path='/placeorder' component={PlaceOrderPage} exact />
            <Route path='/orders/:id' component={OrderDetailsPage} exact />
            <Route path='/admin/users' component={UserListAdminPage} exact />
            <Route
              path='/admin/users/:id/edit'
              component={UserEditAdminPage}
              exact
            />
            <Route
              path='/admin/products'
              component={ProductListAdminPage}
              exact
            />
            <Route
              path='/admin/products/:id/edit'
              component={ProductEditAdminPage}
              exact
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
