import React, {Component} from 'react';
import './Mailing.scss';
import {apiGet, apiPost} from "../../../../services/api";
import {GET_USER_INFO_URL} from "../../../../services/urls/userUrls";
import {Spinner} from "../../../Spinner/Spinner";
import {SUBSCRIBE_EMAIL_TO_MAILING_URL} from "../../../../services/urls/mailingUrls";
import {UNSUBSCRIBE_USER} from "../../../../services/urls/mailingUrls";
import {SuccessSubscribeModal} from "./SuccessSubscribeModal";
import {SuccessUnsubscribeModal} from "./SuccessUnsubscribeModal";

const getUserToSubscribe = ({user}) => ({
	email: user.email
});

class Mailing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isShowSuccessUnsubscribeModal: false,
			isShowSuccessSubscribeModal: false,
			user: null
		}
	}

	componentDidMount() {
		this.trySetLoading();
		this.updateUserState();
	}

	componentWillUpdate(nextProps, {user}) {
		if (this.state.user && user && user.isSubscribedToMailing !== this.state.user.isSubscribedToMailing) {
			this.trySetLoading();
			this.updateUserState();
		}
	}

	updateUserState = () => {
		apiGet(GET_USER_INFO_URL)
			.then(resp => {
				this.setState({
					user: resp.data,
					isLoading: false,
				});
			})
			.catch(err => {
				this.setState({isLoading: false});
				alert(`Error: ${err}`);
			});
	};

	trySetLoading = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
	};

	onSubscribeToMailingClick = () => {
		this.trySetLoading();

		apiPost(SUBSCRIBE_EMAIL_TO_MAILING_URL, getUserToSubscribe(this.state))
			.then(resp => {
				if (resp.data === 'Success' && resp.status === 200)
					this.setState({
						isLoading: false,
						isShowSuccessSubscribeModal: true
					});
				this.updateUserState();
			})
			.catch(err => {
				this.setState({isLoading: false});
				alert(`Error: ${err}`);
			});
	};

	onUnSubscribeToMailingClick = () => {
		this.trySetLoading();

		apiPost(UNSUBSCRIBE_USER)
			.then(resp => {
				if (resp.data === 'Success' && resp.status === 200) {
					this.setState({
						isLoading: false,
						isShowSuccessUnsubscribeModal: true
					});
					this.updateUserState();
				}
			})
			.catch(err => {
				this.setState({isLoading: false});
				alert(`Error: ${err}`);
			});
	};

	renderUnsubscribeForm = () => {
		return (
			<div className="mailing-cont__sub-form">
				<label>Ви підписані на розсилку</label>
				<br/>
				<button className="btn btn-danger"
						onClick={this.onUnSubscribeToMailingClick}>Відписатись
				</button>
			</div>
		)
	};

	renderSubscribeForm = () => {
		return (
			<div className="mailing-cont__sub-form">
				<label>Ви ще не підписані на розсилку новинок та акційних пропозицій</label>
				<div className="input-group mb-3 mailing-cont__sub-form__box">
					<input type="text" className="form-control" value={this.state.user.email} readOnly/>
					<div className="input-group-append">
						<button className="btn btn-outline-info"
								onClick={this.onSubscribeToMailingClick}>Підписатись
						</button>
					</div>
				</div>
			</div>
		)
	};

	renderForm = () => {
		const {isLoading, user} = this.state;

		if (!isLoading && user && user.isSubscribedToMailing)
			return this.renderUnsubscribeForm();
		if (!isLoading && user && !user.isSubscribedToMailing)
			return this.renderSubscribeForm();
		if (isLoading)
			return <Spinner/>;
	};

	renderSuccessSubscribeModal = () => <SuccessSubscribeModal isOpen={this.state.isShowSuccessSubscribeModal}
															   onClose={() => this.setState({isShowSuccessSubscribeModal: false})}/>;
	renderSuccessUnsubscribeModal = () => <SuccessUnsubscribeModal isOpen={this.state.isShowSuccessUnsubscribeModal}
																   onClose={() => this.setState({isShowSuccessUnsubscribeModal: false})}/>;

	render() {
		return (
			<div className="mailing-cont">
				{this.renderSuccessSubscribeModal()}
				{this.renderSuccessUnsubscribeModal()}
				<div className="mailing-cont__header">Розсилки</div>
				{this.renderForm()}
			</div>
		)
	}
}

export default Mailing;