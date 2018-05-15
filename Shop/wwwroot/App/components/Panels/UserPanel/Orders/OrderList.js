import React, {Component} from 'react';
import {apiGet} from "../../../../services/api";
import {getProductsByIdsUrl} from "../../../../services/urls/productUrls";

class OrderList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			products: []
		}
	}

	componentWillReceiveProps({ordersContainers}) {
		if (!this.props.ordersContainers.length && ordersContainers.length) {
			console.log('yes', ordersContainers);
			this.updateProductsState(ordersContainers
				.map(ordersContainer => ordersContainer.orders.map(order => order.productId)));
		}
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	updateProductsState = ids => {
		console.log('ids', ids);
		this.trySetLoading();
		apiGet(getProductsByIdsUrl(ids))
			.then(resp => this.setState({loading: false, products: resp.data}))
			.catch(err => {
				alert(`Error: ${err}`);
				this.setState({loading: false});
			});
	};

	render() {
		return (
			<ul className="list-group">
				{this.props.ordersContainers.map(order => <li className="list-group-item"></li>)}
			</ul>
		)
	}
}

export default OrderList