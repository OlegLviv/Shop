import React from 'react';
import './FullOrder.scss';
import {apiGet, apiPut} from "../../../../../services/api";
import {getChangeOrderStatusUrl, getOrderUrl} from "../../../../../services/urls/orderUrls";
import {Spinner} from "../../../../Spinner/Spinner";
import {getProductsByIdsUrl} from "../../../../../services/urls/productUrls";
import {OrderStatus} from "../../../../common/OrderStatus/OrderStatus";
import {SuccessOrderStatusChangedModal} from "./SuccessOrderStatusChangedModal";

class FullOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: null,
			isLoading: true,
			isLoaded: false,
			productsContainer: [],
			isOrderStatusExpanded: false,
			isShowSuccessOrderStatusChangedModal: false
		}
	}

	componentDidMount() {
		this.updateOrder();
	}

	updateProducts = orders => {
		apiGet(getProductsByIdsUrl(orders.map(order => order.productId)))
			.then(resp => {
				const productsContainer = [];
				orders.map((order, i) => productsContainer.push({
					product: resp.data[i],
					count: order.count
				}));
				console.log('products: ', productsContainer);
				this.setState({
					productsContainer: productsContainer,
					isLoaded: true,
					isLoading: false
				});
				if (this.state.isOrderStatusExpanded)
					this.setState({isOrderStatusExpanded: false});
			});
	};

	updateOrder = () => {
		this.setState({isLoading: true, isLoaded: false});
		apiGet(getOrderUrl(this.getId()))
			.then(resp => {
				this.updateProducts(resp.data.orders);
				this.setState({
					order: resp.data
				});
			});
	};

	getId = () => this.props.match.params['orderId'];

	onExpandOrderStatusClick = () => this.setState({isOrderStatusExpanded: true});

	onOrdersStatusChange = ({target}) => {
		const order = {...this.state.order};
		order.orderStatus = target.value;
		this.setState({order: order});
	};

	onSaveOrderStatus = () => {
		apiPut(getChangeOrderStatusUrl(this.state.order.id, this.state.order.orderStatus))
			.then(resp => {
				if (resp.status === 200) {
					this.updateOrder();
					this.setState({isShowSuccessOrderStatusChangedModal: true});
				}
			})
			.catch(err => alert(`Error: ${err}`));
	};

	onCloseSuccessOrderStatusChangedModal = () => this.setState({isShowSuccessOrderStatusChangedModal: false});

	renderUserInfo = () => {
		return (
			<div className="user-info-container">
				<div className="user-info-container__header">Інформація про користувача</div>
				<table>
					<tbody>
					<tr>
						<td>Ім'я прізвище</td>
						<td>{this.state.order.nameLastName}</td>
					</tr>
					<tr>
						<td>Телефон</td>
						<td>{this.state.order.phone}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{this.state.order.email}</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	};

	renderProductsInfo = () => {
		return (
			<div className="info-products-container">
				<div className="info-products-container__header">Інформація про товар</div>
				<table>
					<thead>
					<th>Назва товару</th>
					<th>Кількість</th>
					</thead>
					<tbody>
					{this.state.productsContainer.map(prodCont => {
						return (
							<tr>
								<td>{prodCont.product.name}</td>
								<td>{prodCont.count}</td>
							</tr>
						)
					})}
					</tbody>
				</table>
			</div>
		)
	};

	renderOrderInfo = () => {
		return (
			<div className="order-info-container">
				<div className="order-info-container__header">Інформація про замовлення</div>
				<table>
					<tbody>
					<tr>
						<td>Спосіб доставки</td>
						<td>{this.state.order.wayOfDelivery}</td>
					</tr>
					<tr>
						<td>Статус замовлення</td>
						<td>
							{!this.state.isOrderStatusExpanded &&
							<OrderStatus orderStatus={this.state.order.orderStatus}/>}
							{this.state.isOrderStatusExpanded &&
							<select onChange={this.onOrdersStatusChange} value={this.state.order.orderStatus}>
								<option value={0}>Нове</option>
								<option value={1}>Переглянуте</option>
								<option value={2}>Відіслано</option>
								<option value={3}>Очікує на отримання</option>
								<option value={4}>Закрито</option>
							</select>}
							<div className="order-status-nav-box">
								<button className="btn btn-info"
										onClick={this.onExpandOrderStatusClick}>Змінити
								</button>
								{this.state.isOrderStatusExpanded &&
								<button className="btn btn-primary" onClick={this.onSaveOrderStatus}>Зберегти</button>
								}
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	};

	renderSuccessOrderStatusChangedModal = () => <SuccessOrderStatusChangedModal
		isOpen={this.state.isShowSuccessOrderStatusChangedModal}
		onClose={this.onCloseSuccessOrderStatusChangedModal}/>

	render() {
		if (this.state.isLoaded && !this.state.isLoading)
			return (
				<div>
					{this.renderUserInfo()}
					{this.renderProductsInfo()}
					{this.renderOrderInfo()}
					{this.renderSuccessOrderStatusChangedModal()}
				</div>
			);
		return (<Spinner/>)
	}
}

export default FullOrder