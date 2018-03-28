import React from 'react';
import './ExpandedNavigationProducts.scss';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Icon} from 'react-fa';

const maxPrice = 10000;
const minPrice = 0;

class ExpandedNavigationProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFrom: minPrice,
			priceTo: maxPrice,
			isPriceExpanded: true
		}
	}

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
				</div>
			</div>
		)
	}
}

export default ExpandedNavigationProducts;