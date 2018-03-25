import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';
import {getCookie} from "../../services/cookies";
import {apiWithoutRedirect} from "../../services/api";
import {getProductsUrlByIds} from "../../services/urls/productUrls";
import {Link} from 'react-router-dom';

class ProductCardPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			productsCounts: []
		}
	}

	componentDidMount() {
		const productIds = getCookie('productsCard');
		apiWithoutRedirect()
			.get(getProductsUrlByIds(productIds))
			.then(resp => {
				console.log('got prods:', resp.data);
				this.setState({products: resp.data});
				this.initProductsCounts(resp.data);
			})
	}

	initProductsCounts = (products) => {
		const newProductsCounts = [];
		for (let i = 0; i < products.length; i++) {
			newProductsCounts[i] = 1;
		}
		this.setState({productsCounts: newProductsCounts});
	};

	getTotalPrice = () => {
		const {products, productsCounts} = this.state;
		let total = 1;
		for (let i = 0; i < products.length; i++) {
			total += products[i].description.price * productsCounts[i];
		}
		return total;
	};

	onIncProductsCount(i) {
		const productsCounts = this.state.productsCounts;
		productsCounts[i] = this.state.productsCounts[i] + 1;
		this.setState({productsCounts: productsCounts});
	}

	onDecProductsCount(i) {
		const productsCounts = this.state.productsCounts;
		if (this.state.productsCounts[i] === 0) {
			return;
		}
		productsCounts[i] = this.state.productsCounts[i] - 1;
		this.setState({productsCounts: productsCounts});
	}

	// todo need to carry out to <tr>
	render() {
		return (
			<div className="container-p-card-place">
				<div className="container-p-card-place__header">
					<button className="btn btn-outline-danger">Очистити кошик
						<Icon name="trash ml-1"/>
					</button>
					<h1 className="text-center">Кошик</h1>
				</div>
				<table className="table container-p-card-place__table">
					<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col"></th>
						<th scope="col">Ціна</th>
						<th scope="col">Кількість</th>
						<th scope="col">Вартість</th>
					</tr>
					</thead>
					<tbody>
					{
						this.state.products.map((item, i) => {
							return (
								<tr key={item.id}>
									<th>{i + 1}</th>
									<td>
										<div className="media">
											<img className="mr-5"
												 src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
											<div className="media-body">
												<h3>{item.description.name}</h3>
												<h6 className="my-3">Kod</h6>
											</div>
										</div>
									</td>
									<td>{item.description.price}</td>
									<td>
										<div className="btn-group">
											<button type="button" className="btn btn-secondary"
													onClick={() => this.onDecProductsCount(i)}>-
											</button>
											<input type="number" value={this.state.productsCounts[i]}/>
											<button type="button" className="btn btn-secondary"
													onClick={() => this.onIncProductsCount(i)}>+
											</button>
										</div>
									</td>
									<td>{item.description.price * this.state.productsCounts[i]}</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
				<div className="container-p-card-place__footer">
					<Link to="/" className="btn btn-outline-info container-p-card-place__footer__btn-continue">Продовжити
						покупки
					</Link>
					<div className="container-p-card-place__footer__total-info">
						<h3>{`Разом: ${this.getTotalPrice()} грн`}</h3>
						<button className="btn btn-primary">Оформити замовлення</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductCardPlace;