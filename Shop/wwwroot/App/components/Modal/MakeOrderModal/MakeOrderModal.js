import React from 'react';
import {customModalStyle} from "../modalStyles";
import Modal from 'react-modal';
import {isValidEmail, isValidNameAndLastName, isValidPhoneNumber} from "../../../utils/validationUtils";
import {Spinner} from "../../Spinner/Spinner";

class MakeOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidEmail: true,
			isValidPhone: true,
			isValidName: true,
			isValidLastName: true,
			email: '',
			name: '',
			lastName: '',
			phone: '',
			wayOfDelivery: 'Нова пошта'
		}
	}

	componentWillReceiveProps({user}) {
		if (user) {
			this.setState({
				user: user,
				email: user.email,
				phone: user.phoneNumber,
				name: user.name,
				lastName: user.lastName
			});
		}
	}


	validateName = value => {
		if (!isValidNameAndLastName(value)) {
			this.setState({
				isValidName: false
			});
			return false;
		}
		if (isValidNameAndLastName(value) && !this.state.isValidName) {
			this.setState({
				isValidName: true
			});
			return false;
		}
		if (isValidNameAndLastName(value) && this.state.isValidName)
			return true;
	};

	validateLastName = value => {
		if (!isValidNameAndLastName(value)) {
			this.setState({
				isValidLastName: false
			});
			return false;
		}
		if (isValidNameAndLastName(value) && !this.state.isValidLastName) {
			this.setState({
				isValidLastName: true
			});
			return false;
		}
		if (isValidNameAndLastName(value) && this.state.isValidLastName)
			return true;
	};

	validateEmail = value => {
		if (!isValidEmail(value)) {
			this.setState({
				isValidEmail: false
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
				isValidPhone: false
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

	isValidAllFields = () => {
		const isValidName = this.validateName(this.state.name);
		const isValidLastName = this.validateLastName(this.state.lastName);
		const isValidEmail = this.validateEmail(this.state.email);
		const isValidPhone = this.validatePhone(this.state.phone);

		return isValidName && isValidLastName && isValidEmail && isValidPhone;
	};

	onChangeName = ({target}) => {
		this.validateName(target.value);
		this.setState({name: target.value});
	};

	onChangeLastName = ({target}) => {
		this.validateLastName(target.value);
		this.setState({lastName: target.value});
	};

	onChangeEmail = (e) => {
		this.validateEmail(e.target.value);
		this.setState({email: e.target.value});
	};

	onChangePhone = (e) => {
		this.validatePhone(e.target.value);
		this.setState({phone: e.target.value});
	};

	onWayOfDeliveryChange = ({target}) => this.setState({wayOfDelivery: target.value});

	onSubmitOrder = () => {
		if (this.isValidAllFields())
			this.props.onSubmitOrder({
				name: this.state.name,
				lastName: this.state.lastName,
				email: this.state.email,
				phoneNumber: this.state.phone,
				wayOfDelivery: this.state.wayOfDelivery
			});
	};

	onCloseModal = () => this.props.onCloseModal();

	renderError = text => <small className="invalid-small">{text}</small>;

	render() {
		const {email, name, lastName, phone} = this.state;
		return (
			<Modal isOpen={this.props.isModalOpen}
				   onRequestClose={this.onCloseModal}
				   shouldCloseOnEsc={true}
				   style={customModalStyle}>
				{!this.props.loading ? <div className="form-container">
					<div className="form-group">
						<label htmlFor="inputName">Ім'я</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidName && 'invalid-input'}`}
							   id="inputName"
							   placeholder="Введіть своє ім'я"
							   value={name}
							   onChange={this.onChangeName}/>
						{!this.state.isValidName && this.renderError('Некоректне ім\'я')}
					</div>
					<div className="form-group">
						<label htmlFor="inputLastName">Прізвище</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidLastName && 'invalid-input'}`}
							   id="inputLastName"
							   placeholder="Введіть своє прізвище"
							   value={lastName}
							   onChange={this.onChangeLastName}/>
						{!this.state.isValidLastName && this.renderError('Некоректне прізвище')}
					</div>
					<div className="form-group">
						<label htmlFor="inputEmail">Email</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidEmail && 'invalid-input'}`}
							   id="inputEmail"
							   aria-describedby="emailHelp"
							   placeholder="Введіть email"
							   value={email}
							   onChange={this.onChangeEmail}/>
						{!this.state.isValidEmail && this.renderError('Некоректний Email')}
					</div>
					<div className="form-group">
						<label htmlFor="inputPhone">Телефон</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidPhone && 'invalid-input'}`}
							   id="inputPhone"
							   placeholder="Введіть свій номер телефону..."
							   value={phone}
							   onChange={this.onChangePhone}/>
						{!this.state.isValidPhone && this.renderError('Некоректний номер телефону')}
					</div>
					<div className="form-group">
						<label htmlFor="selectPay">Оберіть спосіб доставки</label>
						<select className="form-control" id="selectPay" onChange={this.onWayOfDeliveryChange}
								value={this.state.wayOfDelivery}>
							<option>Нова пошта</option>
							<option>Інтайм</option>
							<option>Укрпошта</option>
							<option>Делівері</option>
						</select>
					</div>
					<div className="form-container__footer">
						<button
							className="btn btn-primary"
							onClick={this.onSubmitOrder}>Відправити
						</button>
						<button className="btn btn-danger" onClick={this.onCloseModal}>Закрити</button>
					</div>
				</div> : <Spinner/>}
			</Modal>
		)
	}
}

export default MakeOrderModal;