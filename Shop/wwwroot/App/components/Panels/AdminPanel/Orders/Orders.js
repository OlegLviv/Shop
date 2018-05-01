import React from 'react';
import './Orders.scss';
import {apiGet} from "../../../../services/api";
import {getOrdersUrl} from "../../../../services/urls/orderUrls";
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';

const itemPerPage = 5;

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			totalOrdersCount: 0,
			activePage: 1,
			orderStatus: 0
		}
	}

	componentDidMount() {
		this.updateOrders(this.state.activePage, itemPerPage, this.state.orderStatus);
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.activePage !== nextState.activePage || this.state.orderStatus !== nextState.orderStatus)
			this.updateOrders(nextState.activePage, itemPerPage, nextState.orderStatus);
	}

	updateOrders = (pageNumber, pageSize, orderStatus) => {
		apiGet(getOrdersUrl(pageNumber, pageSize, orderStatus))
			.then(resp => {
				console.log(resp);
				this.setState({
					orders: resp.data.data,
					totalOrdersCount: resp.data.totalCount,
					activePage: resp.data.pageNumber
				});
			});
	};

	onPaginationChange = pageNumber => {
		this.setState({activePage: pageNumber});
	};

	render() {
		return (
			<div className="orders-container">
				<div className="orders-container__header">Список замовлень</div>
				<ul className="list-group orders-container__list-group">
					{
						this.state.orders.map(order => <Link to={`/adminPanel/orders/${order.id}`}>
							<li
								className="list-group-item orders-container__list-group__list-group-item">
								<div>Ім'я прізвище: {order.nameLastName}</div>
								<div>Email: {order.email}</div>
								<div>Телефон: {order.phone}</div>
							</li>
						</Link>)
					}
				</ul>
				<div className="pagination-box">
					<Pagination totalItemsCount={this.state.totalOrdersCount}
								itemsCountPerPage={itemPerPage}
								onChange={this.onPaginationChange}
								activePage={this.state.activePage}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination-box__pagination pagination"/>
				</div>
			</div>
		);
	}
}

export default Orders;