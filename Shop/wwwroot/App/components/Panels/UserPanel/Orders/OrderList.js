import React, {Component} from 'react';
import {Spinner} from "../../../Spinner/Spinner";
import './OrderList.scss'
import {convertDateToDateString, convertDateToTimeString} from "../../../../utils/timeUtils";
import {OrderStatus} from '../../../common/OrderStatus/OrderStatus';

class OrderList extends Component {

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	renderNotFound = () => (
		<div className="text-center mt-2">
			<h3>Нічого не знайдено</h3>
		</div>
	);

	render() {
		console.log(this.props.orders);
		if (!this.props.isLoading && !this.props.orders.length)
			return this.renderNotFound();

		if (!this.props.isLoading)
			return (
				<ul className="list-group order-list">
					{this.props.orders.map(container => <li key={container.id}
															className="list-group-item order-list__item">
						<div>{`${container.productsContainers[0].product.name}...`}</div>
						<div className="order-list__item__text-items">
							<div className="order-list__item__text-items__label">Дата:</div>
							<div>{convertDateToDateString(container.createDate)}</div>
						</div>
						<div className="order-list__item__text-items">
							<div className="order-list__item__text-items__label">Час:</div>
							<div>{convertDateToTimeString(container.createDate)}</div>
						</div>
						<div className="order-list__item__text-items__label">Статус:</div>
						<OrderStatus orderStatus={container.orderStatus}/>
					</li>)}
				</ul>
			);
		else
			return <Spinner/>;
	}
}

export default OrderList