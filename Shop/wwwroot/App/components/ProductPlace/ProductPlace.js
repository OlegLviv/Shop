import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrlByCatSubCat} from "../../services/urls/productUrls";
import ProductCard from "./ProductCard/ProductCard";
import './ProductPlace.scss';
import {addCookies} from "../../services/cookies";
import {addObjectQueryToProducts} from "../../utils/productsUtils";
import NavigationProducts from '../NavigationProducts/NavigationProducts';
import ExpandedNavigationProducts from "../NavigationProducts/ExpandedNavigationProducts";
import {getProductsUrlByQuery} from "../../services/urls/productUrls";
import {Spinner} from "../Spinner/Spinner";
import Pagination from 'react-js-pagination';
import {priceRange} from "../../utils/productsUtils";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

//todo need cary out max-min price to const
class ProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			activePage: 1,
			totalProductCount: 0,
			priceRange: priceRange,
			isProductsLoading: false,
			isProductsLoaded: false
		}
	}

	componentDidMount() {
		const category = getCategory(this.props);
		const subCategory = getSubCategory(this.props);
		if (!category && !subCategory) {
			return;
		}
		const prodUrl = getProductUrlByCatSubCat(category, subCategory);
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false})
		}
		this.setState({isProductsLoading: true});
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				// todo hz is this need
				console.log(resp.data);
				addObjectQueryToProducts(resp.data.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isProductsLoading: false,
					isProductsLoaded: true
				});
				// console.log('respDm', resp.data);
			})
			.catch(err => {
				console.log(err.response);
			});
	}

	componentWillReceiveProps(nextProps) {
		const category = getCategory(nextProps);
		const subCategory = getSubCategory(nextProps);
		if (!category && !subCategory) {
			return;
		}
		const prodUrl = getProductUrlByCatSubCat(getCategory(nextProps), getSubCategory(nextProps));
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false})
		}
		this.setState({isProductsLoading: true});
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				console.log(resp.data);
				addObjectQueryToProducts(resp.data.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isProductsLoading: false,
					isProductsLoaded: true
				});
			})
			.catch(err => {
				console.log(err.response);
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

	onPriceRangeChangeValue = (val) => {
		const newPriceRange = this.state.priceRange;
		newPriceRange.minPrice = val[0];
		newPriceRange.maxPrice = val[1];
		this.setState({
			priceRange: newPriceRange
		});
	};

	onPaginationChange = (pageNumber) => {
		this.setState({isProductsLoading: true});
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false})
		}
		const prodUrl = getProductsUrlByQuery(getCategory(this.props),
			getSubCategory(this.props),
			this.state.priceRange.minPrice,
			this.state.priceRange.maxPrice, ' ', pageNumber);
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				// todo hz is this need
				console.log(resp.data);
				addObjectQueryToProducts(resp.data.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isProductsLoading: false,
					isProductsLoaded: true
				});
				// console.log('respDm', resp.data);
			})
			.catch(err => {
				console.log(err.response);
			});
	};

	renderSwitchContent = () => {
		// console.log('loading:', this.state.isProductsLoading, 'loaded:', this.state.isProductsLoaded);
		if (!this.state.isProductsLoading && this.state.isProductsLoaded) {
			return (<div className="container-fluid container-products">
				<div className="row container-products__row">
					{this.state.products.map(item => {
						return (
							<div
								className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 container-products__row__item">
								<ProductCard
									product={item}
									key={item.id}
									onLikeButClick={this.onLikeButClick}
									onProductCardButClick={this.onProductCardButClick}/>
							</div>
						)
					})}
				</div>
				<div className="pagination-box">
					<Pagination totalItemsCount={this.state.totalProductCount}
								itemsCountPerPage={16}
								onChange={this.onPaginationChange}
								activePage={this.state.activePage}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination-box__pagination pagination"/>
				</div>
			</div>);
		}
		if (this.state.isProductsLoading && !this.state.isProductsLoaded) {
			return <Spinner/>
		}
		if (!this.state.isProductsLoading && !this.state.isProductsLoaded) {
			return <div>Def content</div>
		}
	};

	// todo need fix if products > 0. Closing expanded nav products and can't continue filtration
	render() {
		return (
			<div className="row">
				<div className="col-xl-3 col-lg-4">
					{
						this.state.products.length > 0 ? <ExpandedNavigationProducts
								products={this.state.products}
								onPriceRangeChangeValue={this.onPriceRangeChangeValue}/> :
							<NavigationProducts/>
					}
				</div>
				<div className="col-xl-9 col-lg-8">
					{this.renderSwitchContent()}
				</div>
			</div>
		);
	}
}

export default ProductPlace;