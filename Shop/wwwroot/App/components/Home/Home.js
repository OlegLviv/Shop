import React, {Component} from 'react';
import NavigationProducts from '../NavigationProducts/NavigationProducts';
import ProductPlace from '../ProductPlace/ProductPlace';
import {Route, Switch} from 'react-router-dom';
import './Home.scss';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('home', this.props.isLogIn);
		return (
			<div className="home-container">
				<div className="row">
					<div className="col-xl-3 col-lg-4">
						<NavigationProducts/>
					</div>
					<div className="col-xl-9 col-lg-8">
						<Switch>
							<Route exact path="/products/:category/:subCategory"
								   render={(props) => <ProductPlace {...props} isLogIn={this.props.isLogIn}
								   />}/>
							<Route path="/products/:category/:subCategory/:q" component={ProductPlace}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;