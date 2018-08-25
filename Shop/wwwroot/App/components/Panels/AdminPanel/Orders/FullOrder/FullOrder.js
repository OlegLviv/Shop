import React from 'react';
import './FullOrder.scss';
import {apiPut, apiGet} from "../../../../../services/api";
import {getChangeOrderStatusUrl, getOrderUrl} from "../../../../../services/urls/orderUrls";
import {Spinner} from "../../../../Spinner/Spinner";
import {OrderStatus} from "../../../../common/OrderStatus/OrderStatus";
import {SuccessOrderStatusChangedModal} from "./SuccessOrderStatusChangedModal";
import DocumentTitle from 'react-document-title';
import {Icon} from 'react-fa';
import {Link} from 'react-router-dom';

class FullOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			productsContainer: [],
			isOrderStatusExpanded: false,
			isShowSuccessOrderStatusChangedModal: false,
			orderStatus: 0,
			order: {}
		}
	}

	componentDidMount() {
		this.trySetLoading();
		apiGet(getOrderUrl(this.props.match.params.orderId))
			.then(resp => this.setState({order: resp.data, isLoading: false}))
			.catch(() => {
				this.setState({isLoading: false});
				alert(`Error`);
			});
	}

	trySetLoading = () => !this.state.isLoading && this.setState({isLoading: true});

	onExpandOrderStatusClick = () => this.setState({isOrderStatusExpanded: true});

	onCloseOrderStatusClick = () => this.setState({isOrderStatusExpanded: false});

	onOrdersStatusChange = ({target}) => this.setState({orderStatus: target.value});

	onSaveOrderStatus = () => {
		this.trySetLoading();

		if (this.state.order && this.state.order.orderStatus === this.state.orderStatus)
			return;

		apiPut(getChangeOrderStatusUrl(this.state.order.id, this.state.orderStatus))
			.then(resp => {
				if (resp.status === 200) {
					this.setState({
						isShowSuccessOrderStatusChangedModal: true,
						isLoading: false,
						isOrderStatusExpanded: false,
						order: resp.data
					});
				}
			})
			.catch(() => {
				alert(`Error`);
				this.setState({isLoading: false});
			});
	};

	onCloseSuccessOrderStatusChangedModal = () => this.setState({isShowSuccessOrderStatusChangedModal: false});

	renderUserInfo = () => {
		const {order} = this.state;
		if (!this.state.isLoading && order)
			return (
				<div className="user-info-container">
					<div className="user-info-container__header">
						<div>Інформація про користувача</div>
						<button className="btn btn-dark user-info-container__header__print-btn"
								onClick={window.print}>
							Друкувати
							<Icon name="print" className="ml-1"/>
						</button>
					</div>
					<table>
						<tbody>
						<tr>
							<td>Ім'я</td>
							<td>{this.state.order.name}</td>
						</tr>
						<tr>
							<td>Прізвище</td>
							<td>{this.state.order.lastName}</td>
						</tr>
						<tr>
							<td>Телефон</td>
							<td>{this.state.order.phoneNumber}</td>
						</tr>
						<tr>
							<td>Email</td>
							<td>{this.state.order.email}</td>
						</tr>
						</tbody>
					</table>
				</div>
			);
		if (this.state.isLoading)
			return <Spinner/>
	};

	renderProductsInfo = () => {
		if (!this.state.isLoading && this.state.order)
			return (
				<div className="info-products-container">
					<div className="info-products-container__header">Інформація про товар</div>
					<table>
						<thead>
						<th>Назва товару</th>
						<th>Кількість</th>
						<th>Ціна</th>
						<th>Ціна зі знижкою</th>
						</thead>
						<tbody>
						{this.state.order.productsContainers.map(prodCont => (
								<tr>
									<td>
										<Link to={`/product/${prodCont.product.id}`}>
											{prodCont.product.name}
										</Link>
									</td>
									<td>{prodCont.count}</td>
									<td>{prodCont.product.price}</td>
									<td>{prodCont.product.priceWithDiscount || '-'}</td>
								</tr>
							)
						)}
						<tr>
							<td>Загальна сума замовлення</td>
							<td>{''}</td>
							<td>{''}</td>
							<td>
								<b>{(Math.round(this.state.order.totalPrice * 100) / 100)}грн</b>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			);
		if (this.state.isLoading)
			return <Spinner/>
	};

	renderOrderInfo = () => {
		if (!this.state.isLoading && this.state.order)
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
							<td>Місто доставки</td>
							<td>{this.state.order.cityName}</td>
						</tr>
						<tr>
							<td>Адрес відділення</td>
							<td>{this.state.order.departAddress}</td>
						</tr>
						<tr>
							<td>Номер відділення</td>
							<td>{this.state.order.departNumber}</td>
						</tr>
						<tr>
							<td>Номер замовлення</td>
							<td>{this.state.order.id}</td>
						</tr>
						<tr className="order-info-container__status">
							<td>Статус замовлення</td>
							<td>
								{!this.state.isOrderStatusExpanded &&
								<OrderStatus orderStatus={this.state.order.orderStatus}/>}
								{this.state.isOrderStatusExpanded &&
								<select onChange={this.onOrdersStatusChange} value={this.state.orderStatus}>
									<option value={0}>Нове</option>
									<option value={1}>Переглянуте</option>
									<option value={2}>Відіслано</option>
									<option value={3}>Очікує на отримання</option>
									<option value={4}>Закрито</option>
								</select>}
								<div className="order-status-nav-box">
									{!this.state.isOrderStatusExpanded && <button className="btn btn-info"
																				  onClick={this.onExpandOrderStatusClick}>Змінити
									</button>}
									{this.state.isOrderStatusExpanded && <button className="btn btn-danger"
																				 onClick={this.onCloseOrderStatusClick}>Закрити
									</button>}
									{this.state.isOrderStatusExpanded &&
									<button className="btn btn-primary"
											onClick={this.onSaveOrderStatus}>Зберегти</button>
									}
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			);
		if (this.state.isLoading)
			return <Spinner/>
	};

	renderSuccessOrderStatusChangedModal = () => <SuccessOrderStatusChangedModal
		isOpen={this.state.isShowSuccessOrderStatusChangedModal}
		onClose={this.onCloseSuccessOrderStatusChangedModal}/>;

	render() {
		return (
			<DocumentTitle title={`Замовлення ${this.props.match.params.orderId}`}>
				<div>
					{this.renderUserInfo()}
					{this.renderProductsInfo()}
					{this.renderOrderInfo()}
					{this.renderSuccessOrderStatusChangedModal()}
				</div>
			</DocumentTitle>
		);
	}
}

export default FullOrder;