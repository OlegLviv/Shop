import React from 'react';
import './FullOrder.scss';
import {apiGet} from "../../../../../services/api";
import {getOrderUrl} from "../../../../../services/urls/orderUrls";

class FullOrder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: null
		}
	}

	renderUserInfo = () => {
		return (
			<table>
				<thead>
				<th/>
				<th/>
				</thead>
				<tbody>

				</tbody>
			</table>
		)
	};

	componentDidMount() {
		apiGet(getOrderUrl(this.getId()))
			.then(resp => {
				this.setState({order: resp.data});
			});
	}

	componentWillReceiveProps(nextProps) {
		console.log('props');
	}

	getId = () => this.props.match.params['orderId'];

	render() {
		return (
			<div>full</div>
		)
	}
}

export default FullOrder