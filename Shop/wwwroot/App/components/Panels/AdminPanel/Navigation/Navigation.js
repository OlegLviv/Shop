import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';
import {Icon} from 'react-fa';

export const Navigation = () => {
    return (
        <div className="nav-container">
            <div className="nav-container__header">
                <Link to="/">Navbar</Link>
            </div>
            <div className="nav-container__items">
                <Link className="nav-container__items__item" to="/adminPanel/products">
                    <Icon className="nav-container__items__item__icon" name="shopping-basket"/>
                    <div className="nav-container__items__item__text">Продукти</div>
                </Link>
                <Link className="nav-container__items__item" to="/adminPanel/users">
                    <Icon className="nav-container__items__item__icon" name="users"/>
                    <div className="nav-container__items__item__text">Користувачі</div>
                </Link>
                <Link className="nav-container__items__item" to="/adminPanel/site-settings">
                    <Icon className="nav-container__items__item__icon" name="cogs"/>
                    <div className="nav-container__items__item__text">Настройки сайту</div>
                </Link>
                <Link className="nav-container__items__item" to="/adminPanel/owner-settings">
                    <Icon className="nav-container__items__item__icon" name="user"/>
                    <div className="nav-container__items__item__text">Особисті настройки</div>
                </Link>
            </div>
        </div>
    )
};