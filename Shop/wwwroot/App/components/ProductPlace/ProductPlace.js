import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductByCatSubCatUrl, getProductsByQueryUrl} from "../../services/urls/productUrls";
import ProductCard from "./ProductCard/ProductCard";
import './ProductPlace.scss';
import {addProductCookies} from "../../services/cookies";
import {addObjectQueryToProducts, createProductsQueryByObject} from "../../utils/productsUtils";
import NavigationProducts from './NavigationProducts/NavigationProducts';
import ExpandedNavigationProducts from "./NavigationProducts/ExpandedNavigationProducts";
import {Spinner} from "../Spinner/Spinner";
import Pagination from 'react-js-pagination';
import {priceRange} from "../../utils/productsUtils";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: null,
			activePage: 1,
			totalProductCount: 0,
			priceRange: {
				minPrice: priceRange.minPrice,
				maxPrice: priceRange.maxPrice
			},
			isProductsLoading: false,
			isProductsLoaded: false,
			sortingType: 0,
			howManyToShow: 16,
			priceRangeForPagination: {
				minPrice: priceRange.minPrice,
				maxPrice: priceRange.maxPrice
			}
		}
	}

	componentDidMount() {
		const category = getCategory(this.props);
		const subCategory = getSubCategory(this.props);
		if (!category && !subCategory) {
			return;
		}
		const prodUrl = getProductByCatSubCatUrl(category, subCategory);
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
			})
			.catch(err => {
				console.log(err.response);
			});
	}

	componentWillReceiveProps(nextProps) {
		const category = getCategory(nextProps);
		const subCategory = getSubCategory(nextProps);
		if (!category && !subCategory) {
			this.setState({products: null});
			return;
		}
		const prodUrl = getProductByCatSubCatUrl(getCategory(nextProps), getSubCategory(nextProps));
		this.renderLoadingSpinner();
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

	onProductCardButClick = (e, id) => {
		// if (!this.props.isLogIn) {
			addProductCookies('productsCard', id, 1);
		// }
	};

	onLikeButClick = (e, id) => {
		if (!this.props.isLogIn) {
			addProductCookies('likeProducts', id, 1);
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
		this.renderLoadingSpinner();
		console.log(this.state.priceRangeForPagination);
		const prodUrl = getProductsByQueryUrl(getCategory(this.props),
			getSubCategory(this.props),
			this.state.priceRangeForPagination.minPrice,
			this.state.priceRangeForPagination.maxPrice, ' ', pageNumber,
			this.state.howManyToShow,
			this.state.sortingType);
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
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
	};

	onSearchByFilter = (priceFrom, priceTo, queryDictionary) => {
		console.log('qd', queryDictionary);
		this.renderLoadingSpinner();
		const prodUrl = getProductsByQueryUrl(getCategory(this.props),
			getSubCategory(this.props),
			priceFrom,
			priceTo,
			Object.keys(queryDictionary).length > 0 ? createProductsQueryByObject(queryDictionary) : ' ',
			1,
			this.state.howManyToShow,
			this.state.sortingType
		);
		console.log('url', prodUrl);
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				const priceRange = this.state.priceRangeForPagination;
				priceRange.minPrice = priceFrom;
				priceRange.maxPrice = priceTo;
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isProductsLoading: false,
					isProductsLoaded: true,
					priceRangeForPagination: priceRange
				});
			})
			.catch(err => {
				console.log(err);
			})
	};

	onChangeSortingType = e => {
		this.setState({sortingType: e.target.value});
	};

	onChangeHowManyToShow = e => {
		this.setState({howManyToShow: e.target.value});
	};

	renderLoadingSpinner = () => {
		this.setState({isProductsLoading: true});
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false})
		}
	};


	renderSwitchContent = () => {
		console.log('loading', this.state.isProductsLoading);
		console.log('loaded', this.state.isProductsLoaded);
		if (!this.state.isProductsLoading && this.state.isProductsLoaded && (this.state.products ? this.state.products.length > 0 : false)) {
			return (<div className="container-fluid container-products">
				<div className="container-products__how-to-show">
					<select className="container-products__how-to-show__sort" onChange={this.onChangeSortingType}
							value={this.state.sortingType}>
						<option value={0}>Позиція</option>
						<option value={1}>Найдорожчі спочатку</option>
						<option value={2}>Найдешевші спочатку</option>
					</select>
					<select className="container-products__how-to-show__per-page" onChange={this.onChangeHowManyToShow}
							value={this.state.howManyToShow}>
						<option value={16}>16</option>
						<option value={32}>32</option>
					</select>
				</div>
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
								itemsCountPerPage={this.state.howManyToShow}
								onChange={this.onPaginationChange}
								activePage={this.state.activePage}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination-box__pagination pagination"/>
				</div>
			</div>);
		}
		if (this.state.isProductsLoaded && !this.state.isProductsLoading && (this.state.products ? this.state.products.length === 0 : false)) {
			return <div className="text-center">
				<h3>Нічого не знайдено</h3>
			</div>;
		}
		if (this.state.isProductsLoading && !this.state.isProductsLoaded) {
			return <Spinner/>
		}
		else return <div>Def content</div>;
	};

// todo need fix if products > 0. Closing expanded nav products and can't continue filtration
	render() {
		return (
			<div className="row">
				<div className="col-xl-3 col-lg-4">
					{
						this.state.products ? <ExpandedNavigationProducts
								products={this.state.products}
								onPriceRangeChangeValue={this.onPriceRangeChangeValue}
								onSearchByFilter={this.onSearchByFilter}/> :
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