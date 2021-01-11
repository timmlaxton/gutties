import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'



const App = () => {
  return (
    <Router> 
    <Header/>
    <main className="py-3"> 
      <Container>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/login' component={LoginScreen} exact/>
      <Route path='/shipping' component={ShippingScreen} exact/>
      <Route path='/admin/userlist' component={UserListScreen} exact/>
      <Route path='/placeorder' component={PlaceOrderScreen} exact/>
      <Route path="/admin/user/:id/edit"  component={UserEditScreen} />
      <Route path='/payment' component={PaymentScreen} exact/>
      <Route path='/register' component={RegisterScreen} exact/>
      <Route path='/profile' component={ProfileScreen} exact/>
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/order/:id?' component={OrderScreen} />
      {/* <TrainersScreen/> */}
      </Container>
     </main>
     <Footer/>
     </Router>
  );
}

export default App;
