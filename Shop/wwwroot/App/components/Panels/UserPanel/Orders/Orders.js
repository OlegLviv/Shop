import React, {Component} from 'react';
import {apiGet} from "../../../../services/api";
import {getOwnOrdersUrl} from "../../../../services/urls/orderUrls";
import OrderList from './OrderList';

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			ordersContainers: []
		}
	}

	componentDidMount() {
		this.updateOrdersState();
	}

	trySetLoading = () => !this.state.isLoading && this.setState({isLoading: false});

	updateOrdersState = () => {
		this.trySetLoading();
		apiGet(getOwnOrdersUrl())
			.then(resp => this.setState({ordersContainers: resp.data.data, isLoading: false}))
			.catch(err => {
				alert(`Error: ${err}`);
				this.setState({isLoading: false});
			})
	};

	renderOrdersList = () => {
		return (
			<OrderList ordersContainers={this.state.ordersContainers}/>
		)
	};

	render() {
		// console.log(this.state.orders);
		return (
			<div className="orders-cont">
				<div className="orders-cont__header">Мої замовлення</div>
				<div className="orders-cont__orders-lis">
					{this.renderOrdersList()}
				</div>
			</div>
		)
	}
}

export default Orders;