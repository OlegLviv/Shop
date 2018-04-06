import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";
import './RegisterModal.scss';
import {registerUser} from "../../../services/authService";
import SuccessRegisterModal from './SuccessRegisterModal';
import './Modal.scss';
import {isValidPassword, isValidWhiteSpace, isValidEmail, isValidNameAndLastName} from "../../../utils/validationUtils";

class RegisterModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			lastName: '',
			email: '',
			userName: '',
			password: '',
			confirmPassword: '',
			isShowSuccessModal: false,
			isValidName: true,
			isValidLastName: true,
			isValidEmail: true,
			isValidUserName: true,
			isValidPassword: true,
			isValidConfirmPassword: true,
			nameError: '',
			lastNameError: '',
			emailError: '',
			userNameError: '',
			passwordError: '',
			confirmPasswordError: ''
		}
	}

	closeModal = () => {
		this.props.closeModal();
	};

	onRegisterUser = () => {
		// TODO need normal validate
		const registerModel = {
			name: this.state.name,
			lastName: this.state.lastName,
			email: this.state.email,
			userName: this.state.userName,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		registerUser(registerModel)
			.then(resp => {
				const {isSuccess} = resp.data;
				if (isSuccess) {
					this.setState({isShowSuccessModal: true});
					this.closeModal();
				}
			})
			.catch(err => {
				if (err.response.status === 400) {
					// TODO need to add normal alert if invalid model
					alert('Invalid model');
					console.log(err.response);
				}
			});
		console.log('register model--', registerModel);
	};

	closeSuccessRegisterModal = () => {
		this.setState({isShowSuccessModal: false});
	};

	onChangeName = (e) => {
		this.setState({name: e.target.value});
	};

	onChangeLastName = (e) => {
		this.setState({lastName: e.target.value});
	};

	onChangeEmail = (e) => {
		this.setState({email: e.target.value});
	};

	onChangeUserName = (e) => {
		this.setState({userName: e.target.value});
	};

	onChangePassword = (e) => {
		this.setState({password: e.target.value});
	};

	onChangeConfirmPassword = (e) => {
		this.setState({confirmPassword: e.target.value});
	};

	onBlurName = () => {
		if (!isValidNameAndLastName(this.state.name)) {
			this.setState({
				nameError: 'Поле не може містити пробіли або бути пустим. Довжина не більше 20 символів',
				isValidName: false
			})
		}
		if (isValidNameAndLastName(this.state.name)) {
			this.setState({isValidName: true});
		}
	};

	onBlurLastName = () => {
		if (!isValidNameAndLastName(this.state.lastName)) {
			this.setState({
				lastNameError: 'Поле не може містити пробіли або бути пустим. Довжина не більше 20 символів',
				isValidLastName: false
			});
		}
		if (isValidNameAndLastName(this.state.lastName)) {
			this.setState({isValidLastName: true});
		}
	};

	onBlurEmail = () => {
		if (!isValidEmail(this.state.email)) {
			this.setState({
				emailError: 'Некоректний email',
				isValidEmail: false
			});
		}
		if (isValidEmail(this.state.email)) {
			this.setState({isValidEmail: true});
		}
	};

	onBlurUserName = () => {
		if (!isValidWhiteSpace(this.state.userName)) {
			this.setState({
				userNameError: 'Поле не може містити пробіли або бути пустим.',
				isValidUserName: false
			});
		}
		if (isValidWhiteSpace(this.state.userName)) {
			this.setState({isValidUserName: true});
		}
	};

	onBlurPassword = () => {
		if (!isValidPassword(this.state.password)) {
			this.setState({
				passwordError: 'Некоректний пароль. Пароль повинен містити хоча б один символ верхнього регістру і довжина від 6 до 20 символів',
				isValidPassword: false
			});
		}
		if (isValidPassword(this.state.password)) {
			this.setState({isValidPassword: true});
		}
	};

	onBlurConfirmPassword = () => {
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({
				confirmPasswordError: 'Паролі не співпадають',
				isValidConfirmPassword: false
			});
		}
		if (this.state.password === this.state.confirmPassword) {
			this.setState({isValidConfirmPassword: true});
		}
	};

	renderError = (text) => <small id="emailHelp"
								   className="form-text text-muted invalid-small">{text}</small>;

	render() {
		const {isShowSuccessModal} = this.state;
		return (
			<div>
				{!isShowSuccessModal ? <Modal isOpen={this.props.isModalOpen}
											  onRequestClose={this.closeModal}
											  style={customStyles}
											  shouldCloseOnEsc={true}>
					<div className="text-center">
						<h3>Реєстрація</h3>
					</div>
					<hr/>
					<div className="form-container">
						<div className="form-group">
							<label htmlFor="inputName">Ім'я</label>
							<input type="text"
								   className={`form-control ${this.state.isValidName ? '' : 'invalid-input'}`}
								   id="inputName"
								   placeholder="Введіть своє ім'я"
								   onChange={this.onChangeName}
								   onBlur={this.onBlurName}/>
							{!this.state.isValidName && this.renderError(this.state.nameError)}
						</div>
						<div className="form-group">
							<label htmlFor="inputLastName">Прізвище</label>
							<input type="text"
								   className={`form-control ${this.state.isValidLastName ? '' : 'invalid-input'}`}
								   id="inputLastName"
								   placeholder="Введіть своє прізвище"
								   onChange={this.onChangeLastName}
								   onBlur={this.onBlurLastName}/>
							{!this.state.isValidLastName && this.renderError(this.state.lastNameError)}
						</div>
						<div className="form-group">
							<label htmlFor="inputEmail">Email</label>
							<input type="email"
								   className={`form-control ${this.state.isValidEmail ? '' : 'invalid-input'}`}
								   id="inputEmail"
								   aria-describedby="emailHelp"
								   placeholder="Введіть email"
								   onChange={this.onChangeEmail}
								   onBlur={this.onBlurEmail}/>
							{!this.state.isValidEmail && this.renderError(this.state.emailError)}
						</div>
						<div className="form-group">
							<label htmlFor="inputUserName">Логін</label>
							<input type="text"
								   className={`form-control ${this.state.isValidUserName ? '' : 'invalid-input'}`}
								   id="inputUserName"
								   aria-describedby="emailHelp"
								   placeholder="Введіть логін"
								   onChange={this.onChangeUserName}
								   onBlur={this.onBlurUserName}/>
							{!this.state.isValidUserName && this.renderError(this.state.userNameError)}
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword">Пароль</label>
							<input type="password"
								   className={`form-control ${this.state.isValidPassword ? '' : 'invalid-input'}`}
								   id="inputPassword"
								   placeholder="Введіть пароль..."
								   onChange={this.onChangePassword}
								   onBlur={this.onBlurPassword}/>
							{!this.state.isValidPassword && this.renderError(this.state.passwordError)}
						</div>
						<div className="form-group">
							<label htmlFor="inputConfirmPassword">Повторіть пароль</label>
							<input type="password"
								   className={`form-control ${this.state.isValidConfirmPassword ? '' : 'invalid-input'}`}
								   id="inputConfirmPassword"
								   placeholder="Введіть пароль ще раз..."
								   onChange={this.onChangeConfirmPassword}
								   onBlur={this.onBlurConfirmPassword}/>
							{!this.state.isValidConfirmPassword && this.renderError(this.state.confirmPasswordError)}
						</div>
						<div className="form-container__footer">
							<button type="submit" className="btn btn-primary"
									disabled
									onClick={this.onRegisterUser}>Зареєструватись
							</button>
							<button className="btn btn-danger" onClick={this.closeModal}>Закрити</button>
						</div>
					</div>
				</Modal> : <SuccessRegisterModal closeModal={this.closeSuccessRegisterModal}/>}
			</div>
		);
	}
}

export default RegisterModal;