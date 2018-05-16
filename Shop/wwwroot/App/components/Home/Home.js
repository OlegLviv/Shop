import React, {Component} from 'react';
import ProductPlace from '../ProductPlace/ProductPlace';
import {Route, Switch} from 'react-router-dom';
import './Home.scss';
import Discount from '../ProductPlace/Discount/Discount';

class Home extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="home-container">
				<Switch>
					<Route exact path="/products/:category/:subCategory"
						   render={(props) => <ProductPlace {...props} isLogIn={this.props.isLogIn}/>}/>
					<Route exact path="/" component={ProductPlace}/>
					<Route exact path="/products/:category/:subCategory/:q" component={ProductPlace}/>
					<Route path='/products/discount' component={Discount}/>
				</Switch>
			</div>
		);
	}
}

export default Home;