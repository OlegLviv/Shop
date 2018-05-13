import React from 'react';
import './ChangePhone.scss';
import {isValidPhoneNumber} from "../../../../utils/validationUtils";
import {GET_USER_INFO_URL} from "../../../../services/urls/userUrls";
import {apiGet, apiPut} from "../../../../services/api";
import {Spinner} from "../../../Spinner/Spinner";
import {CHANGE_USER_PHONE_URL} from "../../../../services/urls/userUrls";
import {SuccessChangedPhoneModal} from "./SuccessChangedPhoneModal";

class ChangePhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPhone: '',
			newPhone: '',
			isValidNewPhone: true,
			isLoading: false,
			newPhoneError: '',
			isShowSuccessChangedPhoneModal: false
		}
	}

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	componentDidMount() {
		this.trySetLoading();
		apiGet(GET_USER_INFO_URL)
			.then(resp => {
				console.log(resp);
				this.setState({oldPhone: resp.data.phoneNumber, isLoading: false});
			})
			.catch(err => {
				this.setState({isLoading: false});
				alert(`Error: ${err}`);
			});
	}

	validatePhone = (value, isValidAction) => {
		if (!isValidPhoneNumber(value)) {
			this.setState({
				isValidNewPhone: false,
				newPhoneError: 'Некоректний номер телефону'
			});
			return;
		}
		if (this.state.oldPhone === value) {
			this.setState({
				isValidNewPhone: false,
				newPhoneError: 'Номер телефону не повинет співпадати з старим'
			});
			return;
		}
		if (isValidPhoneNumber(value) && !this.state.isValidNewPhone) {
			this.setState({
				isValidNewPhone: true,
				newPhoneError: ''
			});
		}
		if (isValidPhoneNumber(value) && this.state.isValidNewPhone) {
			if (isValidAction)
				isValidAction();
		}
	};

	onNewPhoneChange = ({target}) => {
		this.validatePhone(target.value);
		this.setState({newPhone: target.value});
	};

	onChangePhoneClick = () => {
		this.validatePhone(this.state.newPhone, () => {
			this.trySetLoading();

			apiPut(CHANGE_USER_PHONE_URL, {phone: this.state.newPhone})
				.then(resp => this.setState({
					oldPhone: resp.data.phoneNumber,
					newPhone: '',
					isLoading: false,
					isShowSuccessChangedPhoneModal: true
				}))
				.catch(err => {
					this.setState({isLoading: false});
					alert(`Error: ${err}`);
				});
		});
	};

	onCloseSuccessChangedPhoneModal = () => this.setState({isShowSuccessChangedPhoneModal: false});

	renderError = text => <small className="invalid-small">{text}</small>;

	renderSuccessChangedPhoneModal = () => <SuccessChangedPhoneModal isOpen={this.state.isShowSuccessChangedPhoneModal}
																	 onClose={this.onCloseSuccessChangedPhoneModal}/>;

	renderMainForm = () => {
		return (
			<div className="ch-phone-cont__form">
				{this.renderSuccessChangedPhoneModal()}
				<div className="form-group">
					<label htmlFor="inputOldPhone">Старий номер телефону</label>
					<input className="form-control"
						   value={this.state.oldPhone}
						   id="inputOldPhone"
						   readOnly/>
				</div>
				<div className="form-group">
					<label htmlFor="inputNewPhone">Новий номер телефону</label>
					<input className={`form-control ${!this.state.isValidNewPhone && 'invalid-input'}`}
						   value={this.state.newPhone}
						   id="inputNewPhone"
						   placeholder="Введіть новий номер телефону"
						   onChange={this.onNewPhoneChange}/>
					{!this.state.isValidNewPhone && this.renderError(this.state.newPhoneError)}
				</div>
				<button className="btn btn-info" onClick={this.onChangePhoneClick}>Змінити</button>
			</div>
		);
	};

	render() {
		return (
			<div className="ch-phone-cont">
				<div className="ch-phone-cont__header">Зміна номеру телефону</div>
				{!this.state.isLoading ? this.renderMainForm() : <Spinner/>}
			</div>
		)
	}
}

export default ChangePhone;