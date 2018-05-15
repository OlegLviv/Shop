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

	trySetLoading = () => !this.state.loading && this.setState({loading: true});


	render() {
		return (
			<ul className="list-group">
				{this.props.ordersContainers.map(order => <li className="list-group-item"></li>)}
			</ul>
		)
	}
}

export default OrderList