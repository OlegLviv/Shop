import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';
import {getCookie, setCookie} from "../../services/cookies";
import {apiWithoutRedirect} from "../../services/api";
import {getProductsUrlByIds} from "../../services/urls/productUrls";
import {Link} from 'react-router-dom';
import './ProductCardTable.scss';
import {addObjectQueryToProducts} from "../../utils/productsUtils";
import {Spinner} from "../Spinner/Spinner";
import MakeOrderModal from '../Modal/MakeOrderModal/MakeOrderModal';

const renderNoProducts = () => {
	return (
		<div className="text-center">
			<h1>Кошик</h1>
			<h4>У вас немає товарів в кошику.</h4>
			<Link to="/" className="btn btn-primary btn-lg btn-shadow-s">Перейти до покупок</Link>
		</div>
	)
};

class ProductCardPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			productsCounts: [],
			isProductsLoading: false,
			isProductsLoaded: false,
			isNotProducts: false,
			isMakeOrderModalOpen: false
		}
	}

	componentDidMount() {
		const productIds = getCookie('productsCard');
		if (!productIds) {
			this.setState({isNotProducts: true});
			return;
		}
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false});
		}
		this.setState({isProductsLoading: true});
		apiWithoutRedirect()
			.get(getProductsUrlByIds(productIds))
			.then(resp => {
				addObjectQueryToProducts(resp.data);
				this.initProductsCounts(resp.data);
				this.setState({
					products: resp.data,
					isProductsLoading: false,
					isProductsLoaded: true
				});
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
		let total = 0;
		for (let i = 0; i < products.length; i++) {
			total += products[i].price * productsCounts[i];
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

	onCleanProductsCard = () => {
		setCookie('productsCard', null, 0);
		this.setState({products: [], isNotProducts: true});
	};

	onMakeOrder = () => this.setState({isMakeOrderModalOpen: true});

	onCloseMakeOrderModal = () => this.setState({isMakeOrderModalOpen: false});

	// todo maybe need create page for this, not modal
	renderMakeOrderModal = () => <MakeOrderModal
		isModalOpen={this.state.isMakeOrderModalOpen}
		onCloseModal={this.onCloseMakeOrderModal}
	/>;

	renderSwitchContent = () => {
		console.log('switch');
		const {isProductsLoading, isProductsLoaded, isNotProducts} = this.state;
		if (isProductsLoaded && !isProductsLoading && !isNotProducts) {
			return (
				<div>
					<div className="container-p-card-place__header">
						<button className="btn btn-outline-danger" onClick={this.onCleanProductsCard}>Очистити кошик
							<Icon name="trash ml-1"/>
						</button>
						<h1 className="text-center">Кошик</h1>
					</div>
					<table>
						<thead>
						<tr>
							<th>#</th>
							<th>{''}</th>
							<th>Ціна</th>
							<th>Кількість</th>
							<th>Вартість</th>
						</tr>
						</thead>
						<tbody>
						{
							this.state.products.map((item, i) => {
								return (
									<tr>
										<td data-label="Номер">{i + 1}</td>
										<td data-label="Назва">
											<div className="media">
												<img className="mr-2 product-img"
													 src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
												<div className="media-body">
													<h5>{item.name}</h5>
													<div className="my-3">Kod</div>
												</div>
											</div>
										</td>
										<td data-label="Ціна"><h5>{item.price}</h5></td>
										<td data-label="Кількість">
											<div className="btn-group">
												<button type="button" className="btn btn-dark"
														onClick={() => this.onDecProductsCount(i)}>-
												</button>
												<input type="number" value={this.state.productsCounts[i]}/>
												<button type="button" className="btn btn-dark"
														onClick={() => this.onIncProductsCount(i)}>+
												</button>
											</div>
										</td>
										<td data-label="Вартість">
											<h5>{`${item.price * this.state.productsCounts[i]} грн`}</h5>
										</td>
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
							<button
								className="btn btn-primary btn-shadow-s btn container-p-card-place__footer__total-info__btn-post"
								onClick={this.onMakeOrder}>Оформити
								замовлення
							</button>
						</div>
					</div>
				</div>
			)
		}
		if (isProductsLoading && !isProductsLoaded) {
			return <Spinner/>
		}
		if (isNotProducts) {
			return renderNoProducts();
		}
	};

	render() {
		return (
			<div className="container-p-card-place">
				{this.renderSwitchContent()}
				{this.renderMakeOrderModal()}
			</div>
		);
	}
}

export default ProductCardPlace;