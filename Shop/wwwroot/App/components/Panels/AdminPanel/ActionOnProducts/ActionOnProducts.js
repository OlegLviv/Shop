import React from 'react';
import {Link} from 'react-router-dom';
import './ActionOnProducts.scss'
import {Icon} from 'react-fa';
import DocumentTitle from 'react-document-title';

export const ActionOnProducts = () => {
	return (
		<DocumentTitle title="Товари">
			<div className="action-on-products-container">
				<div className="action-on-products-container__menu">
					<Link to="/adminPanel/action-on-products/add-new"
						  className="action-on-products-container__menu__item">
						<Icon name="plus" size="3x"/>
						<div className="text-center">Додати новий</div>
					</Link>
					<Link to="/adminPanel/action-on-products/edit" className="action-on-products-container__menu__item">
						<Icon name="list" size="3x"/>
						<div className="text-center">Редагувати</div>
					</Link>
					<Link to="/adminPanel/action-on-products/add-new-characteristic"
						  className="action-on-products-container__menu__item">
						<Icon name="list-alt" size="3x"/>
						<div className="text-center">Додати нові характеристики</div>
					</Link>
					<Link to="/adminPanel/action-on-products/edit-characteristic"
						  className="action-on-products-container__menu__item">
						<Icon name="list-alt" size="3x"/>
						<div className="text-center">Редагувати характеристики</div>
					</Link>
				</div>
			</div>
		</DocumentTitle>
	)
};