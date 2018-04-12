import React from 'react';
import {Link} from 'react-router-dom';
import './ActionOnProducts.scss'
import {Icon} from 'react-fa';

export const ActionOnProducts = () => {
    return (
        <div className="action-on-products-container">
            <div className="action-on-products-container__menu">
                <Link to="/adminPanel/action-on-products/add-new" className="action-on-products-container__menu__item">
                    <Icon name="plus" size="3x"/>
                    <div>Додати новий</div>
                </Link>
                <Link to="/adminPanel/action-on-products/edit" className="action-on-products-container__menu__item">
                    <Icon name="list" size="3x"/>
                    <div>Редагувати</div>
                </Link>
            </div>
        </div>
    )
};