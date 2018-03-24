import React, {Component} from 'react';
import NavigationProducts from '../NavigationProducts/NavigationProducts';
import ProductPlace from '../ProductPlace/ProductPlace';
import {Route, Switch} from 'react-router-dom';
import './Home.scss';

class Home extends Component {
	render() {
		return (
			<div className="home-container">
				<div className="row">
					<div className="col-4">
						<NavigationProducts/>
					</div>
					<div className="col-8">
						<Switch>
							<Route exact path="/products/:category/:subCategory" component={ProductPlace}/>
							<Route path="/products/:category/:subCategory/:q" component={ProductPlace}/>
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;