import React from 'react';
import {Link} from 'react-router-dom';
import './ActionOnUsers.scss'
import {Icon} from 'react-fa';

export const ActionOnUsers = () => {
	return (
		<div className="action-on-users-container">
			<div className="action-on-users-container__menu">
				<Link to="/adminPanel/action-on-users/edit-personal-data"
					  className="action-on-products-container__menu__item">
					<Icon name="edit" size="3x"/>
					<div className="text-center">Редагувати персональні дані</div>
				</Link>
				<Link to="/adminPanel/action-on-users/edit-credentials"
					  className="action-on-products-container__menu__item">
					<Icon name="address-card" size="3x"/>
					<div className="text-center">Редагувати облікові дані</div>
				</Link>
				<Link to="/adminPanel/action-on-users/lock-unlock" className="action-on-products-container__menu__item">
					<Icon name="unlock" size="3x"/>
					<div className="text-center">Заблокувати/Розблокувати</div>
				</Link>
			</div>
		</div>
	)
};