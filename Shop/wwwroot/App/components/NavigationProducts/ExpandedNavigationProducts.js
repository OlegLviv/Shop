import React from 'react';
import './ExpandedNavigationProducts.scss';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Icon} from 'react-fa';
import {objectToArrayKeys} from "../../utils/utils";

const maxPrice = 10000;
const minPrice = 0;

const getProductArrayQueryWithMaxProps = (products) => {
	let maxObjArr = objectToArrayKeys(products[0].objectQuery);
	let max = maxObjArr.length;
	for (let i in products) {
		if (objectToArrayKeys(products[i].objectQuery).length > max) {
			maxObjArr = objectToArrayKeys(products[i].objectQuery);
			max = maxObjArr.length;
		}
	}
	return maxObjArr;
};

class ExpandedNavigationProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFrom: minPrice,
			priceTo: maxPrice,
			isPriceExpanded: true
		}
	}

	componentDidMount() {
		console.log('products: ', this.props.products);
	}

	renderFilterByQuery = () => {
		const {products} = this.props;
		if (products.length === 0)
			return;
		const arrayQueryWithMaxProps = getProductArrayQueryWithMaxProps(products);
		console.log(arrayQueryWithMaxProps);
		return arrayQueryWithMaxProps.map(item => {
			return (
				<div>
					<span>{item}</span>
					<input type="checkbox"/>
				</div>
			)
		});
	};

	onRangeChangeValue = (val) => {
		this.setState({
			priceFrom: val[0],
			priceTo: val[1]
		});
	};

	onPriceToggle = () => {
		this.setState((prev) => ({isPriceExpanded: !prev.isPriceExpanded}));
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
							{
								isPriceExpanded ? <Icon name="chevron-up mr-2 chevron"/> :
									<Icon name="chevron-down mr-2 chevron"/>
							}
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
								tipFormatter={value => `${value}грн`}
								onChange={this.onRangeChangeValue}/>
						</div>}
					</div>
					{this.renderFilterByQuery()}
				</div>
			</div>
		)
	}
}

export default ExpandedNavigationProducts;