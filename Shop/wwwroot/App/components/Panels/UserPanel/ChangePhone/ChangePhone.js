import React from 'react';
import './ChangePhone.scss';
import {isValidPhoneNumber} from "../../../../utils/validationUtils";
import {GET_USER_INFO_URL} from "../../../../services/urls/userUrls";
import {apiGet} from "../../../../services/api";

//	todo need implement in future
class ChangePhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPhone: '',
			newPhone: '',
			isValidNewPhone: true,
			newPhoneError: ''
		}
	}

	componentDidMount() {
		apiGet(GET_USER_INFO_URL)
			.then(resp => {
				console.log(resp);
				this.setState({oldPhone: resp.data.phoneNumber});
			});
	}

	validatePhone = (value, isValidAction) => {
		if (!isValidPhoneNumber(value)) {
			this.setState({
				isValidNewPhone: false,
				newPhoneError: 'Некоректний номер телефону'
			});
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

	renderError = text => <small className="invalid-small">{text}</small>;

	render() {
		return (
			<div className="ch-phone-cont">
				<div className="ch-phone-cont__header">Зміна номеру телефону</div>
				<div className="ch-phone-cont__form">
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
				</div>
			</div>
		)
	}
}

export default ChangePhone;