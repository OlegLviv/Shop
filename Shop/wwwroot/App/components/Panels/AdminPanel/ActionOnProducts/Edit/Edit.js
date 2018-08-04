import React from 'react';
import './Edit.scss';
import {apiPut, apiGet, apiDelete} from "../../../../../services/api";
import {
	getProductsByNameUrl,
	EDIT_PRODUCT_URL,
	getDeleteProductUrl,
	getProductImageCountUrl,
	getDeleteProductImageUrl, getProductImageUrl
} from "../../../../../services/urls/productUrls";
import Pagination from 'react-js-pagination';
import {Spinner} from "../../../../Spinner/Spinner";
import {SuccessDeletedModal} from "./SuccessDeletedModal";
import {SuccessUpdatedModal} from "./SuccessUpdatedModal";
import DocumentTitle from 'react-document-title';
import {normalizeRouteToCategory, normalizeRouteToSubCategory} from "../../../../../utils/productsUtils";

const howProductsPerPage = 5;

const createForm = state => {
	const form = new FormData();
	form.append('productId', state.selectedProduct.id);
	form.append('name', state.newProductName);
	form.append('price', state.newProductPrice);
	form.append('discount', state.newProductDiscount);
	form.append('isAvailable', state.selectedProduct.isAvailable);
	form.append('description', state.newProductDescription);
	form.append('isHidden', state.newProductIsHidden);

	for (let i = 0; i < state.images.length; i++) {
		if (state.images[i])
			form.append('images', state.images[i]);
		else form.append('images', new File([], 'not file'))
	}
	return form;
};

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
			newProductIsHidden: false,
			isLoading: false,
			isDeleteConfirmed: false,
			imgUrls: [],
			isShowSuccessDeleted: false,
			isShowSuccessUpdated: false,
			loadedImg: false,
			images: []
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

		this.setState({searchValue: e.target.value, isLoading: true});

		apiGet(getProductsByNameUrl(e.target.value, 1, howProductsPerPage))
			.then(resp => {
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isLoading: false,
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

	onPaginationChange = pageNumber => {
		this.setState({
			isLoading: true,
			loadedImg: false
		});

		apiGet(getProductsByNameUrl(this.state.searchValue, pageNumber, howProductsPerPage))
			.then(resp => {
				this.setState({
					products: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount,
					isLoading: false
				});
			})
			.catch(err => {
				this.setState({
					isLoading: false
				});
				alert(`Error: ${err}`);
			});
	};

	onSaveProduct = () => {
		this.setState({isLoading: true});

		apiPut(EDIT_PRODUCT_URL, createForm(this.state))
			.then(resp => {
				this.setState({
					isLoading: false,
					isShowSuccessUpdated: true
				});
			})
			.catch(err => {
				console.error(err);
			});
	};

	onDeleteProduct = () => {
		this.setState({isLoading: true});

		apiDelete(getDeleteProductUrl(this.state.selectedProduct.id))
			.then(resp => {
				if (resp.data >= 1) {
					this.setState({
						isLoading: false,
						isDeleteConfirmed: false,
						isShowSuccessDeleted: true,
						selectedProduct: null
					});
				}
				else {
					alert('Неможливо видалити товар. Ви можете його сховати');
					this.setState({isLoading: false});
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

	onCloseSuccessDeletedModal = () => {
		this.setState({isShowSuccessDeleted: false});
		this.onCloseEditPanel();
	};

	onCloseSuccessUpdatedModal = () => this.setState({isShowSuccessUpdated: false});

	onImgLoad = () => this.setState({loadedImg: true});

	onChangeImg = (i, {target}) => {
		const file = target.files[0];
		const images = [...this.state.images];
		images[i] = file;
		this.setState({images});
	};

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
				<div>Змінити на нову</div>
				<input type="file" accept="image/*" onChange={e => this.onChangeImg(i, e)}/>
			</td>
		</tr>));
	};

	renderEditPanel = () => {
		const {selectedProduct} = this.state;

		return (
			<div>
				{!this.state.isLoading && selectedProduct ? <table>
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
						<td>Є в наявності</td>
						<td>
							<input type="checkbox"
								   checked={this.state.selectedProduct.isAvailable}
								   onChange={({target}) => {
									   const selectedProduct = {...this.state.selectedProduct};
									   selectedProduct.isAvailable = target.checked;
									   this.setState({selectedProduct: selectedProduct});
								   }}/>
						</td>
					</tr>
					<tr>
						<td>Опис</td>
						<td>
							<input className="form-control" placeholder="Введіть опис"
								   value={this.state.newProductDescription}
								   onChange={e => this.setState({newProductDescription: e.target.value})}/>
						</td>
					</tr>
					{this.renderImagesEdit()}
					<tr>
						<td>
							<div>Сховати товар</div>
						</td>
						<td>
							<input type="checkbox"
								   onChange={() => this.setState(prev => ({newProductIsHidden: !prev.newProductIsHidden}))}/>
						</td>
					</tr>
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
			<DocumentTitle title="Редактор товару">
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
					{!this.state.products.length && this.state.searchValue && !this.state.isLoading && this.renderNotFoundProducts()}
					{!this.state.selectedProduct ? <div>
						<div className="edit-container__product-list-box">
							{this.state.products.length > 0 && <h6 className="text-center">Оберіть товар</h6>}
							{!this.state.isLoading ?
								<ul className="list-group edit-container__product-list-box__list-group">
									{
										this.state.products.map(item => (
											<li key={item.id}
												className="list-group-item list-group edit-container__product-list-box__list-group__item"
												onClick={() => this.onProductClick(item)}>
												<div>
													<div>{`Назва продукту: ${item.name}`}</div>
													<div>{`Категорія: ${normalizeRouteToCategory(item.category)}`}</div>
													<div>{`Підкатегорія: ${normalizeRouteToSubCategory(item.subCategory)}`}</div>
												</div>
												<div>
													<img className=""
														 style={{
															 display: `${!this.state.loadedImg ? 'none' : 'block'}`
														 }}
														 src={getProductImageUrl(item.id)}
														 alt="Card image cap"
														 onLoad={this.onImgLoad}
													/>
													{!this.state.loadedImg && <img className=""
																				   src={require('../../../../../spinner.gif')}/>}
												</div>
											</li>))
									}
								</ul> : <Spinner/>}
						</div>
						<div className="edit-container__pagin-box">
							{this.state.products.length > 0 &&
							<Pagination totalItemsCount={this.state.totalProductCount}
										itemsCountPerPage={howProductsPerPage}
										onChange={this.onPaginationChange}
										activePage={this.state.activePage}
										itemClass="page-item"
										linkClass="page-link"
										innerClass="edit-container__pagin-box__pagin pagination"/>}
						</div>
					</div> : this.renderEditPanel()}
				</div>
			</DocumentTitle>
		)
	}
}

export default Edit;