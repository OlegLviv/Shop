import React from 'react';
import './LogIn.scss'
import {logInToken} from "../../services/authService";
import {normalizeLogInResponse} from "../../utils/responseUtils";

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: '',
			isValidUserName: true,
			isValidPassword: true,
			userNameError: '',
			passwordError: ''
		}
	}

	onChangeUserName = ({target}) => this.setState({userName: target.value});

	onChangePassword = ({target}) => this.setState({password: target.value});

	onLogin = e => {
		e.preventDefault();
		logInToken(this.state.userName, this.state.password)
			.catch(err => {
				console.log('err', err);
				normalizeLogInResponse(err.response, userName => {
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
					});
			})
	};

	renderError = text => <small className="form-text text-muted invalid-small">{text}</small>;

	render() {
		return (
			<div className="log-cont">
				<div className="log-cont__header">
					<h3>Вхід</h3>
					<hr/>
				</div>
				<form onSubmit={this.onLogin} method="">
					<div className="form-group">
						<label htmlFor="Email">Email або логін</label>
						<input type="text" className={`form-control ${!this.state.isValidUserName && 'invalid-input'}`}
							   id="Email"
							   aria-describedby="emailHelp" placeholder="Введіть email або логін"
							   value={this.state.userName}
							   onChange={this.onChangeUserName}/>
						{!this.state.isValidUserName && this.renderError(this.state.userNameError)}
					</div>
					<div className="form-group">
						<label htmlFor="password">Пароль</label>
						<input type="password"
							   className={`form-control ${!this.state.isValidPassword && 'invalid-input'}`}
							   id="password"
							   placeholder="Введіть пароль..."
							   value={this.state.password}
							   onChange={this.onChangePassword}/>
						{!this.state.isValidPassword && this.renderError(this.state.passwordError)}
					</div>
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
						<label className="form-check-label" htmlFor="exampleCheck1">Запам'ятати</label>
					</div>
					<button type="submit" className="btn btn-primary">Увійти</button>
				</form>
			</div>
		);
	}
}

export default LogIn;