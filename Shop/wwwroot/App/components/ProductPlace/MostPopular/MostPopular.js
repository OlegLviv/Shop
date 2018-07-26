import React, {Component} from 'react';
import './MostPopular.scss';
import {
	getMostPopularProductsUrl,
	getProductImageCountUrl,
	getProductImageUrl
} from "../../../services/urls/productUrls";
import {apiWithoutRedirect} from "../../../services/api";
import ProductCard from '../ProductCard/ProductCard';
import {Spinner} from "../../Spinner/Spinner";
import {addProductCookies} from "../../../services/cookies";
import {connect} from "react-redux";
import DocumentTitle from 'react-document-title';

class MostPopular extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			products: []
		}
	}

	componentDidMount() {
		this.trySetLoading();

		apiWithoutRedirect()
			.get(getMostPopularProductsUrl())
			.then(resp => {
				this.setState({
					products: resp.data,
					isLoading: false
				});
			})
			.catch(() => this.setState({isLoading: false}));
	}

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	onAddProductToShoppingCardButClick = (e, id) => {
		addProductCookies('productsCard', id, 1);
		this.props.onAddProductToShoppingCard(id, 1);
	};

	//	todo need implement like product
	onLikeButClick = () => {
	};

	render() {
		return (
			<DocumentTitle title="Найпопулярніші товари">
				<div className="main">
					<div className="main__header">
						Найпопулярніші товари
					</div>
					{!this.state.isLoading ? <div className="row main__products-box">
						{this.state.products.map(item => {
							return (
								<div
									className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6">
									<ProductCard
										defaultImgSrc="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"
										product={item}
										key={item.id}
										onLikeButClick={this.onLikeButClick}
										onAddProduct={this.onAddProductToShoppingCardButClick}/>
								</div>
							)
						})}
					</div> : <Spinner/>}
				</div>
			</DocumentTitle>
		);
	}
}

export default connect(state => ({}), dispatch => ({
	onAddProductToShoppingCard: (id, count) => {
		dispatch({type: 'ADD_NEW', id: id, count: count})
	}
}))(MostPopular);