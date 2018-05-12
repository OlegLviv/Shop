import React from 'react';
import './ChangeEmail.scss';
import {apiGet, apiPost, apiPut} from "../../../../services/api";
import {
	GET_USER_INFO_URL,
	SEND_CHANGE_EMAIL_TOKEN_URL,
	CHANGE_USER_EMAIL_URL,
	getIsExistUserUrl
} from "../../../../services/urls/userUrls";
import {isValidEmail} from "../../../../utils/validationUtils";
import {Spinner} from "../../../Spinner/Spinner";
import {SuccessChangedEmailModal} from "./SuccessChangedEmailModal";

const getChangeUserEmailBody = ({token, newEmail}) => ({
	emailToken: token,
	newEmail: newEmail
});

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
			tokenError: '',
			isLoading: false,
			canShowSuccessChangedEmailModal: false
		}
	}

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	componentDidMount() {
		this.trySetLoading();

		apiGet(GET_USER_INFO_URL)
			.then(resp => this.setState({oldEmail: resp.data.email, isLoading: false}))
			.catch(err => alert(`Error:${err}`));
	}

	isUserExist = (value) => apiGet(getIsExistUserUrl(value));

	validateNewEmail = (value, successAction) => {
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

		this.isUserExist(value)
			.then(resp => {
				resp.data === true && this.setState({
					isValidEmail: false,
					emailError: 'Користувач з таким Email вже існує'
				});
				isValidEmail(value) && !resp.data && successAction && successAction();
			});

		if (isValidEmail(value) && !this.state.isValidEmail)
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
		this.validateNewEmail(this.state.newEmail, () => {
			this.trySetLoading();

			this.isUserExist(this.state.newEmail)
				.then(({data}) => {
					if (!isValidEmail(this.state.newEmail) ||
						(this.state.newEmail === this.state.oldEmail) ||
						data === true)
						return;

					apiPost(SEND_CHANGE_EMAIL_TOKEN_URL, {
						newEmail: this.state.newEmail
					})
						.then(resp => {
							console.log(resp);
							if (resp.status === 200 && resp.data === 'Success') {
								this.setState({isRenderConfirmTokenView: true, isLoading: false});
							}
						})
						.catch(err => alert(`Error:${err}`));
				})
				.catch(err => alert(`Error:${err}`));
		});
	};

	onConfirmTokenClick = () => {
		this.trySetLoading();

		apiPut(CHANGE_USER_EMAIL_URL, getChangeUserEmailBody(this.state), error => {
			if (error.response.status === 400)
				this.setState({
					isValidToken: false,
					tokenError: 'Некоректний код підтвердження'
				});
		})
			.then(resp => {
				this.setState({
					newEmail: '',
					oldEmail: resp.data.email,
					isRenderConfirmTokenView: false,
					isValidEmail: true,
					isValidToken: true,
					tokenError: '',
					isLoading: false,
					canShowSuccessChangedEmailModal: true
				})
					.catch(() => this.setState({isLoading: false}));
			})
			.catch(() => this.setState({isLoading: false}));
	};

	onCloseSuccessChangedEmailModal = () => this.setState({canShowSuccessChangedEmailModal: false});

	renderError = text => <small className="invalid-small">{text}</small>;

	renderSuccessChangedEmailModal = () => <SuccessChangedEmailModal
		isOpen={this.state.canShowSuccessChangedEmailModal}
		onClose={this.onCloseSuccessChangedEmailModal}/>;

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
				{this.renderSuccessChangedEmailModal()}
				<div className="ce-container__header">Зміна Email</div>
				{!this.state.isLoading ? <div className="ce-container__form">
					<div className="form-group">
						<label htmlFor="inputOldEmail">Ваш Email</label>
						<input className="form-control"
							   id="inputOldEmail"
							   value={this.state.oldEmail}
							   readOnly/>
					</div>
					{!this.state.isRenderConfirmTokenView && <div>
						<div className="form-group">
							<label htmlFor="inputNewEmail">Новий Email</label>
							<input className={`form-control ${!this.state.isValidEmail && 'invalid-input'}`}
								   id="inputNewEmail"
								   placeholder="Введіть новий Email"
								   onChange={this.onChangeEmail}/>
							{!this.state.isValidEmail && this.renderError(this.state.emailError)}
						</div>
						<button className="btn btn-info" onClick={this.onClickChangeEmail}>Відправити</button>
					</div>}
					{this.state.isRenderConfirmTokenView && this.renderConfirmToken()}
				</div> : <Spinner/>}
			</div>
		);
	}
}

export default ChangeEmail;