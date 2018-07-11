import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';
import {getProductsOutOfCookies, setCookie} from "../../services/cookies";
import {apiWithoutRedirect} from "../../services/api";
import {getProductImageUrl, getProductsByIdsUrl} from "../../services/urls/productUrls";
import {Link} from 'react-router-dom';
import './ProductCardTable.scss';
import {addObjectQueryToProducts} from "../../utils/productsUtils";
import {Spinner} from "../Spinner/Spinner";
import MakeOrderModal from '../Modal/MakeOrderModal/MakeOrderModal';
import {createProductsContainerForOrders} from "../../utils/orderUtils";
import {CREATE_ORDER_URL, CREATE_USER_ORDER_URL} from "../../services/urls/orderUrls";
import {SuccessReceivedOrderModal} from "./SuccessReceivedOrderModal";
import {connect} from 'react-redux';
import DocumentTitle from 'react-document-title';

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
			isMakeOrderModalOpen: false,
			loading: false,
			canSuccessReceivedOrderModal: false,
			loadedImg: false
		}
	}

	componentDidMount() {
		const productCArr = getProductsOutOfCookies('productsCard');

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

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	initProductsCounts = products => {
		const productCArr = getProductsOutOfCookies('productsCard');
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

	getCost = (i, price) => +(price * this.state.productsCounts[i]).toFixed(1);

	getTotalPrice = () => {
		const {products, productsCounts} = this.state;
		let total = 0;
		for (let i = 0; i < products.length; i++) {
			total += (products[i].priceWithDiscount > 0 ? products[i].priceWithDiscount : products[i].price) * productsCounts[i];
		}
		return +total.toFixed(1);
	};

	onIncProductsCount(i) {
		const productsCounts = [...this.state.productsCounts];
		productsCounts[i] = this.state.productsCounts[i] + 1;
		this.setState({productsCounts: productsCounts});
	}

	onDecProductsCount(i) {
		const productsCounts = [...this.state.productsCounts];
		if (this.state.productsCounts[i] === 0) {
			return;
		}
		productsCounts[i] = this.state.productsCounts[i] - 1;
		this.setState({productsCounts: productsCounts});
	}

	onCleanProductsCard = () => {
		setCookie('productsCard', null, 0);
		this.setState({
			products: [],
			isNotProducts: true,
			productsCounts: []
		});
		this.props.onCleanProducts();
	};

	onMakeOrder = () => this.setState({isMakeOrderModalOpen: true});

	onCloseMakeOrderModal = () => this.setState({isMakeOrderModalOpen: false});

	//	todo maybe need validate this order because it hard object
	onSubmitOrder = orderObj => {
		const productsContainers = createProductsContainerForOrders(this.state.products.map(item => item.id), this.state.productsCounts);
		orderObj.productsContainers = productsContainers;
		console.log(orderObj);

		this.trySetLoading();

		apiWithoutRedirect()
			.post(this.props.isLogIn ? CREATE_USER_ORDER_URL : CREATE_ORDER_URL, orderObj)
			.then(resp => {
				if (resp.status === 200 && resp.data === 'Success') {
					this.onCleanProductsCard();
					this.onCloseMakeOrderModal();
					this.setState({loading: false, canSuccessReceivedOrderModal: true});
					this.props.onCleanProducts();
				}
			})
			.catch(err => {
				alert(`Error: ${JSON.stringify(err.response.data)}`);
				this.setState({loading: false});
			});
	};

	onImgLoad = () => {
		this.setState({loadedImg: true});
	};

	renderMakeOrderModal = () => <MakeOrderModal
		isModalOpen={this.state.isMakeOrderModalOpen}
		onCloseModal={this.onCloseMakeOrderModal}
		onSubmitOrder={this.onSubmitOrder}
		loading={this.state.loading}
		user={this.props.user}/>;

	renderSuccessReceivedOrderModal = () => <SuccessReceivedOrderModal isOpen={this.state.canSuccessReceivedOrderModal}
																	   onClose={() => this.setState({canSuccessReceivedOrderModal: false})}/>;

	renderSwitchContent = () => {
		const {isProductsLoading, isProductsLoaded, isNotProducts} = this.state;
		if (isProductsLoaded && !isProductsLoading && !isNotProducts) {
			return (
				<div>
					<button className="btn btn-outline-danger" onClick={this.onCleanProductsCard}>Очистити кошик
						<Icon name="trash ml-1"/>
					</button>
					<div className="container-p-card-place__header">
						<h1 className="text-center container-p-card-place__header__main-text">
							<div>Кошик</div>
						</h1>
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
												<img className="mr-2 ml-2 product-img"
													 style={{
														 display: `${!this.state.loadedImg ? 'none' : 'block'}`
													 }}
													 src={getProductImageUrl(item.id)}
													 alt="Card image cap"
													 onLoad={this.onImgLoad}
												/>
												{!this.state.loadedImg && <img className="mr-2 product-img"
																			   src={require('../../spinner.gif')}/>}
												<div className="media-body">
													<h5>
														<Link className="product-name"
															  to={`/product/${item.id}`}>
															{item.name}
														</Link>
													</h5>
													<small className="my-3">{`Код: ${item.id}`}</small>
												</div>
											</div>
										</td>
										<td data-label="Ціна">
											<h5>{item.priceWithDiscount > 0 ? item.priceWithDiscount : item.price}</h5>
										</td>
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
											<h5>{`${this.getCost(i, item.priceWithDiscount > 0 ? item.priceWithDiscount : item.price)} грн`}</h5>
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
			<DocumentTitle title="Кошик">
				<div className="container-p-card-place">
					{this.renderSuccessReceivedOrderModal()}
					{this.renderSwitchContent()}
					{this.renderMakeOrderModal()}
				</div>
			</DocumentTitle>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onCleanProducts: () => dispatch({type: 'CLEAN'})
	})
)(ProductCardPlace);