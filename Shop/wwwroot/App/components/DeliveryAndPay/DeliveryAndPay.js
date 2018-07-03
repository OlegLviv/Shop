import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import './DeliveryAndPay.scss';

class DeliveryAndPay extends Component {
	render() {
		return (
			<DocumentTitle title="Доставка та оплата">
				<div className="delivery-cont">
					<div className="delivery-cont__delivery-pay-box">
						<div className="text-center">
							<h3>Доставка</h3>
						</div>
						<div className="pr-5 pl-5 pb-5">
							<h5>Нова пошта</h5>
							<div>
								При отриманні товару клієнт отримує доставку по тарифах нової пошти.
								Вартість доставки залежить від розмірів та ваги посилки
							</div>
							<br/>
							<h5>Укрпошта</h5>
							<div>
								Вартість доставки оплачує клієнт при отриманні посилки згідно тарифів Укрпошта
							</div>
						</div>
					</div>
					<div className="delivery-cont__delivery-pay-box mt-2">
						<div className="text-center">
							<h3>Оплата</h3>
						</div>
						<div className="pr-5 pl-5 pb-5">
							<h5>Готівковий рахунок</h5>
							<div>
								Оплата здійснюється при отриманні товару на пошті
							</div>
							<br/>
							<h5>Безготівковий рахунок</h5>
							<div>
								Товар відправляється після зарахування коштів на карту Приват Банку.
								Номер карти відправляється після узгодження деталей по замовленню.
								В суму оплати включається комісія банку, вартість доставки не включається до оплати
								товару,
								а клієнт самостійно оплачує доставку при отриманні товару на пошті.
							</div>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default DeliveryAndPay;