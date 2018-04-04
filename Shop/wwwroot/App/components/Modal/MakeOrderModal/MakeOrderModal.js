import React from 'react';
import {customStyles} from "../modalStyles";
import Modal from 'react-modal';

class MakeOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: ''
		}
	}

	onCloseModal = () => {
		this.props.onCloseModal();
	};

	onSubmitOrder = () => {
		console.log('submit order');
	};

	onEmailKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.onSubmitOrder();
		}
	};

	onPhoneKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.onSubmitOrder();
		}
	};

	onChangeEmail = (e) => {
		this.setState({email: e.target.value});
	};

	onChangePhone = (e) => {
		this.setState({phone: e.target.value});
	};

	render() {
		return (
			<Modal isOpen={this.props.isModalOpen}
				   onRequestClose={this.onCloseModal}
				   shouldCloseOnEsc={true}
				   style={customStyles}>
				<div className="form-container">
					<div className="form-group">
						<label htmlFor="inputEmail">Email</label>
						<input type="text"
							   className="form-control"
							   id="inputEmail"
							   aria-describedby="emailHelp"
							   placeholder="Введіть email"
							   value={this.state.email}
							   onChange={this.onChangeEmail}
							   onKeyPress={this.onEmailKeyPress}/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with
							anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="inputPhone">Телефон</label>
						<input type="text"
							   className="form-control"
							   id="inputPhone"
							   placeholder="Введіть свій номер телефону..."
							   value={this.state.phone}
							   onChange={this.onChangePhone}
							   onKeyPress={this.onPhoneKeyPress}/>
					</div>
					<div className="form-group">
						<label htmlFor="selectPay">Оберіть спосіб доставки</label>
						<select className="form-control" id="selectPay">
							<option>Нова пошта</option>
							<option>Пошта</option>
							<option>Пошта</option>
						</select>
					</div>
					<div className="form-container__footer">
						<button
							className="btn btn-primary"
							onClick={this.onSubmitOrder}>Увійти
						</button>
						<button className="btn btn-danger" onClick={this.onCloseModal}>Закрити</button>
					</div>
				</div>
			</Modal>
		)
	}
}

export default MakeOrderModal;