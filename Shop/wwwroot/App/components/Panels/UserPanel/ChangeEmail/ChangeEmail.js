import React from 'react';
import './ChangeEmail.scss';
import {apiGet, apiPost, apiPut} from "../../../../services/api";
import {
	GET_USER_INFO,
	SEND_CHANGE_EMAIL_TOKEN,
	CHANGE_USER_EMAIL,
	getIsExistUserUrl
} from "../../../../services/urls/userUrls";
import {isValidEmail, isValidWhiteSpace} from "../../../../utils/validationUtils";

class ChangeEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldEmail: '',
			newEmail: '',
			isValidEmail: true,
			emailError: '',
			token: '',
			isRenderConfirmTokenView: false,
			isValidToken: true,
			tokenError: ''
		}
	}

	componentDidMount() {
		apiGet(GET_USER_INFO)
			.then(resp => this.setState({oldEmail: resp.data.email}));
	}

	isUserExist = (value) => apiGet(getIsExistUserUrl(value));

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

		this.isUserExist(value)
			.then(resp => resp.data === true && this.setState({
				isValidEmail: false,
				emailError: 'Користувач з таким Email вже існує'
			}));

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

		this.isUserExist(this.state.newEmail)
			.then(({data}) => {
				if (!isValidWhiteSpace(this.state.newEmail) ||
					!isValidEmail(this.state.newEmail) ||
					(this.state.newEmail === this.state.oldEmail) ||
					data === true)
					return;

				apiPost(SEND_CHANGE_EMAIL_TOKEN, {
					newEmail: this.state.newEmail
				})
					.then(resp => {
						console.log(resp);
						if (resp.status === 200 && resp.data === 'Success') {
							this.setState({isRenderConfirmTokenView: true});
						}
					});
			})
	};

	onConfirmTokenClick = () => {
		apiPut(CHANGE_USER_EMAIL, {
			emailToken: this.state.token,
			newEmail: this.state.newEmail
		}, error => {
			if (error.response.status === 400)
				this.setState({
					isValidToken: false,
					tokenError: 'Некоректний код підтвердження'
				});
		})
			.then(resp => {
				alert(`Email успішно змінено на ${resp.data.email}`);
				this.setState({
					newEmail: '',
					oldEmail: resp.data.email,
					isRenderConfirmTokenView: false,
					isValidEmail: true,
					isValidToken: true,
					tokenError: ''
				});
			});
	};

	renderError = text => <small className="invalid-small">{text}</small>;

	renderConfirmToken = () => {
		return (
			<div>
				<div className="form-group ce-container__form__confirm-token-form-group">
					<label htmlFor="inputEmailToken">Код підтвердження Email</label>
					<input className={`form-control ${!this.state.isValidToken && 'invalid-input'}`}
						   id="inputEmailToken"
						   placeholder="Введіть код підтвердження Email"
						   onChange={({target}) => this.setState({token: target.value})}/>
					{!this.state.isValidToken && this.renderError(this.state.tokenError)}
					<br/>
					<small>* На вашу пошту відправлений код підтвердження зміни Email. Скопіюйте його і вставте в поле
						вище
					</small>
				</div>
				<button className="btn btn-info" onClick={this.onConfirmTokenClick}>Підтвердити</button>
			</div>
		);
	};

	render() {
		return (
			<div className="ce-container">
				<div className="ce-container__header">Зміна Email</div>
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
					<button className="btn btn-info" onClick={this.onClickChangeEmail}>Відправити</button>
					{this.state.isRenderConfirmTokenView && this.renderConfirmToken()}
				</div>
			</div>
		);
	}
}

export default ChangeEmail;