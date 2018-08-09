import React from 'react';
import Header from './Header/Header';
import Home from './Home/Home';
import Contacts from './Header/MainInfo/Contacts/Contacts';
import DeliveryAndPay from './Header/MainInfo/DeliveryAndPay/DeliveryAndPay';
import AboutCompany from './Header/MainInfo/AboutCompany/AboutCompany';
import AdminPanel from "./Panels/AdminPanel/AdminPanel";
import LogIn from './LogIn/LogIn';
import './Layout.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserPanel from "./Panels/UserPanel/UserPanel";
import ProductCardPlace from './ProductCardPlace/ProductCardPlace';
import FullInfoProductPlace from './FullInfoProductPlace/FullInfoProductPlace';
import {NotFound} from "./common/NotFound/NotFound";
import Footer from './Footer/Footer';
import LikedProducts from '../components/LikedProducts/LikedProducts';
import Actions from '../components/Header/MainInfo/Actions/Actions';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogIn: false,
			user: null
		}
	}

	onLogIn = (user) => {
		this.setState({
			isLogIn: true,
			user: user
		})
	};

	render() {
		const {user, isLogIn} = this.state;

		return (
			<Router>
				<div className="layout-container">
					<Header onLogIn={this.onLogIn}/>
					<Switch>
						<Route exact path='/' render={(props) => <Home user={user} isLogIn={isLogIn} {...props}/>}/>
						<Route path='/products' render={props => <Home user={user} isLogIn={isLogIn} {...props}/>}/>
						<Route path='/contacts' component={Contacts}/>
						<Route path='/deliveryAndPay' component={DeliveryAndPay}/>
						<Route path='/aboutCompany' component={AboutCompany}/>
						<Route path='/actions' component={Actions}/>
						<Route path='/userPanel' component={UserPanel}/>
						<Route path='/adminPanel' component={AdminPanel}/>
						<Route path='/logIn' component={LogIn}/>
						<Route path='/product/:productId'
							   render={props => <FullInfoProductPlace user={user} isLogin={isLogIn} {...props}/>}/>
						<Route path='/productsCard' render={() => <ProductCardPlace user={user} isLogIn={isLogIn}/>}/>
						<Route path='/likedProducts' component={LikedProducts}/>
						<Route component={NotFound}/>
					</Switch>
					<Footer user={user} isLogIn={isLogIn}/>
				</div>
			</Router>
		);
	}
}

export default Layout;