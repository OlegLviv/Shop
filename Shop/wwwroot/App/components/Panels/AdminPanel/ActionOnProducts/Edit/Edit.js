import React from 'react';
import './Edit.scss';
import {apiPut, apiGet, apiDelete} from "../../../../../services/api";
import {
	getProductsByNameUrl,
	EDIT_PRODUCT_URL,
	getDeleteProductUrl,
	getProductImageCountUrl,
	getDeleteProductImageUrl
} from "../../../../../services/urls/productUrls";
import Pagination from 'react-js-pagination';
import {Spinner} from "../../../../Spinner/Spinner";
import {SuccessDeletedModal} from "./SuccessDeletedModal";
import {SuccessUpdatedModal} from "./SuccessUpdatedModal";

const howProductsPerPage = 5;

//	todo need fix spinner and deleting images
class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			products: [],
			activePage: 1,
			totalProductCount: 0,
			selectedProduct: null,
			newProductName: '',
			newProductPrice: 0,
			newProductDiscount: 0,
			newProductDescription: '',
			isLoading: false,
			isLoaded: true,
			isDeleteConfirmed: false,
			imgUrls: [],
			isShowSuccessDeleted: false,
			isShowSuccessUpdated: false
		}
	}

	getImageCount = () => apiGet(getProductImageCountUrl(this.state.selectedProduct.id));

	onChangeSearch = e => {
		if (!e.target.value) {
			this.setState({
				products: [],
				searchValue: ''
			});
			return;
		}

		this.setState({searchValue: e.target.value, isLoading: true, isLoaded: false});

		apiGet(getProductsByNameUrl(e.target.value, 1, howProductsPerPage))
			.then(resp => {
				console.log(resp.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isLoading: false, isLoaded: true
				});
			})
	};

	onProductClick = item => {
		this.setState({
			selectedProduct: item,
			newProductName: item.name,
			newProductPrice: item.price,
			newProductDiscount: item.discount,
			newProductDescription: item.description,
			activePage: 1
		});
	};

	onPaginationChange = (pageNumber) => {
		apiGet(getProductsByNameUrl(this.state.searchValue, pageNumber, howProductsPerPage))
			.then(resp => {
				console.log(resp.data);
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount
				});
			})
	};

	onSaveProduct = () => {
		if (this.state.isLoaded) {
			this.setState({isLoaded: false});
		}
		this.setState({isLoading: true});
		const newProduct = {
			productId: this.state.selectedProduct.id,
			name: this.state.newProductName,
			price: this.state.newProductPrice,
			discount: this.state.newProductDiscount,
			description: this.state.newProductDescription
		};
		apiPut(EDIT_PRODUCT_URL, newProduct)
			.then(resp => {
				console.log(resp.data);
				this.setState({
					isLoading: false,
					isLoaded: true,
					isShowSuccessUpdated: true
				});
			})
			.catch(err => {
				console.error(err.response.data);
			});
	};

	onDeleteProduct = () => {
		if (this.state.isLoaded) {
			this.setState({isLoaded: false});
		}
		this.setState({isLoading: true});
		apiDelete(getDeleteProductUrl(this.state.selectedProduct.id))
			.then(resp => {
				if (resp.data >= 1) {
					this.setState({
						isLoading: false,
						isLoaded: true,
						isDeleteConfirmed: false,
						isShowSuccessDeleted: true,
						selectedProduct: null
					});
				}
			})
			.catch(err => console.error(err.response.data));
	};

	onCloseEditPanel = () => {
		this.setState({
			selectedProduct: null,
			products: []
		});
		this.onChangeSearch({
			target: {
				value: this.state.searchValue
			}
		})
	};

	onDeleteImage = (i) => {
		apiDelete(getDeleteProductImageUrl(this.state.selectedProduct.id, i))
			.then(resp => console.log(resp));
	};

	onCloseSuccessDeletedModal = () => {
		this.setState({isShowSuccessDeleted: false});
		this.onCloseEditPanel();
	};

	onCloseSuccessUpdatedModal = () => this.setState({isShowSuccessUpdated: false});

	setImagesUrl = () => {
		Promise.all([this.getImageCount()])
			.then(resp => {
				const imgUrls = [];

				for (let i = 0; i < resp[0].data; i++) {
					imgUrls.push(`/api/Product/GetProductImage/${this.state.selectedProduct.id}/${i}`);
				}
				this.setState({imgUrls: imgUrls});
			})
			.catch(null);
	};

	renderImagesEdit = () => {
		this.setImagesUrl();
		return this.state.imgUrls.map((url, i) => (<tr>
			<td className="edit-product-img-td">
				<img alt="..." src={url}/>
			</td>
			<td>
				<button className="btn btn-danger" onClick={() => this.onDeleteImage(i)}>Видалити</button>
			</td>
		</tr>));
	};

	renderEditPanel = () => {
		const {selectedProduct} = this.state;
		return (
			<div>
				{this.state.isLoaded && !this.state.isLoading && selectedProduct ? <table>
					<thead className="table-head">
					<tr>
						<th>Назва властивості</th>
						<th>Значення властивості</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>Назва</td>
						<td>
							<input className="form-control" placeholder="Введіть назву продукту"
								   defaultValue={selectedProduct.name}
								   value={this.state.newProductName}
								   onChange={(e) => this.setState({newProductName: e.target.value})}/>
						</td>
					</tr>
					<tr>
						<td>Ціна</td>
						<td>
							<input className="form-control" placeholder="Введіть ціну продукту"
								   defaultValue={selectedProduct.price}
								   value={this.state.newProductPrice}
								   onChange={(e) => this.setState({newProductPrice: e.target.value})}/>
						</td>
					</tr>
					<tr>
						<td>Знижка в %</td>
						<td>
							<input className="form-control" placeholder="Введіть знижку"
								   defaultValue={selectedProduct.priceWithDiscount}
								   value={this.state.newProductDiscount}
								   onChange={(e) => this.setState({newProductDiscount: e.target.value})}/>
						</td>
					</tr>
					<tr>
						<td>Опис</td>
						<td>
							<input className="form-control" placeholder="Введіть опис"
								   defaultValue={selectedProduct.description}
								   value={this.state.newProductDescription}
								   onChange={e => this.setState({newProductDescription: e.target.value})}/>
						</td>
					</tr>
					{this.renderImagesEdit()}
					<tr>
						<td>
							<button className="btn btn-info" onClick={this.onSaveProduct}>Зберети</button>
						</td>
						<td>
							<button className="btn btn-danger" onClick={this.onCloseEditPanel}>Закрити</button>
						</td>
					</tr>
					<tr>
						<td>
							<button className="btn btn-warning"
									disabled={!this.state.isDeleteConfirmed}
									onClick={this.onDeleteProduct}>Видалити
							</button>
						</td>
						<td>
							<div>Ви впевнені що хочете видалити даний товар</div>
							<input type="checkbox"
								   onChange={() => this.setState(prev => ({isDeleteConfirmed: !prev.isDeleteConfirmed}))}/>
						</td>
					</tr>
					</tbody>
				</table> : <Spinner/>}
			</div>
		);
	};

	renderNotFoundProducts = () => <div className="not-found"><h4>Нічого не знайдено</h4></div>;

	renderSuccessDeletedModal = () => <SuccessDeletedModal isOpen={this.state.isShowSuccessDeleted}
														   onClose={this.onCloseSuccessDeletedModal}/>;

	renderSuccessUpdatedModal = () => <SuccessUpdatedModal isOpen={this.state.isShowSuccessUpdated}
														   onClose={this.onCloseSuccessUpdatedModal}/>;

	render() {
		return (
			<div className="edit-container">
				{this.renderSuccessDeletedModal()}
				{this.renderSuccessUpdatedModal()}
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
				{!this.state.products.length && this.state.searchValue && this.renderNotFoundProducts()}
				{!this.state.selectedProduct ? <div>
					<div className="edit-container__product-list-box">
						{this.state.products.length > 0 && <h6 className="text-center">Оберіть товар</h6>}
						{!this.state.isLoading && this.state.isLoaded ?
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
							</ul> : <Spinner/>}
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
				</div> : this.renderEditPanel()}
			</div>
		)
	}
}

export default Edit;