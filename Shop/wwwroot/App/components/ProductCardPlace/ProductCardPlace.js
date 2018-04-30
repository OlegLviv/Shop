import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';
import {getProductsCookies, setCookie} from "../../services/cookies";
import {apiWithoutRedirect} from "../../services/api";
import {getProductsByIdsUrl} from "../../services/urls/productUrls";
import {Link} from 'react-router-dom';
import './ProductCardTable.scss';
import {addObjectQueryToProducts} from "../../utils/productsUtils";
import {Spinner} from "../Spinner/Spinner";
import MakeOrderModal from '../Modal/MakeOrderModal/MakeOrderModal';
import {createOrders} from "../../utils/orderUtils";
import {CREATE_ORDER_URL} from "../../services/urls/orderUrls";

const renderNoProducts = () => {
	return (
		<div className="text-center">
			<h1>Кошик</h1>
			<h4>У вас немає товарів в кошику.</h4>
			<Link to="/" className="btn btn-primary btn-lg btn-shadow-s">Перейти до покупок</Link>
		</div>
	)
};

const getProductIds = productCArr => productCArr.map(item => item.id);
const getProductCounts = productCArr => productCArr.map(item => Number(item.count));

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

	initProductsCounts = products => {
		const productCArr = getProductsCookies('productsCard');
		let newProductsCounts = [];

		if (!productCArr || productCArr ? productCArr.length === 0 : false) {
			for (let i = 0; i < products.length; i++) {
				newProductsCounts[i] = 1;
			}
		}
		else
			newProductsCounts = getProductCounts(productCArr);
		this.setState({productsCounts: newProductsCounts});
	};

	componentDidMount() {
		const productCArr = getProductsCookies('productsCard');

		if (!productCArr || productCArr ? productCArr.length === 0 : false) {
			this.setState({isNotProducts: true});
			return;
		}
		if (this.state.isProductsLoaded) {
			this.setState({isProductsLoaded: false});
		}
		this.setState({isProductsLoading: true});
		apiWithoutRedirect()
			.get(getProductsByIdsUrl(getProductIds(productCArr)))
			.then(resp => {
				if (resp.data.length === 0) {
					setCookie('productsCard', null, 0);
					this.setState({
						products: [],
						isNotProducts: true,
						isProductsLoading: false,
						isProductsLoaded: true
					});
					return;
				}
				addObjectQueryToProducts(resp.data);
				this.initProductsCounts(resp.data);
				this.setState({
					products: resp.data,
					isProductsLoading: false,
					isProductsLoaded: true
				});
			});
	}

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

	//	todo maybe need validate this order because it hard object
	onSubmitOrder = orderObj => {
		const orders = createOrders(this.state.products.map(item => item.id), this.state.productsCounts);
		orderObj.orders = orders;
		orderObj.totalPrice = this.getTotalPrice();
		console.log(orderObj);
		apiWithoutRedirect()
			.post(CREATE_ORDER_URL, orderObj)
			.then(resp => {
				if (resp.status === 200 && resp.data === 'Success') {
					alert('Заказ успішно відправлено');
					this.onCloseMakeOrderModal();
				}
			})
			.catch(err => console.log(err.response.data));
	};

	// todo maybe need create page for this, not modal
	renderMakeOrderModal = () => <MakeOrderModal
		isModalOpen={this.state.isMakeOrderModalOpen}
		onCloseModal={this.onCloseMakeOrderModal}
		onSubmitOrder={this.onSubmitOrder}/>;

	renderSwitchContent = () => {
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
										<td data-label="Номер"><h5>{i + 1}</h5></td>
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