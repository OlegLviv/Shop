import React from 'react';
import {Link} from 'react-router-dom';
import './MainInfo.scss';

export const MainInfo = () => {
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
					<Link to="/">Вхід</Link>
					<Link to="/">Реєстрація</Link>
				</div>
			</div>
		</div>
	)
};