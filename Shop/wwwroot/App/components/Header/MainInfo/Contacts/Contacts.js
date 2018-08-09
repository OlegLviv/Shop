import React from 'react';
import DocumentTitle from 'react-document-title';
import './Contacts.scss';
import {Icon} from 'react-fa';
import {SITE_EMAIL} from "../../../../constants/siteConstants";

export default () => (
	<DocumentTitle title="Контакти">
		<div className="contacts-cont">
			<div className="contacts-cont__contacts-box">
				<h2 className="d-flex justify-content-center">
					<div className="mr-2">Контактна інформація</div>
					<Icon name="question-circle"/>
				</h2>
				<div>
					<h5>Адрес</h5>
					<div className="d-flex align-items-center">
						<Icon name="home"/>
						<div className="ml-2">м. Львів</div>
					</div>
				</div>
				<div className="mt-3">
					<h5>Телефон</h5>
					<div className="d-flex align-items-center">
						<Icon name="phone"/>
						<div className="ml-2">+380966809947</div>
					</div>
					<div className="d-flex align-items-center">
						<Icon name="phone"/>
						<div className="ml-2">+380991291765</div>
					</div>
				</div>
				<div className="mt-3">
					<h5>Email</h5>
					<div className="d-flex align-items-center">
						<Icon name="at"/>
						<div className="ml-2">{SITE_EMAIL}</div>
					</div>
				</div>
				<div className="mt-3">
					<h5>Графік роботи</h5>
					<div className="d-flex align-items-center">
						<Icon name="clock"/>
						<div className="ml-2">Пн-Сб з 9:00 до 19:00</div>
					</div>
				</div>
			</div>
		</div>
	</DocumentTitle>
);