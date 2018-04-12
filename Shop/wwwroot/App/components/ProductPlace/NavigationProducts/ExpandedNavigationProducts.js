import React from 'react';
import './ExpandedNavigationProducts.scss';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Icon} from 'react-fa';
import {priceRange} from "../../../utils/productsUtils";
import {apiWithoutRedirect} from "../../../services/api";
import {getProductPropsUrl} from "../../../services/urls/productUrls";

const {maxPrice} = priceRange;
const {minPrice} = priceRange;

class ExpandedNavigationProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFrom: minPrice,
			priceTo: maxPrice,
			isPriceExpanded: true,
			filters: []
		}
	}

	componentDidMount() {
		this.getFiltersByQuery();
	}

	renderExpandedNavMulty = (name, listSuggest) => {
		return (
			<div className="expanded-nav__body__filter-name">
				<div className="expanded-nav__body__filter-name__header">
					<Icon name="chevron-up mr-2 chevron"/>
					<h6>{name}</h6>
				</div>
				<div className="expanded-nav__body__filter-name__suggest-cont">
					{
						listSuggest.map(item => {
							return (
								<div className="expanded-nav__body__filter-name__suggest-cont__item">
									<div>{item}</div>
									<input type="checkbox" onChange={(e) => this.onChangeFilter(e, item)}/>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	};

	getFiltersByQuery = () => {
		if (!this.props.products || this.props.products.length === 0)
			return;
		apiWithoutRedirect()
			.get(getProductPropsUrl(this.props.products[0].subCategory))
			.then(resp => {
				console.log(resp.data);
				this.setState({filters: resp.data});
			})
			.catch(err => console.error(err.response.data));
	};

	onRangeChangeValue = (val) => {
		this.props.onPriceRangeChangeValue(val);
		this.setState({
			priceFrom: val[0],
			priceTo: val[1]
		});
	};

	onPriceToggle = () => {
		this.setState((prev) => ({isPriceExpanded: !prev.isPriceExpanded}));
	};

	onSearchByFilter = () => {
		this.props.onSearchByFilter(this.state.priceFrom, this.state.priceTo);
	};

	onChangeFilter = (e, item) => {
		if (e.target.value === true) {
			// todo need to add realization
		}
	};

	// todo need fix chevron expanded
	render() {
		const {isPriceExpanded} = this.state;
		return (
			<div className="expanded-nav">
				<div className="expanded-nav__header">Фільтр товарів</div>
				<div className="expanded-nav__body">
					<div className="expanded-nav__body__price">
						<div className="expanded-nav__body__price__header"
							 onClick={this.onPriceToggle}>
							<Icon name={`chevron-${isPriceExpanded ? 'up' : 'down'} mr-2 chevron`}/>
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
					{this.state.filters.map(item => this.renderExpandedNavMulty(item.propValue, item.possiblePropsValues))}
					<button className="btn btn-primary expanded-nav__body__search-but"
							onClick={this.onSearchByFilter}>Знайти
					</button>	
				</div>
			</div>
		)
	}
}

export default ExpandedNavigationProducts;