import React from 'react';
import './FullOrder.scss';
import {apiGet} from "../../../../../services/api";
import {getOrderUrl} from "../../../../../services/urls/orderUrls";
import {Spinner} from "../../../../Spinner/Spinner";
import {getProductsByIdsUrl} from "../../../../../services/urls/productUrls";
import {OrderStatus} from "../../../../common/OrderStatus/OrderStatus";

class FullOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: null,
			isLoading: true,
			isLoaded: false,
			productsContainer: []
		}
	}

	componentDidMount() {
		apiGet(getOrderUrl(this.getId()))
			.then(resp => {
				console.log(resp.data);
				this.updateProducts(resp.data.orders);
				this.setState({
					order: resp.data
				});
			});
	}

	updateProducts = (orders) => {
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
			});
	};

	getId = () => this.props.match.params['orderId'];

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
							<OrderStatus orderStatus={this.state.order.orderStatus}/>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	};

	render() {
		if (this.state.isLoaded && !this.state.isLoading)
			return (
				<div>
					{this.renderUserInfo()}
					{this.renderProductsInfo()}
					{this.renderOrderInfo()}
				</div>
			);
		return (<Spinner/>)
	}
}

export default FullOrder