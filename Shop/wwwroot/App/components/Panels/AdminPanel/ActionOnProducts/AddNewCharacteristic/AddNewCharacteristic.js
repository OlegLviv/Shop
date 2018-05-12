import React from 'react';
import './AddNewCharacteristic.scss';
import {getSubCategories, NAVIGATION_CATEGORIES, normalizeSubCategoryToRoute} from "../../../../../utils/productsUtils";
import {ADD_PROPERTY_URL, getProductPropsUrl} from "../../../../../services/urls/productUrls";
import {clearObjectProps} from "../../../../../utils/utils";
import {apiGet, apiPost} from "../../../../../services/api";
import {toUpperFirstCharInArray} from "../../../../../utils/utils";
import {SuccessSavedModal} from "./SuccessSavedModal";

class AddNewCharacteristic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: NAVIGATION_CATEGORIES[1],
			subCategory: getSubCategories(NAVIGATION_CATEGORIES[1])[0],
			product: {},
			subCategoryProps: [],
			newPossibleProps: [''],
			newPropValue: '',
			isShowSuccessSavedModal: false
		}
	}

	componentDidMount() {
		console.log(this.state.subCategory);
		this.updateSubCategoryState();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.subCategory !== this.state.subCategory)
			this.updateSubCategoryState();

		if (prevState.category !== this.state.category) {
			this.onChangeOptionSubCategory({
				target: {
					value: getSubCategories(this.state.category)[0]
				}
			})
		}
	}

	updateSubCategoryState = () => {
		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)), () => this.setState({subCategoryProps: []}))
			.then(resp => {
				console.log(resp.data);
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

	onNewPropValueChange = ({target}) => {
		this.setState({newPropValue: target.value});
	};

	onChangePossibleProps = ({target}, i) => {
		const newPossibleProps = [...this.state.newPossibleProps];
		newPossibleProps[i] = target.value;
		this.setState({newPossibleProps: newPossibleProps});
	};

	onAddNewPossiblePropClick = () => {
		const possibleProps = [...this.state.newPossibleProps];
		possibleProps.push('');
		this.setState({newPossibleProps: possibleProps});
	};

	onDeleteNewPossiblePropsClick = i => {
		if (i === 0)
			return;

		const newPossibleProps = [...this.state.newPossibleProps];
		newPossibleProps.splice(i, i);
		this.setState({newPossibleProps: newPossibleProps});
	};

	onCloseSuccessSavedModal = () => this.setState({isShowSuccessSavedModal: false});

	//	todo need normal catch
	onSaveClick = () => {
		let propName = this.state.newPropValue;

		if (!propName)
			return;

		propName = `${propName[0].toUpperCase()}${propName.slice(1)}`;
		const newPossibleProps = [...this.state.newPossibleProps];

		const body = {
			propName: propName,
			subCategory: normalizeSubCategoryToRoute(this.state.subCategory),
			propValues: toUpperFirstCharInArray(newPossibleProps)
		};
		console.log('body', body);
		apiPost(ADD_PROPERTY_URL, body)
			.then(resp => {
				if (resp ? resp.status === 200 : false) {
					this.updateSubCategoryState();
					this.setState({isShowSuccessSavedModal: true});
				}
			});
	};

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

	renderSuccesSavedModal = () => <SuccessSavedModal isOpen={this.state.isShowSuccessSavedModal}
													  onClose={this.onCloseSuccessSavedModal}/>;

	render() {
		return (
			<div className="ec-container">
				{this.renderSuccesSavedModal()}
				<div className="ec-container__header">
					Додати нові характеристики
				</div>
				{this.renderChooseCatSubCat()}
				<table className="ec-container__table">
					<thead className="ec-container__table__thead">
					<tr className="ec-container__table__tbody__tr">
						<th>Назва властивості</th>
						<th>Значення властивості</th>
					</tr>
					</thead>
					<tbody className="ec-container__table__tbody">
					{
						this.state.subCategoryProps.map(item => {
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
									</td>
								</tr>
							)
						})
					}
					<tr className="ec-container__table__tbody__tr">
						<td className="ec-container__table__tbody__tr__td" is-prop-td="true">
							<input type="text" className="form-control"
								   placeholder="Введіть назву нової властивості"
								   value={this.state.newPropValue}
								   onChange={this.onNewPropValueChange}/>
						</td>
						<td className="ec-container__table__tbody__tr__td">
							{this.state.newPossibleProps.map((item, i) =>
								<div className="input-group mb-1">
									<input className="form-control"
										   value={this.state.newPossibleProps[i]}
										   type="text"
										   placeholder="Введіть значення властивості"
										   onChange={(e) => this.onChangePossibleProps(e, i)}/>
									<div className="input-group-append">
										<button className="btn btn-outline-danger"
												type="button"
												onClick={() => this.onDeleteNewPossiblePropsClick(i)}
												disabled={i === 0}>Видалити
										</button>
									</div>
								</div>)}
							<div className="ec-container__table__tbody__tr__td__input-group">
								<button className="btn btn-primary" onClick={this.onAddNewPossiblePropClick}>Додати
								</button>
								<button className="btn btn-info" onClick={this.onSaveClick}>Зберегти</button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default AddNewCharacteristic;