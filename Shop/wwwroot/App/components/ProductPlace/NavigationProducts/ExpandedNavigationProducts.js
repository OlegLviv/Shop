import React from 'react';
import './ExpandedNavigationProducts.scss';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Icon} from 'react-fa';
import {priceRange} from "../../../utils/productsUtils";
import {apiWithoutRedirect} from "../../../services/api";
import {getProductPropsUrl} from "../../../services/urls/productUrls";
import {formateQueryDictionary, formateQueryDictionaryWithRemove} from "../../../utils/productsUtils";
import {Chevron} from "../../common/Chevron/Chevron";
import {Spinner} from "../../Spinner/Spinner";

const {maxPrice} = priceRange;
const {minPrice} = priceRange;

class ExpandedNavigationProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFrom: minPrice,
			priceTo: maxPrice,
			isPriceExpanded: true,
			isFilterPropsExpanded: [],
			filters: [],
			loading: false
		}
	}

	componentDidMount() {
		this.getFiltersByQuery();
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	getFiltersByQuery = () => {
		if (!this.props.products || this.props.products.length === 0)
			return;

		this.trySetLoading();

		apiWithoutRedirect()
			.get(getProductPropsUrl(this.props.products[0].subCategory))
			.then(resp => {
				console.log(resp.data);
				this.setState({
					filters: resp.data,
					loading: false
				});
			})
			.catch(err => {
				this.setState({loading: false});
				alert(`Error: ${JSON.stringify(err.response.data)}`);
			});
	};

	onBackClick = () => this.props.onBackClick();

	onRangeChangeValue = (val) => {
		this.props.onPriceRangeChangeValue(val);
		this.setState({
			priceFrom: val[0],
			priceTo: val[1]
		});
	};

	onPriceToggle = () => this.setState(prev => ({isPriceExpanded: !prev.isPriceExpanded}));

	onFilterPropToggle = i => {
		const newValues = this.state.isFilterPropsExpanded;
		newValues[i] = !this.state.isFilterPropsExpanded[i];
		this.setState({isFilterPropsExpanded: newValues});
	};

	onSearchByFilter = () => {
		if (!this.queryDictionary)
			this.queryDictionary = {};

		this.props.onSearchByFilter(this.state.priceFrom, this.state.priceTo, this.queryDictionary);
	};

	onChangeFilter = (e, name, item) => {
		if (e.target.checked === true) {
			this.queryDictionary = formateQueryDictionary(name, item, this.queryDictionary);
		}
		if (e.target.checked === false) {
			this.queryDictionary = formateQueryDictionaryWithRemove(name, item, this.queryDictionary);
		}
	};

	renderExpandedNavMulty = (name, listSuggest, i) => {
		const {isFilterPropsExpanded} = this.state;

		return (
			<div className="expanded-nav__body__filter-name">
				<div className="expanded-nav__body__filter-name__header" onClick={() => this.onFilterPropToggle(i)}>
					<Chevron className="mr-2" name={isFilterPropsExpanded[i] ? 'up' : 'down'}/>
					<h6>{name}</h6>
				</div>
				{
					isFilterPropsExpanded[i] && <div className="expanded-nav__body__filter-name__suggest-cont">
						{
							listSuggest.map(item => {
								return (
									<div className="expanded-nav__body__filter-name__suggest-cont__item">
										<div>{item}</div>
										<input type="checkbox" onChange={(e) => this.onChangeFilter(e, name, item)}/>
									</div>
								)
							})
						}
					</div>
				}
			</div>
		)
	};

	// todo need fix chevron expanded
	render() {
		const {isPriceExpanded, loading} = this.state;
		return (
			<div className="expanded-nav">
				<div className="expanded-nav__header">
					<div onClick={this.onBackClick}>
						<Icon name="chevron-left" className="expanded-nav__header__chevron"/>
					</div>
					<div>Фільтр товарів</div>
				</div>
				<div className="expanded-nav__body">
					<div className="expanded-nav__body__price">
						<div className="expanded-nav__body__price__header"
							 onClick={this.onPriceToggle}>
							<Chevron className="mr-2" name={isPriceExpanded ? 'up' : 'down'}/>
							<h6>Ціна</h6>
						</div>
						{isPriceExpanded && <div>
							<div className="expanded-nav__body__price__from-to">
								<h6>Від</h6>
								<input className="form-control" value={this.state.priceFrom} disabled/>
								<h6>До</h6>
								<input className="form-control" value={this.state.priceTo} disabled/>
							</div>
							<Range
								min={minPrice}
								max={maxPrice}
								defaultValue={[minPrice, maxPrice]}
								tipFormatter={value => `${value} грн`}
								onChange={this.onRangeChangeValue}/>
						</div>}
					</div>
					{
						!loading ? <div>
							{this.state.filters.map((item, i) => this.renderExpandedNavMulty(item.propValue, item.possiblePropsValues, i))}
						</div> : <Spinner/>
					}
					<button className="btn btn-primary expanded-nav__body__search-but"
							onClick={this.onSearchByFilter}>Знайти
					</button>
				</div>
			</div>
		)
	}
}

export default ExpandedNavigationProducts;