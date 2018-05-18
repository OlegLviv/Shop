import React, {Component} from 'react';
import './Discount.scss';
import {apiWithoutRedirect} from "../../../services/api";
import {
	getProductImageCountUrl,
	getProductImageUrl,
	getWithDiscountProductsUrl
} from "../../../services/urls/productUrls";
import Pagination from 'react-js-pagination';
import ProductCard from '../ProductCard/ProductCard';

const ITEMS_PER_PAGE = 16;

class Discount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			loading: false,
			activePage: 1,
			totalProductCount: 0
		}
	}

	componentDidMount() {
		this.trySetLoading();

		apiWithoutRedirect()
			.get(getWithDiscountProductsUrl(this.state.activePage, ITEMS_PER_PAGE))
			.then(resp => {
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					loading: false
				});
			})
			.catch(err => {
				this.setState({loading: false});
				alert(`Error: ${JSON.stringify(err)}`);
			});
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

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

	render() {
		return (
			<div className="discount">
				<div className="discount__header">
					Товари зі знижками
				</div>
				<div className="row">
					{
						this.state.products.map(product => <div className="col-4">
							<ProductCard
								imgSrcPromise={this.fetchImgSrc(product.id)}
								defaultImgSrc="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"
								product={product}
								key={product.id}
								onLikeButClick={this.onLikeButClick}
								onAddProduct={this.onAddProductToShoppingCardButClick}/>
						</div>)
					}
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
			</div>
		);
	}
}

export default Discount;