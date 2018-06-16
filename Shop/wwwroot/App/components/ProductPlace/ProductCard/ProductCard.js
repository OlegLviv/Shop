import React from 'react';
import './ProductCard.scss';
import {Link} from 'react-router-dom';
import {getProductImageUrl} from "../../../services/urls/productUrls";

class ProductCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inProductCardTextBut: 'В кошик',
			loaded: false
		}
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.inProductCardTextBut !== nextState.inProductCardTextBut) {
			setTimeout(() => {
				this.setState({inProductCardTextBut: 'В кошик'})
			}, 1000);
		}
	}

	onProductCardButClick = (e) => {
		if (this.state.inProductCardTextBut !== 'Додано')
			this.setState({inProductCardTextBut: 'Додано'});

		if (this.state.inProductCardTextBut === 'Додано')
			return;

		this.props.onAddProduct(e, this.props.product.id);
	};

	onLikeButClick = e => {
		this.props.onLikeButClick(e, this.props.product.id);
	};

	onImgLoad = () => {
		this.setState({loaded: true});
	};

	render() {
		return (
			<div className="card card-dev">
				<img className="card-img-top"
					 style={{
						 display: `${!this.state.loaded ? 'none' : 'block'}`
					 }}
					 src={getProductImageUrl(this.props.product.id)}
					 alt="Card image cap"
					 onLoad={this.onImgLoad}
				/>
				{!this.state.loaded && <img className="card-img-top"
											src={require('../../../spinner.gif')}/>}
				<div className="card-dev__body">
					<Link to={`/product/${this.props.product.id}`} className="card-dev__body__link">
						<h5 className="text-center">{this.props.product.name}</h5>
					</Link>
					{this.props.product.discount > 0 &&
					<div className="card-dev__body__discount-box">{`-${this.props.product.discount}%`}</div>}
					<div
						className={`${this.props.product.discount > 0 ? 'card-dev__body__prices-box-if-discount' : 'card-dev__body__prices-box'}`}>
						<div
							className={`card-dev__body__prices-box__price ${this.props.product.discount > 0 ? 'card-dev__body__prices-box-if-discount__price-if-discount' : ''}`}>{`${this.props.product.price} грн`}</div>
						{this.props.product.discount > 0 && <h6>{`${this.props.product.priceWithDiscount} грн`}</h6>}
					</div>
					<div className="card-dev__footer">
						<button className="btn btn-dark"
								onClick={this.onProductCardButClick}>{this.state.inProductCardTextBut}</button>
						<button className="btn btn-info" onClick={this.onLikeButClick}>В обране</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductCard;