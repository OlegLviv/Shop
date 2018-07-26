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
import {
	isValidProductDescription,
	isValidProductDiscount,
	isValidProductName,
	isValidProductPrice
} from "../../../../../utils/validationUtils";
import {MaxImageAlertModal} from "./MaxImageAlertModal";
import {MaxSizeFileAlertModal} from "./MaxSizeFileAlertModal";
import DocumentTitle from 'react-document-title';

const MAX_IMAGE_SIZE = 3000000;

const addImageToForm = (form, {files, mainFile}) => {
	form.append('images', mainFile);

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
			discount: 0,
			description: '',
			product: {},
			files: [],
			mainFile: null,
			isLoading: false,
			isValidName: true,
			isValidPrice: true,
			isValidDiscount: true,
			isValidDescription: true,
			isShowMaxImageAlertModal: false,
			isShowMaxSizeFileAlertModal: false,
			isShowSuccessSavedProductModal: false
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

		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)), err => {
			if (err.response.data === 'Icorrect sub category or properties not found')
				this.setState({subCategoryProps: []});
			else alert(`Error: ${JSON.stringify(err.response)}`);
		})
			.then(resp => {
				console.log('resp', resp.data);
				console.log('sub cat', this.state.subCategory);
				console.log('sub cat normalize', normalizeSubCategoryToRoute(this.state.subCategory));
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
			.catch(() => this.setState({isLoading: false}));
	};

	createFormData = () => {
		const query = createProductQueryByObject(this.state.product);
		const form = new FormData();

		form.append('category', normalizeCategoryToRoute(this.state.category));
		form.append('subCategory', normalizeSubCategoryToRoute(this.state.subCategory));
		form.append('name', this.state.name);
		form.append('price', this.state.price);
		form.append('discount', this.state.discount);
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

	validateDiscount = value => {
		if (!isValidProductDiscount(value)) {
			this.setState({isValidDiscount: false});
			return;
		}
		if (isValidProductDiscount(value) && !this.state.isValidDiscount)
			this.setState({isValidDiscount: true});
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
		const {name, price, description, discount, mainFile} = this.state;
		if (!isValidProductName(name)) {
			this.setState({isValidName: false});
		}
		if (!isValidProductPrice(price)) {
			this.setState({isValidPrice: false});
		}
		if (!isValidProductDescription(description)) {
			this.setState({isValidDescription: false});
		}
		if (!mainFile) {
			alert('Будь ласка оберіть головне фото');
		}
		if (isValidProductName(name) &&
			isValidProductPrice(price) &&
			isValidProductDescription(description) &&
			isValidProductDiscount(discount) &&
			mainFile &&
			successAction
		)
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

	onChangeDiscount = ({target}) => {
		this.validateDiscount(target.value);
		this.setState({discount: target.value});
	};

	onChangeDescription = ({target}) => {
		this.validateDescription(target.value);
		this.setState({description: target.value});
	};

	onChangeFile = e => {
		const {files} = e.target;

		if (files.length > 2) {
			e.target.value = null;
			this.setState({isShowMaxImageAlertModal: true});
			return;
		}

		console.log('chosee files', files);

		for (const i in files) {
			if (files[i].size > MAX_IMAGE_SIZE) {
				e.target.value = null;
				this.setState({isShowMaxSizeFileAlertModal: true});
				return;
			}
		}

		this.setState({files: files});
	};

	onChangeMainFile = e => {
		const file = e.target.files[0];
		console.log('choose', file);
		if (file.size > MAX_IMAGE_SIZE) {
			e.target.value = null;
			this.setState({isShowMaxSizeFileAlertModal: true});
			return;
		}
		this.setState({mainFile: file});
	};

	onChangePropsValue = (propName, e) => {
		const product = {...this.state.product};
		product[propName] = e.target.value;
		console.log('product', product);
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
							files: [],
							mainFile: null
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
			mainFile: null
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
			<div>
				{
					this.state.mainFile && <div>
						<h3 className="text-center my-3">Обранa головна фотографія</h3>
						<div className="selected-images-box">
							{
								<img src={URL.createObjectURL(this.state.mainFile)}/>
							}
						</div>
					</div>
				}
				{
					this.state.files.length > 0 && <div>
						<h3 className="text-center my-3">Обрані фотографії</h3>
						<div className="selected-images-box">
							{
								Array.prototype.map.call(this.state.files, file => <img
									src={URL.createObjectURL(file)}/>)
							}
						</div>
					</div>
				}
			</div>
		)
	};

	renderError = text => <small className="form-text text-muted invalid-small">{text}</small>;

	render() {
		const {isValidPrice, isValidDescription, isValidName, isValidDiscount} = this.state;
		return (
			<DocumentTitle title="Додавання товару">
				{!this.state.isLoading ? <div className="container-add-new">
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

						{
							this.state.subCategoryProps.length > 0 && <div className="container-add-new__props">
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true" border-left="true">
									<div className="container-add-new__props__item--inverse__text">Назва</div>
								</div>
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true">
									<input className={`form-control ${!isValidName && 'invalid-input'}`}
										   onChange={this.onChangeProductName}/>
									{!isValidName && this.renderError('Мінімальна кількість символів 2, максимальна 64')}
								</div>
							</div>
						}

						{
							this.state.subCategoryProps.length > 0 && this.state.subCategoryProps.map(item => {
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
						{
							this.state.subCategoryProps.length > 0 && <div className="container-add-new__props">
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true" border-left="true">
									<div className="container-add-new__props__item--inverse__text">Ціна</div>
								</div>
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true">
									<input className={`form-control ${!isValidPrice && 'invalid-input'}`}
										   value={this.state.price} onChange={this.onChangePrice}/>
									{!isValidPrice && this.renderError('Поле може містити тільки цифри. Максимальна ціна 99999')}
								</div>
							</div>
						}
						{
							this.state.subCategoryProps.length > 0 && <div className="container-add-new__props">
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true" border-left="true">
									<div className="container-add-new__props__item--inverse__text">Знижка %</div>
								</div>
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true">
									<input className={`form-control ${!isValidDiscount && 'invalid-input'}`}
										   value={this.state.discount}
										   onChange={this.onChangeDiscount}/>
									{!isValidDiscount && this.renderError('Поле може містити тільки цифри. 0-100 без знаку %')}
								</div>
							</div>
						}
						{
							this.state.subCategoryProps.length > 0 && <div className="container-add-new__props">
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true" border-left="true">
									<div className="container-add-new__props__item--inverse__text">Опис товару</div>
								</div>
								<div className="col-6 container-add-new__props__item--inverse" border-right="true"
									 border-bottom="true">
							<textarea className={`form-control ${!isValidDescription && 'invalid-input'}`}
									  value={this.state.description}
									  onChange={this.onChangeDescription}/>
									{!isValidDescription && this.renderError('Максимальна кількість символів 512')}
								</div>
							</div>
						}
						{
							this.state.subCategoryProps.length === 0 && <div className="error-if-empty-prod-props">
								Будь ласка додайте хоча б одну властивість для товару
							</div>
						}
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
						<h3 className="text-center">Оберіть головну фотографію</h3>
						<input type="file" onChange={this.onChangeMainFile} accept="image/*"/>
					</div>
					<div className="container-add-new__row__file-box">
						<h3 className="text-center">Оберіть фотографії</h3>
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
				</div> : <Spinner/>}
			</DocumentTitle>
		)
	}
}

export default AddNew;