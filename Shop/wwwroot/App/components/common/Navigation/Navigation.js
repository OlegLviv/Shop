import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';
import {Icon} from 'react-fa';

export const Navigation = (props) => {
	return (
		<div className="nav-container">
			<div className="nav-container__header">
				<Link to={props.navLink}>{props.navText}</Link>
			</div>
			<div className="nav-container__items">
				{
					props.items.map(item => <Link className="nav-container__items__item"
												  to={item.link}>
						<Icon className="nav-container__items__item__icon" name={item.icon}/>
						<div className="nav-container__items__item__text">{item.text}</div>
					</Link>)
				}
			</div>
		</div>
	)
};