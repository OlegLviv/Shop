import React from 'react';
import './ChangeEmail.scss';
import {apiGet, apiPost} from "../../../../services/api";
import {GET_USER_INFO, SEND_CHANGE_EMAIL_TOKEN} from "../../../../services/urls/userUrls";
import {isValidEmail, isValidWhiteSpace} from "../../../../utils/validationUtils";

class ChangeEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldEmail: '',
			newEmail: '',
			isValidEmail: true,
			emailError: ''
		}
	}

	componentDidMount() {
		apiGet(GET_USER_INFO)
			.then(resp => this.setState({oldEmail: resp.data.email}));
	}

	validateNewEmail = value => {
		if (!isValidEmail(value)) {
			this.setState({
				isValidEmail: false,
				emailError: 'Некоректний Email'
			});
			return;
		}
		if (value === this.state.oldEmail) {
			this.setState({
				isValidEmail: false,
				emailError: 'Новий Email не повинен співпадати з старим'
			});
			return;
		}
		if (!isValidWhiteSpace(value)) {
			this.setState({
				isValidEmail: false,
				emailError: 'Поле не повинне містити пробіли'
			});
			return;
		}
		if (isValidEmail(value) && isValidWhiteSpace(value) && !this.state.isValidEmail)
			this.setState({
				isValidEmail: true,
				emailError: ''
			});
	};

	onChangeEmail = ({target}) => {
		const {value} = target;
		this.setState({newEmail: value});
		this.validateNewEmail(value);
	};

	onClickChangeEmail = () => {
		this.validateNewEmail(this.state.newEmail);

		if (!isValidWhiteSpace(this.state.newEmail) || !isValidEmail(this.state.newEmail) || (this.state.newEmail === this.state.oldEmail))
			return;

		apiPost(SEND_CHANGE_EMAIL_TOKEN, {
			newEmail: this.state.newEmail
		})
			.then(resp => {
				console.log(resp);
				if (resp.status === 200 && resp.data === 'Success') {

				}
			});
	};

	renderError = text => <small className="invalid-small">{text}</small>;

	render() {
		return (
			<div className="ce-container">
				<div className="ce-container__header">Зміна паролю</div>
				<div className="ce-container__form">
					<div className="form-group">
						<label htmlFor="inputOldEmail">Ваш Email</label>
						<input className="form-control"
							   id="inputOldEmail"
							   value={this.state.oldEmail}
							   readOnly/>
					</div>
					<div className="form-group">
						<label htmlFor="inputNewEmail">Новий Email</label>
						<input className={`form-control ${!this.state.isValidEmail && 'invalid-input'}`}
							   id="inputNewEmail"
							   placeholder="Введіть новий Email"
							   onChange={this.onChangeEmail}/>
						{!this.state.isValidEmail && this.renderError(this.state.emailError)}
					</div>
					<button className="btn btn-info" onClick={this.onClickChangeEmail}>Змінити</button>
				</div>
			</div>
		)
	}
}

export default ChangeEmail;