import React from 'react';
import Modal from 'react-modal';
import {customStyles} from "../modalStyles";
import './RegisterModal.scss';
import {registerUser} from "../../../services/authService";
import SuccessRegisterModal from './SuccessRegisterModal';
import './Modal.scss';

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
			isShowSuccessModal: false
		}
	}

	closeModal = () => {
		this.props.closeModal();
	};

	registerUser = () => {
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
								   className="form-control"
								   id="inputName"
								   placeholder="Введіть своє ім'я"
								   onChange={this.onChangeName}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputLastName">Прізвище</label>
							<input type="text"
								   className="form-control"
								   id="inputLastName"
								   placeholder="Введіть свою фамілію"
								   onChange={this.onChangeLastName}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputEmail">Email</label>
							<input type="email"
								   className="form-control"
								   id="inputEmail"
								   aria-describedby="emailHelp"
								   placeholder="Введіть email"
								   onChange={this.onChangeEmail}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputUserName">Логін</label>
							<input type="text"
								   className="form-control"
								   id="inputUserName"
								   aria-describedby="emailHelp"
								   placeholder="Введіть логін"
								   onChange={this.onChangeUserName}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword">Пароль</label>
							<input type="password"
								   className="form-control"
								   id="inputPassword"
								   placeholder="Введіть пароль..."
								   onChange={this.onChangePassword}/>
						</div>
						<div className="form-group">
							<label htmlFor="inputConfirmPassword">Повторіть пароль</label>
							<input type="password"
								   className="form-control"
								   id="inputConfirmPassword"
								   placeholder="Введіть пароль ще раз..."
								   onChange={this.onChangeConfirmPassword}/>
						</div>
						<div className="form-container__footer">
							<button type="submit" className="btn btn-primary"
									disabled
									onClick={this.registerUser}>Зареєструватись
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