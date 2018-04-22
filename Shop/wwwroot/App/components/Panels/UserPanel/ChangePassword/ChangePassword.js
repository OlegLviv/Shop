import React from 'react';
import './ChangePassword.scss';
import {apiPost} from "../../../../services/api";
import {CHANGE_USER_PASSWORD} from "../../../../services/urls/userUrls";

//	todo need to add validation
class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmedNewPassword: ''
		}
	}

	createChangePasswordModel = () => ({
		oldPassword: this.state.oldPassword,
		newPassword: this.state.newPassword
	});

	onPasswordSubmit = () => {
		apiPost(CHANGE_USER_PASSWORD, this.createChangePasswordModel())
			.then(resp => console.log(resp));
	};

	onChangeOldPass = e => {
		this.setState({oldPassword: e.target.value});
	};

	onChangeNewPassword = e => {
		this.setState({newPassword: e.target.value});
	};

	onChangeConfirmedNewPassword = e => {
		this.setState({confirmedNewPassword: e.target.value});
	};

	render() {
		return (
			<div className="cp-container">
				<div className="cp-container__header">Зміна паролю</div>
				<div className="cp-container__form">
					<div className="form-group">
						<label htmlFor="inputOldPas">Старий пароль</label>
						<input className="form-control"
							   onChange={this.onChangeOldPass}
							   value={this.state.oldPassword}
							   type="password"
							   id="inputOldPas"
							   placeholder="Введіть старий пароль"/>
					</div>
					<div className="form-group">
						<label htmlFor="inputNewPas">Новий пароль</label>
						<input className="form-control"
							   onChange={this.onChangeNewPassword}
							   value={this.state.newPassword}
							   type="password"
							   id="inputNewPas"
							   placeholder="Введіть новий пароль"/>
					</div>
					<div className="form-group">
						<label htmlFor="inputConfirmNewPas">Повторіть пароль</label>
						<input className="form-control"
							   onChange={this.onChangeConfirmedNewPassword}
							   value={this.state.confirmedNewPassword}
							   type="password"
							   id="inputConfirmNewPas"
							   placeholder="Повторіть старий пароль"/>
					</div>
					<button className="btn btn-info" onClick={this.onPasswordSubmit}>Змінити</button>
				</div>
			</div>
		)
	}
}

export default ChangePassword;