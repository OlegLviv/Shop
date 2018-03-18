import React from 'react';
import {Link} from 'react-router-dom';
import RegisterModal from '../../Modal/RegisterModal/RegisterModal';
import LogInModal from '../../Modal/LogInModal/LogInModal';
import './MainInfo.scss';

class MainInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoginModalOpen: false,
			isRegisterModalOpen: false
		}
	}

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
		return (
			<div className="info_container">
				<div className="info_container__left">
					<div className="info_container__left__menu-item">
						<Link to="/aboutCompany">Про компанію</Link>
					</div>
					<div className="info_container__left__menu-item">
						<Link to="/deliveryAndPay">Доставка та оплата</Link>
					</div>
					<div className="info_container__left__menu-item">
						<Link to="/contacts">Контакти</Link>
					</div>
				</div>
				<div className="info_container__right">
					<div className="info_container__right__menu-item">
						<div>
							+380680538860
						</div>
					</div>
					<div className="info_container__right__menu-item">
						<div>
							Зателефонуй мені
						</div>
					</div>
					<div className="info_container__right__menu-item">
						<a href="#" onClick={this.openLoginModal}>Вхід</a>
						<a href="#" onClick={this.openRegisterModal}>Реєстрація</a>
						<LogInModal
							isModalOpen={this.state.isLoginModalOpen}
							closeModal={this.closeLoginModal}/>
						<RegisterModal
							isModalOpen={this.state.isRegisterModalOpen}
							closeModal={this.closeRegisterModal}/>
					</div>
				</div>
			</div>
		);
	}
}

export default MainInfo;