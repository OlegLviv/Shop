import React from 'react';
import './ExpandedNavigationProducts.scss';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const maxPrice = 10000;
const minPrice = 0;

class ExpandedNavigationProducts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			priceFrom: minPrice,
			priceTo: maxPrice
		}
	}

	onRangeChangeValue = (val) => {
		this.setState({
			priceFrom: val[0],
			priceTo: val[1]
		});
	};

	render() {
		return (
			<div className="expanded-nav">
				<div className="expanded-nav__header">Фільтр товарів</div>
				<div className="expanded-nav__body">
					<div className="expanded-nav__body__price">
						<h5>Ціна</h5>
						<div className="expanded-nav__body__price__from-to">
							<h6>Від</h6>
							<input className="form-control" value={this.state.priceFrom} disabled/>
							<h6>До</h6>
							<input className="form-control" value={this.state.priceTo} disabled/>
						</div>
						<div className="">
							<Range
								min={minPrice}
								max={maxPrice}
								defaultValue={[minPrice, maxPrice]}
								tipFormatter={value => `${value}грн`}
								onChange={this.onRangeChangeValue}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ExpandedNavigationProducts;