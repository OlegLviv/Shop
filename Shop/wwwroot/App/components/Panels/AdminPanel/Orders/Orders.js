import React from 'react';
import './Orders.scss';
import {apiGet} from "../../../../services/api";
import {getAllOrdersUrl} from "../../../../services/urls/orderUrls";
import Pagination from 'react-js-pagination';
import {Link} from 'react-router-dom';
import {Spinner} from "../../../Spinner/Spinner";
import {convertOrderStatus} from "../../../../utils/orderUtils";

const itemPerPage = 5;

class Orders extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			totalOrdersCount: 0,
			activePage: 1,
			orderStatus: 0,
			isLoaded: false,
			isLoading: true
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
		this.setState({
			isLoading: true,
			isLoaded: false
		});
		apiGet(getAllOrdersUrl(pageNumber, pageSize, orderStatus))
			.then(resp => {
				console.log(resp);
				this.setState({
					orders: resp.data.data,
					totalOrdersCount: resp.data.totalCount,
					activePage: resp.data.pageNumber,
					isLoading: false,
					isLoaded: true
				});
			});
	};

	onOrdersStatusChange = ({target}) => this.setState({orderStatus: Number(target.value)});

	onPaginationChange = pageNumber => {
		this.setState({activePage: pageNumber});
	};

	renderSwitchContent = () => {
		if (this.state.isLoaded && !this.state.isLoading && this.state.orders.length > 0)
			return (
				<div>
					<ul className="list-group orders-container__list-group">
						{
							this.state.orders.map(order =>
								<li
									key={order.id}
									className="list-group-item orders-container__list-group__list-group-item">
									<Link to={`/adminPanel/orders/${order.id}`}>
										<div>Ім'я прізвище: {order.nameLastName}</div>
										<div>Email: {order.email}</div>
										<div>Телефон: {order.phone}</div>
									</Link>
								</li>
							)
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
		if (this.state.isLoaded && !this.state.isLoading && this.state.orders.length === 0)
			return (<div className="text-center my-5">
				<h5>{`Нових замовлень з статусом *${convertOrderStatus(this.state.orderStatus)}* немає`}</h5>
			</div>);
		else return (<Spinner/>);
	};

	render() {
		return (
			<div className="orders-container">
				<div className="orders-container__header">
					<div>Список замовлень</div>
					<select onChange={this.onOrdersStatusChange} value={this.state.orderStatus}>
						<option value={0}>Нові</option>
						<option value={1}>Переглянуті</option>
						<option value={2}>Відіслані</option>
						<option value={3}>Очікують на отримання</option>
						<option value={4}>Закриті</option>
					</select>
				</div>
				{this.renderSwitchContent()}
			</div>
		);
	}
}

export default Orders;