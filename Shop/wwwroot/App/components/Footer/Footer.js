import React from 'react';
import './Footer.scss';
import {Icon} from 'react-fa';
import {SuccessSubscribedModal} from "./SuccessSubscribedModal";
import {apiWithoutRedirect} from "../../services/api";
import {SUBSCRIBE_EMAIL_TO_MAILING_URL} from "../../services/urls/mailingUrls";
import {isValidEmail} from "../../utils/validationUtils";

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowSuccessSubscribedModal: false,
			emailToSubscribe: '',
			isValidEmail: true
		}
	}

	validateEmail = (value, validAction) => {
		if (!isValidEmail(value)) {
			this.setState({isValidEmail: false});
			return;
		}
		if (isValidEmail(value)) {
			this.setState({isValidEmail: true});
			validAction && validAction();
		}
	};

	onCloseSuccessSubscribedModal = () => this.setState({isShowSuccessSubscribedModal: false});


	//	todo need catch if email is exist error
	onSubscribeMailingClick = () => {
		this.validateEmail(this.state.emailToSubscribe,
			() => {
				apiWithoutRedirect()
					.post(SUBSCRIBE_EMAIL_TO_MAILING_URL, {email: this.state.emailToSubscribe})
					.then(resp => {
						if (resp.data === 'Success' && resp.status === 200)
							this.setState({isShowSuccessSubscribedModal: true});
					})
					.catch(err => alert(`Error: ${JSON.stringify(err.response.data)}`));
			});
	};

	onChangeEmailToSubscribe = ({target}) => {
		this.validateEmail(target.value);
		this.setState({emailToSubscribe: target.value});
	};

	renderSuccessSubscribedModal = () => <SuccessSubscribedModal isOpen={this.state.isShowSuccessSubscribedModal}
																 onClose={this.onCloseSuccessSubscribedModal}/>;

	renderInvalidEmailMessage = () => <small id="emailHelp" className="form-text text-muted invalid-small">Некоректний
		email</small>;

	render() {
		const {isValidEmail, emailToSubscribe} = this.state;
		return (
			<div className="footer-cont">
				{this.renderSuccessSubscribedModal()}
				<div className="footer-cont__main">
					<div className="footer-cont__main__contacts">
						<div className="footer-cont__main__contacts__main-text">Контакти:</div>
						<div className="footer-cont__main__contacts__contact">
							<Icon name="phone"/>
							<div>+38054643345</div>
						</div>
						<div className="footer-cont__main__contacts__contact">
							<Icon name="phone"/>
							<div>+38054643345</div>
						</div>
						<div className="footer-cont__main__contacts__contact">
							<Icon name="phone"/>
							<div>+38054643345</div>
						</div>
					</div>
					<div className="footer-cont__main__contacts">
						<div className="footer-cont__main__contacts__contact">
							<Icon name="envelope"/>
							<div>site@gmail.com</div>
						</div>
						<div className="footer-cont__main__contacts__contact">
							<Icon name="home"/>
							<div>Lviv, Address 22a</div>
						</div>
					</div>
					<div className="footer-cont__main__mailing">
						<div className="footer-cont__main__mailing__text">Підпишіться на розсилку новинок та акційних
							пропозицій
						</div>
						<div className="input-group mb-3">
							<input type="text" className={`form-control ${!isValidEmail && 'invalid-input'}`}
								   placeholder="Введіть свій Email"
								   value={emailToSubscribe}
								   onChange={this.onChangeEmailToSubscribe}/>
							<div className="input-group-append">
								<button className={`btn btn-outline-${isValidEmail ? 'secondary' : 'danger'}`}
										type="button"
										onClick={this.onSubscribeMailingClick}
										disabled={!isValidEmail}>Підписатись
								</button>
							</div>
						</div>
						{!isValidEmail && this.renderInvalidEmailMessage()}
					</div>
				</div>
				<div className="footer-cont__sub-footer">
					<div className="footer-cont__sub-footer__text">Інтернет магазин канцтоварів Name © 2018 Всі права
						захищені
					</div>
					<div className="footer-cont__sub-footer__text">Створення сайту:
						<a href="https://vk.com/id105586528">{' Oleh Kokhan'}</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer;