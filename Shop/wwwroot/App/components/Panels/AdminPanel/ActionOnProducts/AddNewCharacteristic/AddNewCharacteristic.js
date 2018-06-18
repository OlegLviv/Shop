import React from 'react';
import './AddNewCharacteristic.scss';
import {getSubCategories, NAVIGATION_CATEGORIES, normalizeSubCategoryToRoute} from "../../../../../utils/productsUtils";
import {ADD_PROPERTY_URL, getProductPropsUrl} from "../../../../../services/urls/productUrls";
import {clearObjectProps} from "../../../../../utils/utils";
import {apiGet, apiPost} from "../../../../../services/api";
import {toUpperFirstCharInArray} from "../../../../../utils/utils";
import {SuccessSavedModal} from "./SuccessSavedModal";
import {Spinner} from "../../../../Spinner/Spinner";
import DocumentTitle from 'react-document-title';

const getNewCharacteristicBody = ({subCategory, newPossibleProps, newPropValue}) => ({
	propName: `${newPropValue[0].toUpperCase()}${newPropValue.slice(1)}`,
	subCategory: normalizeSubCategoryToRoute(subCategory),
	propValues: toUpperFirstCharInArray([...newPossibleProps])
});

//	todo need add validation
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
			isShowSuccessSavedModal: false,
			isLoading: false
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

	trySetLoading = () => !this.state.isLoading && this.setState({isLoading: true});

	updateSubCategoryState = () => {
		this.trySetLoading();

		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)), (err) => {
			if (err.response.data === 'Icorrect sub category or properties not found')
				this.setState({subCategoryProps: []});
			else alert(`Error: ${JSON.stringify(err.response)}`);
		})
			.then(resp => {
				console.log(resp.data);
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

	onChangeOptionCategory = (e) => this.setState({category: e.target.value});

	onChangeOptionSubCategory = (e) => this.setState({subCategory: e.target.value});

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
		const possibleProps = [...this.state.newPossibleProps, ''];
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

	//	todo need fix if many props and its empty
	onSaveClick = () => {
		if (!this.state.newPropValue)
			return;

		this.trySetLoading();

		console.log('body', getNewCharacteristicBody(this.state));
		apiPost(ADD_PROPERTY_URL, getNewCharacteristicBody(this.state))
			.then(resp => {
				if (resp ? resp.status === 200 : false) {
					this.updateSubCategoryState();
					this.setState({isShowSuccessSavedModal: true, isLoading: false});
				}
			})
			.catch(err => {
				this.setState({isLoading: false});
				alert(`Error: ${err}`);
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

	renderSuccessSavedModal = () => <SuccessSavedModal isOpen={this.state.isShowSuccessSavedModal}
													   onClose={this.onCloseSuccessSavedModal}/>;

	renderMainContent = () => {
		return (
			<div>
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
		)
	};

	render() {
		return (
			<DocumentTitle title="Додавання нових характеристик">
				<div className="ec-container">
					{this.renderSuccessSavedModal()}
					<div className="ec-container__header">
						Додати нові характеристики
					</div>
					{!this.state.isLoading ? this.renderMainContent() : <Spinner/>}
				</div>
			</DocumentTitle>
		);
	}
}

export default AddNewCharacteristic;