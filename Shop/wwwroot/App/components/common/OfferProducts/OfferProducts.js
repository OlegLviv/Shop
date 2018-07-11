import React, {Component} from 'react';
import './OfferProducts.scss';
import {apiWithoutRedirect} from "../../../services/api";
import {getProductsByIdsUrl} from "../../../services/urls/productUrls";
import {getProductIdOffers} from "../../../services/cookies";
import {Spinner} from "../../Spinner/Spinner";
import {ProductCard} from './ProductCard';

class OfferProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: false
		}
	}

	componentDidMount() {
		if (!getProductIdOffers()[0])
			return;

		this.trySetLoading();
		apiWithoutRedirect()
			.get(getProductsByIdsUrl(getProductIdOffers()))
			.then(resp => {
				console.log('resp', resp);
				this.setState({
					products: resp.data,
					loading: false
				});
			})
			.catch(err => {
				alert(`Error: ${JSON.stringify(err)}`);
				this.setState({loading: false});
			});
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	render() {
		const {products, loading} = this.state;

		return (
			<div className={`products-card-cont ${loading || (!loading && !products.length) ? 'full-w' : ''}`}>
				{!loading ? <div className="products-card-cont__box">
					{
						products.map(product => (
							<ProductCard
								className="products-card"
								id={product.id}
								name={product.name}/>
						))
					}
					{
						!loading && !products.length &&
						<h3 className="text-center w-100 pt-2 pb-2">Ви ще нічого не переглядали</h3>
					}
				</div> : <Spinner/>}
			</div>
		);
	}
}

export default OfferProducts;