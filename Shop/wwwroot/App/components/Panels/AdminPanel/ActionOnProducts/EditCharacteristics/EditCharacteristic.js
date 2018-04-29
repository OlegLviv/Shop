import React from 'react';
import './EditCharacteristic.scss';
import {getSubCategories, NAVIGATION_CATEGORIES, normalizeSubCategoryToRoute} from "../../../../../utils/productsUtils";
import {clearObjectProps} from "../../../../../utils/utils";
import {apiGet, apiPost} from "../../../../../services/api";
import {ADD_POSSIBLE_PROPERTY, getProductPropsUrl} from "../../../../../services/urls/productUrls";
import {Icon} from 'react-fa';
import {isValidPossibleProp} from "../../../../../utils/validationUtils";

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
			possiblePropsErrors: []
		}
	}

	componentDidMount() {
		this.updateSubCategoryState();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.subCategory !== this.state.subCategory) {
			this.updateSubCategoryState();
		}
	}

	validateNewPossiblePropsChange = (i, value, ifValid) => {
		if (!isValidPossibleProp(value)) {
			const isValidNewPossibleProps = {...this.state.isValidNewPossibleProps};
			const possiblePropsErrors = {...this.state.possiblePropsErrors};
			isValidNewPossibleProps[i] = false;
			possiblePropsErrors[i] = 'Поле може містити тільки букви';
			this.setState({
				isValidNewPossibleProps: isValidNewPossibleProps,
				possiblePropsErrors: possiblePropsErrors
			});
		}
		if (isValidPossibleProp(value) && !this.state.isValidNewPossibleProps[i]) {
			console.log('valid1', ifValid);
			const isValidNewPossibleProps = {...this.state.isValidNewPossibleProps};
			const possiblePropsErrors = {...this.state.possiblePropsErrors};
			isValidNewPossibleProps[i] = true;
			possiblePropsErrors[i] = '';
			this.setState({
				isValidNewPossibleProps: isValidNewPossibleProps,
				possiblePropsErrors: possiblePropsErrors
			});
		}
		if (isValidPossibleProp(value) && this.state.isValidNewPossibleProps[i]) {
			if (ifValid)
				ifValid();
		}
	};

	updateSubCategoryState = () => {
		apiGet(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)))
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

	//	todo need to add normal alert
	onSaveNewPossiblePropertyClick = (i, item) => {
		const possibleProp = this.state.newPossibleProps[i];
		const possiblePropUpper = `${possibleProp[0].toUpperCase()}${possibleProp.slice(1)}`;

		const body = {
			propName: item.propValue,
			subCategory: normalizeSubCategoryToRoute(this.state.subCategory),
			possibleProperty: possiblePropUpper
		};
		console.log('body', body);
		this.validateNewPossiblePropsChange(i, this.state.newPossibleProps[i], () => {
			console.log('work');
			apiPost(ADD_POSSIBLE_PROPERTY, body, err => {
				alert(`Error: ${err.response.data}`);
			})
				.then(resp => {
					if (resp.status === 200 && resp.data === 'Success') {
						alert('Дані збережено успішно');
						this.updateSubCategoryState();
					}
				});
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

	render() {
		return (
			<div className="ec-container">
				<div className="ec-container__header">
					Редактор харктеристик товару
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
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		)
	}
}

export default EditCharacteristic;