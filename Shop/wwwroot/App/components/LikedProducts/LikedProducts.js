import React from 'react';
import './LikedProducts.scss';
import {apiWithoutRedirect} from "../../services/api";
import {getProductsOutOfCookies} from "../../services/cookies";
import {getProductsByIdsUrl} from "../../services/urls/productUrls";
import {Link} from 'react-router-dom';

class LikedProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		const likedProductsIds = getProductsOutOfCookies('likedProducts');

		if (likedProductsIds.length === 0)
			return;

		apiWithoutRedirect()
			.get(getProductsByIdsUrl(likedProductsIds))
			.then(resp => this.setState({products: resp.data}));
	}

	render() {
		const {products} = this.state;

		return (
			<div className="liked-cont">
				<h1 className="text-center">В розробці</h1>
			</div>
		);
	}
}

export default LikedProducts;