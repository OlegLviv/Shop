import React, {Component} from 'react';
import {apiGet} from "../../../../services/api";
import {getOwnOrdersUrl} from "../../../../services/urls/orderUrls";
import OrderList from './OrderList';
import './Orders.scss';
import Pagination from 'react-js-pagination';

const itemPerPage = 4;

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			orders: [],
			activePage: 1,
			totalOrdersCount: 0
		}
	}

	componentDidMount() {
		this.updateOrdersState(this.state.activePage, itemPerPage);
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.activePage !== nextState.activePage)
			this.updateOrdersState(nextState.activePage, itemPerPage);
	}

	trySetLoading = () => !this.state.isLoading && this.setState({isLoading: true});

	updateOrdersState = (pageNumber, pageSize) => {
		this.trySetLoading();
		apiGet(getOwnOrdersUrl(pageNumber, pageSize))
			.then(resp => this.setState({
				orders: resp.data.data,
				totalOrdersCount: resp.data.totalCount,
				activePage: resp.data.pageNumber,
				isLoading: false
			}))
			.catch(err => {
				alert(`Error: ${err}`);
				this.setState({isLoading: false});
			});
	};

	onPaginationChange = pageNumber => this.setState({activePage: pageNumber});

	renderOrdersList = () => <OrderList orders={this.state.orders} isLoading={this.state.isLoading}/>;

	render() {
		return (
			<div className="orders-cont">
				<div className="orders-cont__header">Мої замовлення</div>
				<div className="orders-cont__orders-lis">
					{this.renderOrdersList()}
				</div>
				<div className="pagination-box">
					{!this.state.isLoading && this.state.orders.length > 0 &&
					<Pagination totalItemsCount={this.state.totalOrdersCount}
								itemsCountPerPage={itemPerPage}
								onChange={this.onPaginationChange}
								activePage={this.state.activePage}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination-box__pagination pagination"/>}
				</div>
			</div>
		);
	}
}

export default Orders;