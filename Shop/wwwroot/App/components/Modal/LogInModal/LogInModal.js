import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";
import './LogInModal.scss';
import {logInToken} from "../../../services/authService";

class LogInModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			password: ''
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

	onLogin = () => {
		logInToken(this.state.userName, this.state.password);
	};

	render() {
		return (
			<Modal isOpen={this.props.isModalOpen}
				   onRequestClose={this.closeModal}
				   style={customStyles}>
				<div className="form-container">
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email або логін</label>
						<input type="text"
							   className="form-control"
							   id="exampleInputEmail1"
							   aria-describedby="emailHelp"
							   placeholder="Введіть email"
							   onChange={this.onChangeUserName}/>
						<small id="emailHelp" className="form-text text-muted">We'll never share your email with
							anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Пароль</label>
						<input type="password"
							   className="form-control"
							   id="exampleInputPassword1"
							   placeholder="Введіть пароль..."
							   onChange={this.onChangePassword}/>
					</div>
					<div className="form-check">
						<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
						<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
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