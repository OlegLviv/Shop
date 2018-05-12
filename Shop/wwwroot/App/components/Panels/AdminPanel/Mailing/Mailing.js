import React from 'react';
import './Mailing.scss';
import {isValidMailingSubject, isValidMailingBody} from "../../../../utils/validationUtils";
import {apiPost} from "../../../../services/api";
import {SEND_MAIL_URL} from "../../../../services/urls/mailingUrls";
import {SuccessSentModal} from "./SuccessSentModal";
import {Spinner} from "../../../Spinner/Spinner";

const getSendBody = ({subject, body, isForOnlyRegisteredUsers}) => ({
	subject: subject,
	body: body,
	isForOnlyRegisterUsers: isForOnlyRegisteredUsers
});

class Mailing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subject: '',
			body: '',
			isLoading: false,
			isValidBody: true,
			isValidSubject: true,
			isForOnlyRegisteredUsers: false,
			isShowSuccessSentModal: false
		}
	}

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	validateSubject = subject => {
		if (!isValidMailingSubject(subject)) {
			this.setState({isValidSubject: false});
			return;
		}
		if (isValidMailingSubject(subject) && !this.state.isValidSubject)
			this.setState({isValidSubject: true});
	};

	validateBody = body => {
		if (!isValidMailingBody(body)) {
			this.setState({isValidBody: false});
			return;
		}
		if (isValidMailingBody(body) && !this.state.isValidBody)
			this.setState({isValidBody: true});
	};

	validateAllFields = successValidAction => {
		if (!isValidMailingSubject(this.state.subject)) {
			this.setState({isValidSubject: false});
		}
		if (!isValidMailingBody(this.state.body)) {
			this.setState({isValidBody: false});
		}
		if (isValidMailingSubject(this.state.subject) && isValidMailingBody(this.state.body) && successValidAction)
			successValidAction();
	};

	onChangeSubject = ({target}) => {
		this.validateSubject(target.value);
		this.setState({subject: target.value});
	};

	onChangeBody = ({target}) => {
		this.validateBody(target.value);
		this.setState({body: target.value});
	};

	onSendClick = () => {
		this.validateAllFields(() => {
			this.trySetLoading();
			apiPost(SEND_MAIL_URL, getSendBody(this.state))
				.then(resp => {
					if (resp.data === 'Success' && resp.status === 200)
						this.setState({
							isLoading: false,
							isShowSuccessSentModal: true,
							subject: '',
							body: ''
						});
				})
				.catch(err => {
					alert(`Error: ${err}`);
					this.setState({isLoading: false});
				});
		})
	};

	onCloseSuccessSentModal = () => this.setState({isShowSuccessSentModal: false});

	renderError = text => <small className="invalid-small">{text}</small>;

	renderSuccessSentModal = () => <SuccessSentModal isOpen={this.state.isShowSuccessSentModal}
													 onClose={this.onCloseSuccessSentModal}/>;

	renderMainForm = () => {
		const {isValidBody, isValidSubject, isForOnlyRegisteredUsers} = this.state;
		return (
			<div className="mailing-cont__form">
				<div className="form-group">
					<label htmlFor="inputSubject">Тема</label>
					<input className={`form-control ${!isValidSubject && 'invalid-input'}`}
						   id="inputSubject"
						   placeholder="Введіть тему"
						   onChange={this.onChangeSubject}
						   value={this.state.subject}/>
					{!isValidSubject && this.renderError('Полен не може бути пустим. Мінімальна довжина символів 4, максимальна 64')}
				</div>
				<div className="form-group">
					<label htmlFor="inputBody">Повідомлення</label>
					<textarea className={`form-control ${!isValidBody && 'invalid-input'}`}
							  id="inputBody"
							  placeholder="Введіть повідомлення"
							  onChange={this.onChangeBody}
							  value={this.state.body}/>
					{!isValidBody && this.renderError('Полен не може бути пустим. Мінімальна довжина символів 16, максимальна 512')}
				</div>
				<div className="mailing-cont__form__check">
					<input type="checkbox" checked={isForOnlyRegisteredUsers}
						   onChange={({target}) => this.setState({isForOnlyRegisteredUsers: target.checked})}/>
					<div>Тільки для зареєстрованих користувачів</div>
				</div>
				<button className="btn btn-info"
						onClick={this.onSendClick}>Відправити
				</button>
			</div>
		);
	};

	render() {
		return (
			<div className="mailing-cont">
				{this.renderSuccessSentModal()}
				<div className="mailing-cont__header">Розсилки</div>
				{!this.state.isLoading ? this.renderMainForm() : <Spinner/>}
			</div>
		)
	}
}

export default Mailing;