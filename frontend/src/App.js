import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import GuttieScreen from './screens/GuttieScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/login" component={LoginScreen} exact />
					<Route path="/shipping" component={ShippingScreen} exact />
					<Route path="/admin/userlist" component={UserListScreen} exact />
					<Route path="/admin/productlist" component={ProductListScreen} exact />
					<Route path="/placeorder" component={PlaceOrderScreen} exact />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route path="/admin/product/:id/edit" component={ProductEditScreen} />
					<Route path="/admin/product/create" component={ProductEditScreen} />
					<Route path="/payment" component={PaymentScreen} exact />
					<Route path="/register" component={RegisterScreen} exact />
					<Route path="/profile" component={ProfileScreen} exact />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/gutties" component={GuttieScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/order/:id?" component={OrderScreen} />
					<Route path="/admin/orderList" component={OrderListScreen} />
					<Route path="/search/:keyword?" component={GuttieScreen} />
					<Route path="/" component={HomeScreen} exact />

					{/* <TrainersScreen/> */}
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
