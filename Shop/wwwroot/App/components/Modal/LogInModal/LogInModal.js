import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";
import './LogInModal.scss';
import {logInToken} from "../../../services/authService";
import {isValidWhiteSpace} from "../../../utils/validationUtils";
import {normalizeLogInResponse} from "../../../utils/responseUtils";

class LogInModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			isValidUserName: true,
			isValidPassword: true,
			userNameError: '',
			passwordError: ''
		};
	}

	closeModal = () => {
		this.props.closeModal();
	};

	onChangeUserName = (event) => {
		this.setState({userName: event.target.value});
	};

	onChangePassword = (event) => {
		this.setState({password: event.target.value});
	};

	onPasswordKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.onLogin(e.key);
		}
	};

	// todo need fix onEnter click
	onLogin = (key) => {

		if (key === 'Enter') {
			this.onUserNameBlur();
			this.onPasswordBlur();
		}

		if (isValidWhiteSpace(this.state.userName) && isValidWhiteSpace(this.state.password)) {
			logInToken(this.state.userName, this.state.password)
				.catch(error => {
					normalizeLogInResponse(error.response, userName => {
							this.setState({
								userNameError: userName,
								isValidUserName: false
							});
						},
						password => {
							this.setState({
								passwordError: password,
								isValidPassword: false
							})
						})
				})
		}
	};

	onUserNameBlur = () => {
		if (!isValidWhiteSpace(this.state.userName)) {
			this.setState({
				isValidUserName: false,
				userNameError: 'Поле не може бути пустим або містити пробіли'
			})
		}
		if (isValidWhiteSpace(this.state.userName) && !this.state.isValidUserName) {
			this.setState({isValidUserName: true})
		}
	};

	onUserNameKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.onLogin(e.key);
		}
	};

	onPasswordBlur = () => {
		if (!isValidWhiteSpace(this.state.password)) {
			this.setState({
				isValidPassword: false,
				passwordError: 'Поле не може бути пустим або містити пробіли'
			})
		}
		if (isValidWhiteSpace(this.state.password) && !this.state.isValidPassword) {
			this.setState({isValidPassword: true})
		}
	};

	renderError = (text) => <small id="emailHelp"
								   className="form-text text-muted invalid-small">{text}</small>;

	render() {
		return (
			<Modal isOpen={this.props.isModalOpen}
				   onRequestClose={this.closeModal}
				   shouldCloseOnEsc={true}
				   style={customStyles}>
				<div className="form-container">
					<h3 className="text-center">Вхід</h3>
					<hr/>
					<div className="form-group">
						<label htmlFor="inputEmail">Email або логін</label>
						<input type="text"
							   className={`form-control ${this.state.isValidUserName ? '' : 'invalid-input'}`}
							   id="inputEmail"
							   aria-describedby="emailHelp"
							   placeholder="Введіть email або логін"
							   onChange={this.onChangeUserName}
							   onBlur={this.onUserNameBlur}
							   onKeyPress={this.onUserNameKeyPress}/>
						{!this.state.isValidUserName && this.renderError(this.state.userNameError)}
					</div>
					<div className="form-group">
						<label htmlFor="inputPassword">Пароль</label>
						<input type="password"
							   className={`form-control ${this.state.isValidPassword ? '' : 'invalid-input'}`}
							   id="inputPassword"
							   placeholder="Введіть пароль..."
							   onChange={this.onChangePassword}
							   onKeyPress={this.onPasswordKeyPress}
							   onBlur={this.onPasswordBlur}/>
						{!this.state.isValidPassword && this.renderError(this.state.passwordError)}
					</div>
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
						<label className="form-check-label" htmlFor="exampleCheck1">Запам'ятати</label>
					</div>
					<div className="form-container__footer">
						<button
							className="btn btn-primary"
							onClick={this.onLogin}>Увійти
						</button>
						<button className="btn btn-danger" onClick={this.closeModal}>Закрити</button>
					</div>
				</div>
			</Modal>
		)
	}
}

export default LogInModal;