import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import './Contacts.scss';

class Contacts extends Component {
	render() {
		return (
			<DocumentTitle title="Контакти">
				<div className="contacts-cont">
					<div className="text-center">
						<h3>Контактна інформація</h3>
					</div>
					<div className="contacts-cont__contacts-box">
						<div>
							<h5>Адрес</h5>
							<div>м. Львів</div>
						</div>
						<div className="mt-3">
							<h5>Телефон</h5>
							<div>+380966809947</div>
							<div>+380991291765</div>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default Contacts;