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

	fetchImgSrc = id => {
		const GET_PRODUCT_IMG = getProductImageUrl(id, 0);
		const GET_PRODUCT_IMG_COUNT = getProductImageCountUrl(id);

		return Promise.resolve(apiWithoutRedirect()
			.get(GET_PRODUCT_IMG_COUNT)
			.then(resp => {
				if (resp.data > 0) {
					return GET_PRODUCT_IMG;
				}
				else
					return 'https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png';
			}));
	};

	//	todo need implement handler of ProductCard
	render() {
		return (
			<div className="main">
				<div className="main__header">
					Найпопулярніші товари
				</div>
				{!this.state.isLoading ? <div className="row main__products-box">
					{this.state.products.map(item => {
						return (
							<div
								className="col-xl-3 col-lg-4 col-md-4 col-sm-4 col-6">
								<ProductCard
									imgSrcPromise={this.fetchImgSrc(item.id)}
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
		);
	}
}

export default MostPopular;