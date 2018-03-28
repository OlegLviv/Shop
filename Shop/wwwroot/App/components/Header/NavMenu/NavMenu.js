import React from 'react';
import './NavManu.scss';
import {Icon} from 'react-fa';
import {Link} from 'react-router-dom';
import {getCookie} from '../../../services/cookies';

const getLikeProductsCount = () => {
	const prodCookie = getCookie('likeProducts');
	if (!prodCookie.split(',')[0]) {
		return 0;
	}
	return prodCookie.split(',').length;
};

const getProductCardItemCount = () => {
	const prodCookie = getCookie('productsCard');
	if (!prodCookie.split(',')[0]) {
		return 0;
	}
	return prodCookie.split(',').length;
};

export const NavMenu = () => {
	const likeProdCount = getLikeProductsCount();
	const productCardItemsCount = getProductCardItemCount();
	return (
		<div className="menu-container">
			<nav className="navbar navbar-expand-lg navbar-light menu-container__navbar">
				<Link to="/" className="navbar-brand">Navbar</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse"
						data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
						aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse menu-container__navbar-right" id="navbarSupportedContent">
					<div></div>
					<div className="form-inline my-2">
						<input className="form-control mr-sm-2 menu-container__navbar-right__search" type="search"
							   placeholder="Search"
							   aria-label="Search"/>
						<button
							className="btn btn-dark my-sm-0 form-control mr-sm-2 menu-container__navbar-right__search-but">
							<Icon name="search"/>
						</button>
					</div>
					<ul className="navbar-nav mr-auto menu-container__navbar__card">
						<li className="nav-item">
							<Link to="/productsCard"><Icon size="2x"
														   name="shopping-cart ml-xl-5 ml-lg-3 menu-container__navbar__card__icon-shoping"/></Link>
							{productCardItemsCount === 0 ? null : <div
								className="menu-container__navbar__card__shoping-card">{productCardItemsCount}</div>}
						</li>
						<li className="nav-item">
							<Link to="/likedProducts"><Icon size="2x"
															name="heart ml-xl-5 ml-lg-3 menu-container__navbar__card__icon-like"/></Link>
							{likeProdCount === 0 ? null :
								<div className="menu-container__navbar__card__like">{likeProdCount}</div>}
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};