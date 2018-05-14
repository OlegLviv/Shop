import React from 'react';
import './AddNew.scss';
import {
	NAVIGATION_CATEGORIES,
	getSubCategories,
	normalizeSubCategoryToRoute,
	normalizeCategoryToRoute,
	createProductQueryByObject
} from "../../../../../utils/productsUtils";
import {apiGet, apiPost} from "../../../../../services/api";
import {getProductPropsUrl} from "../../../../../services/urls/productUrls";
import {clearObjectProps} from "../../../../../utils/utils";
import {ADD_PRODUCT_URL} from "../../../../../services/urls/productUrls";
import {Spinner} from "../../../../Spinner/Spinner";
import {Link} from 'react-router-dom';
import {SuccessSavedProductModal} from "./SuccessSavedProductModal";
import {isValidProductDescription, isValidProductName, isValidProductPrice} from "../../../../../utils/validationUtils";
import {MaxImageAlertModal} from "./MaxImageAlertModal";
import {MaxSizeFileAlertModal} from "./MaxSizeFileAlertModal";

const MAX_IMAGE_SIZE = 3000000;

const addImageToForm = (form, {files}) => {
	for (let i in files) {
		form.append('images', files[i]);
	}
};

class AddNew extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: NAVIGATION_CATEGORIES[1],
			subCategory: getSubCategories(NAVIGATION_CATEGORIES[1])[0],
			subCategoryProps: [],
			name: '',
			price: 0,
			description: '',
			product: {},
			files: [],
			isLoading: false,
			isShowSuccessSavedProductModal: false,
			isValidName: true,
			isValidPrice: true,
			isValidDescription: true,
			isShowMaxImageAlertModal: false,
			isShowMaxSizeFileAlertModal: false
		}
	}

	componentDidMount() {
		this.setSubCategoryState();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.subCategory !== this.state.subCategory)
			this.setSubCategoryState();

		if (prevState.category !== this.state.category) {
			this.onChangeOptionSubCategory({
				target: {
					value: getSubCategories(this.state.category)[0]
				}
			})
		}
	}

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	setSubCategoryState = () => {
		this.trySetLoading();

		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)))
			.then(resp => {
				console.log('resp', resp.data);
				const product = {...this.state.product};
				clearObjectProps(product);
				for (let i in resp.data) {
					product[resp.data[i].propValue] = resp.data[i].possiblePropsValues[0];
				}
				this.setState({
					subCategoryProps: resp.data,
					product: product,
					isLoading: false
				});
			})
			.catch(err => alert(`Error: ${err}`));
	};

	createFormData = () => {
		const query = createProductQueryByObject(this.state.product);
		const form = new FormData();

		form.append('category', normalizeCategoryToRoute(this.state.category));
		form.append('subCategory', normalizeSubCategoryToRoute(this.state.subCategory));
		form.append('name', this.state.name);
		form.append('price', this.state.price);
		form.append('query', query);
		form.append('description', this.state.description);

		return form;
	};

	validateName = value => {
		if (!isValidProductName(value)) {
			this.setState({isValidName: false});
			return;
		}
		if (isValidProductName(value) && !this.state.isValidName)
			this.setState({isValidName: true});
	};

	validatePrice = value => {
		if (!isValidProductPrice(value)) {
			this.setState({isValidPrice: false});
			return;
		}
		if (isValidProductPrice(value) && !this.state.isValidPrice)
			this.setState({isValidPrice: true});
	};

	validateDescription = value => {
		if (!isValidProductDescription(value)) {
			this.setState({isValidDescription: false});
			return;
		}
		if (isValidProductDescription(value) && !this.state.isValidDescription)
			this.setState({isValidDescription: true});
	};

	validateAllFields = successAction => {
		const {name, price, description} = this.state;
		if (!isValidProductName(name)) {
			this.setState({isValidName: false});
		}
		if (!isValidProductPrice(price)) {
			this.setState({isValidPrice: false});
		}
		if (!isValidProductDescription(description)) {
			this.setState({isValidDescription: false});
		}
		if (isValidProductName(name) && isValidProductPrice(price) && isValidProductDescription(description) && successAction)
			successAction();
	};

	onChangeOptionCategory = e => this.setState({category: e.target.value});

	onChangeOptionSubCategory = e => this.setState({subCategory: e.target.value});

	onChangeProductName = ({target}) => {
		this.validateName(target.value);
		this.setState({name: target.value});
	};

	onChangePrice = ({target}) => {
		this.validatePrice(target.value);
		this.setState({price: target.value});
	};

	onChangeDescription = ({target}) => {
		this.validateDescription(target.value);
		this.setState({description: target.value});
	};

	onChangeFile = e => {
		const {files} = e.target;

		if (files.length > 3) {
			e.target.value = null;
			this.setState({isShowMaxImageAlertModal: true});
			return;
		}

		const newFiles = [];

		for (const i in files) {
			if (files[i].size > MAX_IMAGE_SIZE) {
				e.target.value = null;
				this.setState({isShowMaxSizeFileAlertModal: true});
				return;
			}
			newFiles.push(files[i]);
		}

		this.setState({files: files});
	};

	onChangePropsValue = (propName, e) => {
		const product = {...this.state.product};
		product[propName] = e.target.value;
		console.log(product);
		this.setState({product: product});
	};

	onSave = () => {
		this.validateAllFields(() => {
			this.trySetLoading();

			const form = this.createFormData();

			addImageToForm(form, this.state);

			console.log('form', form.get('images'));
			apiPost(ADD_PRODUCT_URL, form)
				.then(resp => {
					if (resp.data >= 1) {
						this.setState({
							isShowSuccessSavedProductModal: true,
							isLoading: false,
							price: '',
							name: '',
							description: '',
							files: []
						});
					}
				})
				.catch(err => {
					alert(`Error: ${err}`);
					this.setState({isLoading: false});
				});
		});
	};

	onClear = () => {
		this.setState({
			files: [],
		})
	};

	renderSuccessSavedModal = () => <SuccessSavedProductModal isOpen={this.state.isShowSuccessSavedProductModal}
															  onClose={() => this.setState({isShowSuccessSavedProductModal: false})}/>;

	renderMaxImageAlertModal = () => <MaxImageAlertModal isOpen={this.state.isShowMaxImageAlertModal}
														 onClose={() => this.setState({isShowMaxImageAlertModal: false})}/>;

	renderMaxSizeFileAlertModal = () => <MaxSizeFileAlertModal isOpen={this.state.isShowMaxSizeFileAlertModal}
															   onClose={() => this.setState({isShowMaxSizeFileAlertModal: false})}/>;

	renderSelectedImages = () => {
		return (
			this.state.files.length > 0 && <div>
				<h3 className="text-center my-3">Обрані фотографії</h3>
				<div className="selected-images-box">
					{
						Array.prototype.map.call(this.state.files, file => <img src={URL.createObjectURL(file)}/>)
					}
				</div>
			</div>
		)
	};

	renderError = text => <small className="form-text text-muted invalid-small">{text}</small>;

	render() {
		const {isValidPrice, isValidDescription, isValidName} = this.state;
		return (
			!this.state.isLoading ? <div className="container-add-new">
				{this.renderSuccessSavedModal()}
				{this.renderMaxImageAlertModal()}
				{this.renderMaxSizeFileAlertModal()}
				<div className="row container-add-new__row">
					<div className="col-6 container-add-new__row__item" border-right="true">
						<div>Оберіть карегорію</div>
					</div>
					<div className="col-6 container-add-new__row__item">
						<div>Оберіть підкарегорію</div>
					</div>
					<div className="col-6 container-add-new__row__item--inverse" border-right="true"
						 border-bottom="true" border-left="true">
						<select onChange={this.onChangeOptionCategory} defaultValue={this.state.category}>
							{
								NAVIGATION_CATEGORIES.map(item => <option
									value={item}>{item}
								</option>)
							}
						</select>
					</div>
					<div className="col-6 container-add-new__row__item--inverse" border-right="true"
						 border-bottom="true">
						<select onChange={this.onChangeOptionSubCategory} value={this.state.subCategory}>
							{
								getSubCategories(this.state.category).map(item => <option>{item}</option>)
							}
						</select>
					</div>
					<div className="col-6 container-add-new__row__item" border-right="true" margin-top="true">
						<div>Властивість товару</div>
					</div>
					<div className="col-6 container-add-new__row__item" margin-top="true">
						<div>Значення властивості</div>
					</div>

					<div className="container-add-new__props">
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true" border-left="true">
							<div className="container-add-new__props__item--inverse__text">Назва</div>
						</div>
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true">
							<input className="form-control" onChange={this.onChangeProductName}/>
							{!isValidName && this.renderError('Мінімальна кількість символів 2, максимальна 64')}
						</div>
					</div>

					{
						this.state.subCategoryProps.map(item => {
							return (
								<div className="container-add-new__props">
									<div className="col-6 container-add-new__props__item--inverse"
										 border-right="true"
										 border-bottom="true" border-left="true">
										<div
											className="container-add-new__props__item--inverse__text">{item.propValue}</div>
									</div>
									<div className="col-6 container-add-new__props__item--inverse"
										 border-right="true"
										 border-bottom="true">
										<select onChange={(e) => this.onChangePropsValue(item.propValue, e)}>
											{
												item.possiblePropsValues.map(itemPP =>
													<option>{itemPP}</option>)
											}
										</select>
									</div>
								</div>
							)
						})
					}
					<div className="container-add-new__props">
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true" border-left="true">
							<div className="container-add-new__props__item--inverse__text">Ціна</div>
						</div>
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true">
							<input className="form-control" value={this.state.price} onChange={this.onChangePrice}/>
							{!isValidPrice && this.renderError('Поле може містити тільки цифри. Максимальна ціна 99999')}
						</div>
					</div>
					<div className="container-add-new__props">
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true" border-left="true">
							<div className="container-add-new__props__item--inverse__text">Опис товару</div>
						</div>
						<div className="col-6 container-add-new__props__item--inverse" border-right="true"
							 border-bottom="true">
							<input className="form-control" value={this.state.description}
								   onChange={this.onChangeDescription}/>
							{!isValidDescription && this.renderError('Максимальна кількість символів 512')}
						</div>
					</div>
				</div>
				<div className="container-add-new__row__add-new-prop-box text-center">
					<small>* Для того, щоб додати нову властивість перейдіть в Товари->
						<Link to="/adminPanel/action-on-products/add-new-characteristic">Додати нові
							характеристики</Link></small>
					<br/>
					<small>** Для того, щоб редагувати властивість перейдіть в Товари->
						<Link to="/adminPanel/action-on-products/edit-characteristic">Редагувати
							характеристики</Link></small>
				</div>
				<div className="container-add-new__row__file-box">
					<input type="file" onChange={this.onChangeFile} multiple accept="image/*"/>
				</div>
				{this.renderSelectedImages()}
				<div className="container-add-new__action-box">
					<button className="btn btn-info container-add-new__action-box__save"
							onClick={this.onSave}>Зберегти товар
					</button>
					<button className="btn btn-danger container-add-new__action-box__clear"
							onClick={this.onClear}>Очистити фото
					</button>
				</div>
			</div> : <Spinner/>
		)
	}
}

export default AddNew;