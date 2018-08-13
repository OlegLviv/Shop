import React from 'react';
import {customModalStyle} from "../modalStyles";
import Modal from 'react-modal';
import {
	isValidEmail,
	isValidNameAndLastName, isValidOnlyDigits,
	isValidPhoneNumber,
	isValidWhiteSpace
} from "../../../utils/validationUtils";
import {Spinner} from "../../Spinner/Spinner";

class MakeOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isValidEmail: true,
			isValidPhone: true,
			isValidName: true,
			isValidLastName: true,
			isValidCityName: true,
			isValidDepartAddress: true,
			isValidDepartNumber: true,
			email: '',
			name: '',
			lastName: '',
			phone: '',
			wayOfDelivery: 'Нова пошта',
			cityName: '',
			departAddress: '',
			departNumber: ''
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

	validateCityName = value => {
		if (!isValidWhiteSpace(value)) {
			this.setState({isValidCityName: false});
			return false;
		}
		if (isValidWhiteSpace(value) && !this.state.isValidCityName) {
			this.setState({isValidCityName: true});
			return false;
		}
		if (isValidWhiteSpace(value) && this.state.isValidCityName)
			return true;
	};

	validateDepartAddress = value => {
		if (value.length < 5) {
			this.setState({isValidDepartAddress: false});
			return false;
		}
		if (value.length >= 5) {
			this.setState({isValidDepartAddress: true});
			return false;
		}
		if (value.length <= 5 && this.state.isValidDepartAddress)
			return true;
	};

	validateDepartNumber = value => {
		if (!isValidOnlyDigits(value)) {
			this.setState({isValidDepartNumber: false});
			return false;
		}
		if (isValidOnlyDigits(value)) {
			this.setState({isValidDepartNumber: true});
			return false;
		}
		if (isValidOnlyDigits(value) && this.state.isValidDepartNumber)
			return true;
	};

	isValidAllFields = () => {
		const isValidName = this.validateName(this.state.name);
		const isValidLastName = this.validateLastName(this.state.lastName);
		const isValidEmail = this.validateEmail(this.state.email);
		const isValidPhone = this.validatePhone(this.state.phone);
		const isValidCityName = this.validateCityName(this.state.cityName);
		const isValidDepartAddress = this.validateDepartAddress(this.state.departAddress);
		const isValidDepartNumber = this.validateDepartNumber(this.state.departNumber);

		return isValidName && isValidLastName && isValidEmail && isValidPhone && isValidCityName && isValidDepartAddress && isValidDepartNumber;
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

	onChangeCityName = ({target}) => {
		this.validateCityName(target.value);
		this.setState({cityName: target.value});
	};

	onChangeDepartAddress = ({target}) => {
		this.validateDepartAddress(target.value);
		this.setState({departAddress: target.value});
	};

	onChangeDepartNumber = ({target}) => {
		this.validateDepartNumber(target.value);
		this.setState({departNumber: target.value});
	};

	onWayOfDeliveryChange = ({target}) => this.setState({wayOfDelivery: target.value});

	onSubmitOrder = () => {
		if (this.isValidAllFields())
			console.log('submit', this.isValidAllFields());
		this.props.onSubmitOrder({
			name: this.state.name,
			lastName: this.state.lastName,
			email: this.state.email,
			phoneNumber: this.state.phone,
			wayOfDelivery: this.state.wayOfDelivery,
			cityName: this.state.cityName,
			departAddress: this.state.departAddress,
			departNumber: this.state.departNumber
		});
	};

	onCloseModal = () => this.props.onCloseModal();

	renderError = text => <small className="invalid-small">{text}</small>;

	render() {
		const {email, name, lastName, phone, cityName, departAddress, departNumber} = this.state;
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
					<div className="form-group">
						<label htmlFor="inputPhone">Місто</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidCityName && 'invalid-input'}`}
							   id="inputPhone"
							   placeholder="Введіть місто доставки"
							   value={cityName}
							   onChange={this.onChangeCityName}/>
						{!this.state.isValidCityName && this.renderError('Некоректно введено назва міста')}
					</div>
					<div className="form-group">
						<label htmlFor="inputPhone">Адрес відділення</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidDepartAddress && 'invalid-input'}`}
							   id="inputPhone"
							   placeholder="Введіть місто доставки"
							   value={departAddress}
							   onChange={this.onChangeDepartAddress}/>
						{!this.state.isValidDepartAddress && this.renderError('Некоректно введено адрес відділення, поле повинно містити більше 5-ти символів')}
					</div>
					<div className="form-group">
						<label htmlFor="inputPhone">Номер відділення</label>
						<input type="text"
							   className={`form-control ${!this.state.isValidDepartNumber && 'invalid-input'}`}
							   id="inputPhone"
							   placeholder="Введіть місто доставки"
							   value={departNumber}
							   onChange={this.onChangeDepartNumber}/>
						{!this.state.isValidDepartNumber && this.renderError('Некоректно введено номер відділення')}
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