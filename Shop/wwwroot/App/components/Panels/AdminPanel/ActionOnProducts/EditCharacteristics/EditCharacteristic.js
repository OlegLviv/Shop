import React from 'react';
import './EditCharacteristic.scss';
import {getSubCategories, NAVIGATION_CATEGORIES, normalizeSubCategoryToRoute} from "../../../../../utils/productsUtils";
import {clearObjectProps, toUpperFirstChar} from "../../../../../utils/utils";
import {apiDelete, apiGet, apiPost} from "../../../../../services/api";
import {
	ADD_POSSIBLE_PROPERTY_URL,
	getProductPropsUrl,
	getDeleteProductPropertyUrl
} from "../../../../../services/urls/productUrls";
import {Icon} from 'react-fa';
import {isValidPossibleProp} from "../../../../../utils/validationUtils";
import {Link} from 'react-router-dom';
import {SuccessAddedNewCharacteristicModal} from "./SuccessAddedNewCharacteristicModal";
import {SuccessDeletedCharacteristicModal} from "./SuccessDeletedCharacteristicModal";

class EditCharacteristic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: NAVIGATION_CATEGORIES[1],
			subCategory: getSubCategories(NAVIGATION_CATEGORIES[1])[0],
			product: {},
			subCategoryProps: [],
			isRenderAddPPField: [],
			newPossibleProps: [],
			isValidNewPossibleProps: [],
			possiblePropsErrors: [],
			isShowSuccessAddedNewCharacteristicModal: false,
			isShowSuccessDeletedCharacteristicModal: false
		}
	}

	componentDidMount() {
		this.updateSubCategoryState();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.subCategory !== this.state.subCategory)
			this.updateSubCategoryState();

		if (this.state.category !== prevState.category) {
			this.onChangeOptionSubCategory({
				target: {
					value: getSubCategories(this.state.category)[0]
				}
			})
		}
	}

	validateNewPossiblePropsChange = (i, value, ifValid) => {
		if (!isValidPossibleProp(value)) {
			const isValidNewPossibleProps = {...this.state.isValidNewPossibleProps};
			const possiblePropsErrors = {...this.state.possiblePropsErrors};
			isValidNewPossibleProps[i] = false;
			possiblePropsErrors[i] = 'Поле може містити тільки букви і цифри. Мінімальна довжина 2, максимальна 20';
			this.setState({
				isValidNewPossibleProps: isValidNewPossibleProps,
				possiblePropsErrors: possiblePropsErrors
			});
			return;
		}
		if (isValidPossibleProp(value) && !this.state.isValidNewPossibleProps[i]) {
			const isValidNewPossibleProps = {...this.state.isValidNewPossibleProps};
			const possiblePropsErrors = {...this.state.possiblePropsErrors};
			isValidNewPossibleProps[i] = true;
			possiblePropsErrors[i] = '';
			this.setState({
				isValidNewPossibleProps: isValidNewPossibleProps,
				possiblePropsErrors: possiblePropsErrors
			});
			return;
		}
		if (isValidPossibleProp(value) && this.state.isValidNewPossibleProps[i]) {
			if (ifValid)
				ifValid();
		}
	};

	updateSubCategoryState = () => {
		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)), () => {
			this.setState({subCategoryProps: []})
		})
			.then(resp => {
				const product = {...this.state.product};
				clearObjectProps(product);
				for (let i in resp.data) {
					product[resp.data[i].propValue] = resp.data[i].possiblePropsValues[0];
				}
				console.log('prod', product);
				this.setState({
					subCategoryProps: resp.data,
					product: product
				});
			});
	};

	onChangeOptionCategory = (e) => {
		this.setState({category: e.target.value})
	};

	onChangeOptionSubCategory = (e) => {
		this.setState({subCategory: e.target.value})
	};

	onChangePropsValue = (propName, {target}) => {
		const product = {...this.state.product};
		product[propName] = target.value;
		console.log(product);
		this.setState({product: product});
	};

	onNewPossiblePropsChange = (i, {target}) => {
		this.validateNewPossiblePropsChange(i, target.value);

		const newPossibleProps = {...this.state.newPossibleProps};
		newPossibleProps[i] = target.value;
		this.setState({newPossibleProps: newPossibleProps});
	};

	onAddNewPossiblePropertyClick = i => {
		const isRenderAddPPField = {...this.state.isRenderAddPPField};
		this.setState(prev => {
			isRenderAddPPField[i] = !prev.isRenderAddPPField[i];
			return {isRenderAddPPField: isRenderAddPPField};
		});
	};

	onSaveNewPossiblePropertyClick = (i, item) => {
		const possibleProp = this.state.newPossibleProps[i];

		const body = {
			propName: item.propValue,
			subCategory: normalizeSubCategoryToRoute(this.state.subCategory),
			possibleProperty: toUpperFirstChar(possibleProp)
		};
		console.log('body', body);
		this.validateNewPossiblePropsChange(i, this.state.newPossibleProps[i], () => {
			console.log('work');
			apiPost(ADD_POSSIBLE_PROPERTY_URL, body)
				.then(resp => {
					if (resp.status === 200 && resp.data === 'Success') {
						this.setState({isShowSuccessAddedNewCharacteristicModal: true});
						this.updateSubCategoryState();
					}
				})
				.catch(err => alert(`Error: ${JSON.stringify(err.response.data)}`))
		});
	};

	onDeleteProperty = propName => {
		apiDelete(getDeleteProductPropertyUrl(normalizeSubCategoryToRoute(this.state.subCategory),
			propName))
			.then(resp => {
				if (resp.status === 200 && resp.data === 'Success') {
					this.setState({isShowSuccessDeletedCharacteristicModal: true});
					this.updateSubCategoryState();
				}
			})
			.catch(err => alert(`Error: ${JSON.stringify(err.response.data)}`))
	};

	onCloseSuccessAddedNewCharacteristicModal = () => this.setState({isShowSuccessAddedNewCharacteristicModal: false});

	onCloseSuccessDeletedCharacteristicModal = () => this.setState({isShowSuccessDeletedCharacteristicModal: false});

	renderChooseCatSubCat = () => {
		return (
			<table className="ec-container__table">
				<thead className="ec-container__table__thead">
				<tr>
					<th>Оберіть кареторію</th>
					<th>Оберіть підкареторію</th>
				</tr>
				</thead>
				<tbody className="ec-container__table__tbody">
				<tr className="ec-container__table__tbody__tr">
					<td className="ec-container__table__tbody__tr__td">
						<select onChange={this.onChangeOptionCategory} defaultValue={this.state.category}>
							{
								NAVIGATION_CATEGORIES.map(item => <option
									value={item}>{item}
								</option>)
							}
						</select>
					</td>
					<td className="ec-container__table__tbody__tr__td">
						<select onChange={this.onChangeOptionSubCategory} value={this.state.subCategory}>
							{
								getSubCategories(this.state.category).map(item => <option>{item}</option>)
							}
						</select>
					</td>
				</tr>
				</tbody>
			</table>
		)
	};

	renderAddNewPPIcon = i => {
		const isRenderAddPPField = this.state.isRenderAddPPField[i];
		return (
			<div>
				<div className={isRenderAddPPField ? 'hidden' : ''}>
					<Icon name="plus"/>
				</div>
				<div className={isRenderAddPPField ? '' : 'hidden'}>
					<Icon name="minus"/>
				</div>
			</div>
		)
	};

	renderError = text => <small className="invalid-small">{text}</small>;

	renderSuccessAddedNewCharacteristic = () => <SuccessAddedNewCharacteristicModal
		isOpen={this.state.isShowSuccessAddedNewCharacteristicModal}
		onClose={this.onCloseSuccessAddedNewCharacteristicModal}/>;

	renderSuccessDeletedCharacteristic = () => <SuccessDeletedCharacteristicModal
		isOpen={this.state.isShowSuccessDeletedCharacteristicModal}
		onClose={this.onCloseSuccessDeletedCharacteristicModal}/>;

	render() {
		return (
			<div className="ec-container">
				{this.renderSuccessAddedNewCharacteristic()}
				{this.renderSuccessDeletedCharacteristic()}
				<div className="ec-container__header">
					Редактор харктеристик товару
				</div>
				{this.renderChooseCatSubCat()}
				<table className="ec-container__table">
					<thead className="ec-container__table__thead">
					<tr className="ec-container__table__tbody__tr">
						<th>Назва властивості</th>
						<th>Значення властивості</th>
						<th/>
					</tr>
					</thead>
					<tbody className="ec-container__table__tbody">
					{
						this.state.subCategoryProps.map((item, i) => {
							return (
								<tr className="ec-container__table__tbody__tr">
									<td className="ec-container__table__tbody__tr__td">{item.propValue}</td>
									<td className="ec-container__table__tbody__tr__td">
										<select onChange={(e) => this.onChangePropsValue(item.propValue, e)}>
											{
												item.possiblePropsValues.map(itemPP =>
													<option>{itemPP}</option>)
											}
										</select>
										{this.state.isRenderAddPPField[i] &&
										<input
											className={`form-control my-1 ${this.state.isValidNewPossibleProps[i] === false && 'invalid-input'}`}
											type="text"
											value={this.state.newPossibleProps[i]}
											placeholder="Введіть значення властивості"
											onChange={(e) => this.onNewPossiblePropsChange(i, e)}/>}
										{this.state.isValidNewPossibleProps[i] === false && this.renderError(this.state.possiblePropsErrors[i])}
										<br/>
										<div className="ec-container__table__tbody__tr__td__btn-group">
											<button className="btn btn-primary"
													onClick={() => this.onAddNewPossiblePropertyClick(i)}>
												{this.renderAddNewPPIcon(i)}
											</button>
											{this.state.newPossibleProps[i] ?
												(this.state.newPossibleProps[i].length > 0 && this.state.isRenderAddPPField[i]) &&
												<button className="btn btn-info"
														onClick={() => this.onSaveNewPossiblePropertyClick(i, item)}>
													Зберегти
												</button> : null}
										</div>
									</td>
									<td>
										<button className="btn btn-danger"
												onClick={() => this.onDeleteProperty(item.propValue)}>Видалити
											Властивість
										</button>
									</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
				{!this.state.subCategoryProps.length &&
				<div className="text-center my-3">Властивостей для даного товару не знайдено. Ви може створити їх
					<Link to="/adminPanel/action-on-products/add-new-characteristic">{' тут'}</Link></div>}
			</div>
		)
	}
}

export default EditCharacteristic;