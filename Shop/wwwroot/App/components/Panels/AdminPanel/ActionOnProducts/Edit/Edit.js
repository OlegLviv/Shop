import React from 'react';
import './Edit.scss';
import {apiWithoutRedirect} from "../../../../../services/api";
import {getProductsUrlByName} from "../../../../../services/urls/productUrls";
import Pagination from 'react-js-pagination';

const howProductsPerPage = 5;

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			products: [],
			activePage: 1,
			totalProductCount: 0,
			isProductsHidden: false
		}
	}

	onChangeSearch = e => {
		if (!e.target.value) {
			this.setState({
				products: [],
				searchValue: ''
			});
			return;
		}

		this.setState({searchValue: e.target.value});
		apiWithoutRedirect()
			.get(getProductsUrlByName(e.target.value, this.state.activePage, howProductsPerPage))
			.then(resp => {
				console.log(resp.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount
				});
			})
	};

	onProductClick = item => {
		this.setState({isProductsHidden: true});
	};

	onPaginationChange = (pageNumber) => {
		apiWithoutRedirect()
			.get(getProductsUrlByName(this.state.searchValue, pageNumber, howProductsPerPage))
			.then(resp => {
				console.log(resp.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount
				});
			})
	};

	render() {
		return (
			<div className="edit-container">
				<div className="edit-container__header">
					Редактор товару
				</div>
				<div className="edit-container__search-box">
					<h6 className="text-center">Пошук</h6>
					<input className="form-control"
						   placeholder="Пошук товару"
						   onChange={this.onChangeSearch}
						   value={this.state.searchValue}/>
				</div>
				{!this.state.isProductsHidden && <div>
					<div className="edit-container__product-list-box">
						{this.state.products.length > 0 && <h6 className="text-center">Оберіть товар</h6>}
						<ul className="list-group edit-container__product-list-box__list-group">
							{
								this.state.products.map(item => <li key={item.id}
																	className="list-group-item list-group edit-container__product-list-box__list-group__item"
																	onClick={() => this.onProductClick(item)}>
									<div>{`Назва продукту: ${item.name}`}</div>
									<div>{`Категорія: ${item.category}`}</div>
									<div>{`Підкатегорія: ${item.subCategory}`}</div>
								</li>)
							}
						</ul>
					</div>
					<div className="edit-container__pagin-box">
						{this.state.products.length > 0 && <Pagination totalItemsCount={this.state.totalProductCount}
																	   itemsCountPerPage={16}
																	   onChange={this.onPaginationChange}
																	   activePage={this.state.activePage}
																	   itemClass="page-item"
																	   linkClass="page-link"
																	   innerClass="edit-container__pagin-box__pagin pagination"/>}
					</div>
				</div>}
			</div>
		)
	}
}

export default Edit;