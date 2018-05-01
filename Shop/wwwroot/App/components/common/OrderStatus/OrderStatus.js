import React from 'react';
import './OrderStatus.scss';
import {convertOrderStatus} from "../../../utils/orderUtils";

const switchColor = orderStatus => {
	switch (orderStatus) {
		case 0:
			return '#96ff00';
		case 1:
			return '#10498A';
		case 2:
			return '#007bff';
		case 3:
			return '#f9ff00';
		case 4:
			return '#ff5555';
	}
};

export const OrderStatus = props => {
	return (
		<div className="order-status-box"
			 style={{
				 background: switchColor(props.orderStatus)
			 }}>
			{convertOrderStatus(props.orderStatus)}
		</div>
	);
};