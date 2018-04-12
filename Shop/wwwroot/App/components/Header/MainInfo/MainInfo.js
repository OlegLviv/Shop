import React from 'react';
import {Link} from 'react-router-dom';
import RegisterModal from '../../Modal/RegisterModal/RegisterModal';
import LogInModal from '../../Modal/LogInModal/LogInModal';
import './MainInfo.scss';
import {apiWithoutRedirect} from "../../../services/api";
import {GET_USER_INFO} from "../../../services/urls/userUrls";
import {singOutToken} from "../../../services/authService";

class MainInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoginModalOpen: false,
			isRegisterModalOpen: false,
			userName: ''
		}
	}

	componentDidMount() {
		apiWithoutRedirect()
			.get(GET_USER_INFO)
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

	render() {
		const {userName} = this.state;
		return (
			<div className="info_container row">
				<div className="info_container__left col-xl-4 col-lg-12">
					<Link to="/aboutCompany">Про компанію</Link>
					<Link to="/deliveryAndPay">Доставка та оплата</Link>
					<Link to="/contacts">Контакти</Link>
				</div>
				<div className="col-xl-3 col-lg-1"/>
				<div className="info_container__right col-xl-5 col-lg-12">
					<div className="info_container__right__menu-item">
						<div className="info_container__right__menu-item__sub-menu">
							+380680538860
						</div>
						<div className="info_container__right__menu-item__sub-menu">
							Зателефонуй мені
						</div>
					</div>
					<div className="info_container__right__menu-item">
						{!userName ? <div>
							<a onClick={this.openLoginModal}>Вхід</a>
							<a onClick={this.openRegisterModal}>Реєстрація</a>
						</div> : <div className="info_container__right__menu-item__sub">
							<div>{userName}</div>
							<a onClick={this.singOut}>Вийти</a>
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