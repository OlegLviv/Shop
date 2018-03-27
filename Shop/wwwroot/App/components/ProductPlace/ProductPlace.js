import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrlByCatSubCat} from "../../services/urls/productUrls";
import ProductCard from "./ProductCard/ProductCard";
import './ProductPlace.scss';
import {addCookies} from "../../services/cookies";
import {addObjectQueryToProducts} from "../../services/productsServices";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
		}
	}

	componentDidMount() {
		const prodUrl = getProductUrlByCatSubCat(getCategory(this.props), getSubCategory(this.props));
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				// todo zh is this need
				// this.onGetCategorySubCategory(this.props);
				addObjectQueryToProducts(resp.data);
				this.setState({products: resp.data});
				console.log('respDm', resp.data);
			})
			.catch(err => {
				console.log(err.response);
			});
	}

	componentWillReceiveProps(nextProps) {
		const prodUrl = getProductUrlByCatSubCat(getCategory(nextProps), getSubCategory(nextProps));
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				addObjectQueryToProducts(resp.data);
				this.setState({products: resp.data});
				console.log('respWrp', resp.data);
				// this.onGetCategorySubCategory(nextProps);
			})
			.catch(err => {
				console.log(err.response);
			});
	}

	onGetCategorySubCategory(props) {
		this.props.onGetCategorySubCategory({
			category: getCategory(props),
			subCategory: getSubCategory(props)
		});
	}

	// TODO need add functional with loginned users
	onProductCardButClick = (e, id) => {
		if (!this.props.isLogIn) {
			addCookies('productsCard', id, 1);
		}
	};

	onLikeButClick = (e, id) => {
		if (!this.props.isLogIn) {
			addCookies('likeProducts', id, 1);
		}
	};

	render() {
		return (
			<div className="container-fluid container-products">
				<div className="row container-products__row">
					{this.state.products.map(item => {
						return (
							<div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 container-products__row__item">
								<ProductCard
									product={item}
									key={item.id}
									onLikeButClick={this.onLikeButClick}
									onProductCardButClick={this.onProductCardButClick}/>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}

export default ProductPlace;