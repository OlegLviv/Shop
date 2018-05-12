import React from 'react';
import './OrderStatus.scss';
import {convertOrderStatus} from "../../../utils/orderUtils";

const switchColor = orderStatus => {
	switch (orderStatus) {
		case 0:
			return {
				background: '#96ff00',
				color: '#376C00'
			};
		case 1:
			return {
				background: '#10498A',
				color: '#D6F0F5'
			};
		case 2:
			return {
				background: '#007bff',
				color: '#10498A'
			};
		case 3:
			return {
				background: '#f9ff00',
				color: '#686B00'
			};
		case 4:
			return {
				background: '#ff5555',
				color: '#702828'
			};
	}
};

export const OrderStatus = props => {
	return (
		<div className="order-status-box"
			 style={{
				 background: switchColor(props.orderStatus).background,
				 color: switchColor(props.orderStatus).color
			 }}
			 onClick={props.onClick}>
			{convertOrderStatus(props.orderStatus)}
		</div>
	);
};