import React from 'react';
import './Footer.scss';
import {Icon} from 'react-fa';
import {Link} from 'react-router-dom';

export const Footer = () => {
	return (
		<div className="footer-cont">
			<div className="footer-cont__main">
				<div className="footer-cont__main__contacts">
					<div className="footer-cont__main__contacts__main-text">Контакти:</div>
					<div className="footer-cont__main__contacts__contact">
						<Icon name="phone"/>
						<div>+38054643345</div>
					</div>
					<div className="footer-cont__main__contacts__contact">
						<Icon name="phone"/>
						<div>+38054643345</div>
					</div>
					<div className="footer-cont__main__contacts__contact">
						<Icon name="phone"/>
						<div>+38054643345</div>
					</div>
				</div>
				<div className="footer-cont__main__contacts">
					<div className="footer-cont__main__contacts__contact">
						<Icon name="envelope"/>
						<div>site@gmail.com</div>
					</div>
					<div className="footer-cont__main__contacts__contact">
						<Icon name="home"/>
						<div>Lviv, Address 22a</div>
					</div>
				</div>
				<div className="footer-cont__main__mailing">
					<div className="footer-cont__main__mailing__text">Підпишіться на розсилку новинок та акційних пропозицій
					</div>
					<div className="input-group mb-3">
						<input type="text" className="form-control" placeholder="Введіть свій Email"
							   aria-label="Recipient's username" aria-describedby="basic-addon2"/>
						<div className="input-group-append">
							<button className="btn btn-outline-secondary" type="button" disabled>Підписатись</button>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-cont__sub-footer">
				<div className="footer-cont__sub-footer__text">Інтернет магазин канцтоварів Name © 2018 Всі права захищені</div>
				<div className="footer-cont__sub-footer__text">Створення сайту:
					<a href="https://vk.com/id105586528">{' Oleh Kokhan'}</a>
				</div>
			</div>
		</div>
	)
};