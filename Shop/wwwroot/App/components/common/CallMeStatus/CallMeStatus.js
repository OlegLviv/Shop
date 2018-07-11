import React from 'react';
import {convertCallMeStatus} from "../../../utils/orderUtils";

const switchColor = status => {
	switch (status) {
		case 0:
			return {
				background: '#96ff00',
				color: '#376C00'
			};
		case 1:
			return {
				background: '#ff5555',
				color: '#702828'
			};
	}
};

export const CallMeStatus = props => {
	return (
		<div className="order-status-box"
			 style={{
				 background: switchColor(props.status).background,
				 color: switchColor(props.status).color
			 }}
			 onClick={props.onClick}>
			{convertCallMeStatus(props.status)}
		</div>
	);
};