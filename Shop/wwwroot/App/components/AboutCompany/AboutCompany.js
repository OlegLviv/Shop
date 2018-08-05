import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import './AboutCompany.scss';
import {Icon} from 'react-fa';
import {SITE_NAME} from "../../constants/siteConstants";

const TITLE = 'Про компанію';

class AboutCompany extends Component {
	render() {
		return (
			<DocumentTitle title={TITLE}>
				<div className="about-company">
					<div className="about-company__box">
						<h2 className="about-company__box__title">
							<div>{TITLE}</div>
							<Icon name="building"/>
						</h2>
						<div className="about-company__box__text">
							{`Інтернет магазин ${SITE_NAME} пропонує Вашій увазі широкий асортимент товарі.
							В нас ви можете знайти свою улюблену книгу чи все необхідне для школи за доступними цінами.`}
							<h3>
								* Вибачаємось за тимчасові незручності, оскільки ми тільки відкрились, тому ще не увесь
								асортимент товару виставлений. Найближчим часом буде представлений весь товар.
							</h3>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default AboutCompany;