import React from 'react';
import './ChangePassword.scss';
import {apiPost} from "../../../../services/api";
import {CHANGE_USER_PASSWORD_URL} from "../../../../services/urls/userUrls";
import {isValidPassword, isValidWhiteSpace} from "../../../../utils/validationUtils";
import {SuccessChangedPasswordModal} from "./SuccessChangedPasswordModal";
import {Spinner} from "../../../Spinner/Spinner";

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmedNewPassword: '',
			isValidNewPassword: true,
			isValidOldPassword: true,
			isValidConfirmedNewPassword: true,
			newPasswordError: '',
			oldPasswordError: '',
			confirmedNewPasswordError: '',
			isShowSuccessChangedPasswordModal: false,
			isLoaded: true,
			isLoading: false
		}
	}

	trySetLoadings = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
		if (this.state.isLoaded)
			this.setState({isLoaded: false});
	};

	createChangePasswordModel = () => ({
		oldPassword: this.state.oldPassword,
		newPassword: this.state.newPassword
	});

	validateOldPassword = (value) => {
		if (!isValidWhiteSpace(value))
			this.setState({
				isValidOldPassword: false,
				oldPasswordError: 'Некоректний пароль. Пароль не повинен містити пробіли'
			});
		if (isValidWhiteSpace(value) && !this.state.isValidOldPassword)
			this.setState({
				isValidOldPassword: true,
				oldPasswordError: ''
			});
	};

	validateNewPassword = (value) => {
		if (!isValidPassword(value))
			this.setState({
				isValidNewPassword: false,
				newPasswordError: 'Некоректний пароль. Пароль повинен містити хоча б один символ верхнього регістру і довжина від 6 до 20 символів'
			});
		if (!isValidWhiteSpace(value))
			this.setState({
				isValidNewPassword: false,
				newPasswordError: 'Некоректний пароль. Пароль не повинен містити пробіли'
			});
		if (isValidPassword(value) && isValidWhiteSpace(value) && !this.state.isValidNewPassword)
			this.setState({
				isValidNewPassword: true,
				newPasswordError: ''
			});
	};

	validateConfirmedNewPassword = value => {
		if (value !== this.state.newPassword)
			this.setState({
				confirmedNewPasswordError: 'Паролі не співпадають',
				isValidConfirmedNewPassword: false
			});
		if (value === this.state.newPassword && !this.state.isValidConfirmedNewPassword)
			this.setState({
				isValidConfirmedNewPassword: true,
				confirmedNewPasswordError: ''
			});
	};

	isValidAllFields = () => isValidPassword(this.state.newPassword) &&
		isValidWhiteSpace(this.state.newPassword) &&
		isValidWhiteSpace(this.state.oldPassword) &&
		(this.state.newPassword !== this.state.oldPassword);

	onPasswordSubmit = () => {
		this.validateOldPassword(this.state.oldPassword);
		this.validateNewPassword(this.state.newPassword);
		this.validateConfirmedNewPassword(this.state.confirmedNewPassword);

		if (!this.isValidAllFields())
			return;

		this.trySetLoadings();

		apiPost(CHANGE_USER_PASSWORD_URL, this.createChangePasswordModel(), ({response}) => {
			if (response.status === 400 && response.data === 'Incorrect password')
				this.setState({
					isValidOldPassword: false,
					oldPasswordError: 'Невірний пароль',
					isLoading: false,
					isLoaded: true
				});
			else alert(`Error: ${response.data}`);
		})
			.then(resp => {
				if (resp.status === 200 && resp.data === 'Success')
					this.setState({
						isShowSuccessChangedPasswordModal: true,
						oldPassword: '',
						newPassword: '',
						confirmedNewPassword: '',
						isLoading: false,
						isLoaded: true
					});
			})
			.catch(() => {
				this.setState({
					isLoading: false,
					isLoaded: true
				});
			});
	};

	onChangeOldPass = e => {
		this.setState({oldPassword: e.target.value});
		this.validateOldPassword(e.target.value);
	};

	onChangeNewPassword = e => {
		this.setState({newPassword: e.target.value});
		this.validateNewPassword(e.target.value)
	};

	onChangeConfirmedNewPassword = e => {
		this.setState({confirmedNewPassword: e.target.value});
		this.validateConfirmedNewPassword(e.target.value);
	};

	onCloseSuccessChangedPasswordModal = () => this.setState({isShowSuccessChangedPasswordModal: false});

	renderError = text => <small className="invalid-small">{text}</small>;

	renderSuccessChangedPasswordModal = () => <SuccessChangedPasswordModal
		isOpen={this.state.isShowSuccessChangedPasswordModal}
		onClose={this.onCloseSuccessChangedPasswordModal}/>;

	renderChangePasswordForm = () => {
		return (
			<div className="cp-container__form">
				<div className="form-group">
					<label htmlFor="inputOldPas">Старий пароль</label>
					<input className={`form-control ${!this.state.isValidOldPassword && 'invalid-input'}`}
						   onChange={this.onChangeOldPass}
						   value={this.state.oldPassword}
						   type="password"
						   id="inputOldPas"
						   placeholder="Введіть старий пароль"/>
					{!this.state.isValidOldPassword && this.renderError(this.state.oldPasswordError)}
				</div>
				<div className="form-group">
					<label htmlFor="inputNewPas">Новий пароль</label>
					<input className={`form-control ${!this.state.isValidNewPassword && 'invalid-input'}`}
						   onChange={this.onChangeNewPassword}
						   value={this.state.newPassword}
						   type="password"
						   id="inputNewPas"
						   placeholder="Введіть новий пароль"/>
					{!this.state.isValidNewPassword && this.renderError(this.state.newPasswordError)}
				</div>
				<div className="form-group">
					<label htmlFor="inputConfirmNewPas">Повторіть пароль</label>
					<input className={`form-control ${!this.state.isValidConfirmedNewPassword && 'invalid-input'}`}
						   onChange={this.onChangeConfirmedNewPassword}
						   value={this.state.confirmedNewPassword}
						   type="password"
						   id="inputConfirmNewPas"
						   placeholder="Повторіть старий пароль"/>
					{!this.state.isValidConfirmedNewPassword && this.renderError(this.state.confirmedNewPasswordError)}
				</div>
				<button className="btn btn-info" onClick={this.onPasswordSubmit}>Змінити</button>
			</div>
		)
	};

	render() {
		return (
			<div className="cp-container">
				{this.renderSuccessChangedPasswordModal()}
				<div className="cp-container__header">Зміна паролю</div>
				{this.state.isLoaded && !this.state.isLoading ? this.renderChangePasswordForm() : <Spinner/>}
			</div>
		)
	}
}

export default ChangePassword;