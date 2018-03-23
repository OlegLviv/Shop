import React, {Component} from 'react';
import NavigationProducts from '../NavigationProducts/NavigationProducts';
import ProductPlace from '../ProductPlace/ProductPlace';
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
						<ProductPlace/>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;