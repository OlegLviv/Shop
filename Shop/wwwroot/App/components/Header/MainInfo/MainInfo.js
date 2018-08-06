import React from 'react';
import {Link} from 'react-router-dom';
import RegisterModal from '../../Modal/RegisterModal/RegisterModal';
import LogInModal from '../../Modal/LogInModal/LogInModal';
import './MainInfo.scss';
import {apiPost, apiWithoutRedirect} from "../../../services/api";
import {GET_USER_INFO_URL} from "../../../services/urls/userUrls";
import {singOutToken} from "../../../services/authService";
import CallMeModal from '../../Modal/CallMeModal/CallMeModal';
import {CREATE_CALL_ME} from "../../../services/urls/orderUrls";
import {SuccessDispatchedCallMeModal} from '../../Modal/CallMeModal/SuccessDispatchedCallMeModal';

class MainInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoginModalOpen: false,
			isRegisterModalOpen: false,
			userName: '',
			isCallMeModalOpen: false,
			loading: false,
			isOpenSuccessDispatchedCallMeModal: false
		}
	}

	componentDidMount() {
		apiWithoutRedirect()
			.get(GET_USER_INFO_URL)
			.then(resp => {
				if (resp.data.userName) {
					this.props.onLogIn(resp.data);
					this.setState({userName: resp.data.userName});
				}
			})
			.catch(err => {
				// TODO	add in future
				// if (err.response.status === 401) {
				//     this.setState({isLogIn: false})
				// }
			});
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	singOut = () => {
		singOutToken(() => {
			this.setState({userName: null, isLogIn: false});
		});
	};

	openLoginModal = () => {
		this.setState({isLoginModalOpen: true});
	};

	openRegisterModal = () => {
		this.setState({isRegisterModalOpen: true});
	};

	closeLoginModal = () => {
		this.setState({isLoginModalOpen: false});
	};

	closeRegisterModal = () => {
		this.setState({isRegisterModalOpen: false});
	};

	onCallMeClick = () => this.setState({isCallMeModalOpen: true});

	onDispatchCallMe = model => {
		this.trySetLoading();

		apiPost(CREATE_CALL_ME, model)
			.then(resp => {
				if (resp.status === 200 && resp.data === 'Success') {
					this.setState({
						loading: false,
						isOpenSuccessDispatchedCallMeModal: true
					});
					this.onCloseCallMe();
				}
			})
			.catch(() => {
				this.setState({
					loading: false
				});
				alert(`Error`);
			});
	};

	onCloseCallMe = () => this.setState({isCallMeModalOpen: false});

	renderCallMeModal = () => <CallMeModal isOpen={this.state.isCallMeModalOpen}
										   onDispatch={this.onDispatchCallMe}
										   onClose={this.onCloseCallMe}
										   loading={this.state.loading}/>;

	renderSuccessDispatchedCallMeModal = () => <SuccessDispatchedCallMeModal
		isOpen={this.state.isOpenSuccessDispatchedCallMeModal}
		onClose={() => this.setState({isOpenSuccessDispatchedCallMeModal: false})}/>;

	render() {
		const {userName} = this.state;

		return (
			<div className="info_container row">
				{this.renderCallMeModal()}
				{this.renderSuccessDispatchedCallMeModal()}
				<div className="info_container__left col-xl-4 col-lg-12">
					<Link to="/aboutCompany">Про компанію</Link>
					<Link to="/deliveryAndPay">Доставка та оплата</Link>
					<Link to="/contacts">Контакти</Link>
				</div>
				<div className="col-xl-3 col-lg-1"/>
				<div className="info_container__right col-xl-5 col-lg-12">
					<div className="info_container__right__menu-item">
						<div className="info_container__right__menu-item__sub-menu">
							+380966809947
						</div>
						<div className="info_container__right__menu-item__sub-menu btn btn-outline-dark"
							 onClick={this.onCallMeClick}>
							<div>Зателефонуй мені</div>
						</div>
					</div>
					<div className="info_container__right__menu-item">
						{!userName ? <div>
							<button className="btn btn-outline-light" onClick={this.openLoginModal}>Вхід</button>
							<button className="btn btn-outline-light" onClick={this.openRegisterModal}>
								Реєстрація
							</button>
						</div> : <div className="info_container__right__menu-item__sub">
							<Link className="btn btn-outline-light"
								  to={`/${userName === 'Admin' ? 'adminPanel/action-on-products' : 'userPanel/change-password'}`}>{userName}</Link>
							<button className="btn btn-danger info_container__right__menu-item__sub__exit"
									onClick={this.singOut}>
								Вийти
							</button>
						</div>}
						<LogInModal
							isModalOpen={this.state.isLoginModalOpen}
							onCloseModal={this.closeLoginModal}/>
						<RegisterModal
							isModalOpen={this.state.isRegisterModalOpen}
							onCloseModal={this.closeRegisterModal}/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainInfo;