import React from 'react';
import {customStyles} from "../modalStyles";
import Modal from 'react-modal';
import {isValidEmail, isValidNameLastName, isValidPhoneNumber} from "../../../utils/validationUtils";

class MakeOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			phone: '',
			nameLastName: '',
			isValidEmail: true,
			isValidPhone: true,
			isValidNameLastName: true,
			emailError: '',
			phoneError: '',
			nameLastNameError: '',
			wayOfDelivery: 'Нова пошта',
			user: this.props.user
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				user: nextProps.user,
				email: nextProps.user.email,
				phone: nextProps.user.phoneNumber,
				nameLastName: `${nextProps.user.name} ${nextProps.user.lastName}`
			});
		}
	}

	validateEmail = value => {
		if (!isValidEmail(value)) {
			this.setState({
				isValidEmail: false,
				emailError: 'Некоректний Email'
			});
			return false;
		}
		if (isValidEmail(value) && !this.state.isValidEmail) {
			this.setState({
				isValidEmail: true,
				emailError: ''
			});
			return false;
		}
		if (isValidEmail(value) && this.state.isValidEmail)
			return true;
	};

	validatePhone = value => {
		if (!isValidPhoneNumber(value)) {
			this.setState({
				isValidPhone: false,
				phoneError: 'Некоректний номер телефону'
			});
			return false;
		}
		if (isValidPhoneNumber(value) && !this.state.isValidPhone) {
			this.setState({
				isValidPhone: true,
				phoneError: ''
			});
			return false;
		}
		if (isValidPhoneNumber(value) && this.state.isValidPhone)
			return true;
	};

	validateNameLastName = value => {
		if (!isValidNameLastName(value)) {
			this.setState({
				isValidNameLastName: false,
				nameLastNameError: 'Будь ласка введіть імя і прізвище, або просто ім\'я'
			});
			return false;
		}
		if (isValidNameLastName(value) && !this.state.isValidNameLastName) {
			this.setState({
				isValidNameLastName: true,
				nameLastNameError: ''
			});
			return false;
		}
		if (isValidNameLastName(value) && this.state.isValidNameLastName)
			return true;
	};

	isValidAllFields = () => {
		const isValidEmail = this.validateEmail(this.state.email);
		const isValidPhone = this.validatePhone(this.state.phone);
		const isValidNameLastName = this.validateNameLastName(this.state.nameLastName);

		return isValidEmail && isValidPhone && isValidNameLastName;
	};

	onChangeEmail = (e) => {
		this.validateEmail(e.target.value);
		this.setState({email: e.target.value});
	};

	onChangePhone = (e) => {
		this.validatePhone(e.target.value);
		this.setState({phone: e.target.value});
	};

	onChangeNameLastName = ({target}) => {
		this.validateNameLastName(target.value);
		this.setState({nameLastName: target.value});
	};

	onWayOfDeliveryChange = ({target}) => {
		this.setState({wayOfDelivery: target.value});
	};

	onSubmitOrder = () => {
		if (this.isValidAllFields())
			this.props.onSubmitOrder({
				email: this.state.email,
				phone: this.state.phone,
				nameLastName: this.state.nameLastName,
				wayOfDelivery: this.state.wayOfDelivery
			});
	};

	onCloseModal = () => {
		this.props.onCloseModal();
	};

	renderError = text => <small className="invalid-small">{text}</small>;

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
							   className={`form-control ${!this.state.isValidEmail && 'invalid-input'}`}
							   id="inputEmail"
							   aria-describedby="emailHelp"
							   placeholder="Введіть email"
							   value={this.state.email}
							   onChange={this.onChangeEmail}/>
						{!this.state.isValidEmail && this.renderError(this.state.emailError)}
					</div>
					<div className="form-group">
						<label htmlFor="inputPhone">Телефон</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidPhone && 'invalid-input'}`}
							   id="inputPhone"
							   placeholder="Введіть свій номер телефону..."
							   value={this.state.phone}
							   onChange={this.onChangePhone}/>
						{!this.state.isValidPhone && this.renderError(this.state.phoneError)}
					</div>
					<div className="form-group">
						<label htmlFor="inputNameLastName">Ім'я і прізвище</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidNameLastName && 'invalid-input'}`}
							   id="inputNameLastName"
							   placeholder="Введіть своє ім'я і прізвище"
							   value={this.state.nameLastName}
							   onChange={this.onChangeNameLastName}/>
						{!this.state.isValidNameLastName && this.renderError(this.state.nameLastNameError)}
					</div>
					<div className="form-group">
						<label htmlFor="selectPay">Оберіть спосіб доставки</label>
						<select className="form-control" id="selectPay" onChange={this.onWayOfDeliveryChange}
								value={this.state.wayOfDelivery}>
							<option>Нова пошта</option>
							<option>Пошта1</option>
							<option>Пошта2</option>
						</select>
					</div>
					<div className="form-container__footer">
						<button
							className="btn btn-primary"
							onClick={this.onSubmitOrder}>Відправити
						</button>
						<button className="btn btn-danger" onClick={this.onCloseModal}>Закрити</button>
					</div>
				</div>
			</Modal>
		)
	}
}

export default MakeOrderModal;