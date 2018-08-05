import React, {Component} from 'react';
import DocumentTitle from 'react-document-title';
import './DeliveryAndPay.scss';
import {Icon} from 'react-fa';

class DeliveryAndPay extends Component {
	render() {
		return (
			<DocumentTitle title="Доставка та оплата">
				<div className="delivery-cont">
					<div className="delivery-cont__delivery-pay-box">
						<div className="text-center pt-2">
							<h2>
								<div>Доставка</div>
								<Icon name="truck"/>
							</h2>
						</div>
						<div className="pr-5 pl-5 pb-5">
							<h4>Нова пошта</h4>
							<div>
								При отриманні товару клієнт отримує доставку по тарифах нової пошти.
								Вартість доставки залежить від розмірів та ваги посилки
							</div>
							<br/>
							<h4>Укрпошта</h4>
							<div>
								Вартість доставки оплачує клієнт при отриманні посилки згідно тарифів Укрпошта
							</div>
						</div>
					</div>
					<div className="delivery-cont__delivery-pay-box mt-2">
						<div className="text-center pt-2">
							<h2 className="mr-1">
								<div>Оплата</div>
								<Icon name="dollar-sign"/>
							</h2>
						</div>
						<div className="pr-5 pl-5 pb-5">
							<h4>Готівковий рахунок</h4>
							<div>
								Оплата здійснюється при отриманні товару на пошті.
								Клієнт має можливіть вживу оглянути товар, якщо все підходить покупцю,
								то він оплачує вартість товару і доставку в касі пошти.
								Якщо товар не влаштовує клієнта, то він має право відіслати товар, але
								оплатит зворотню доставку.
							</div>
							<br/>
							<h4>Безготівковий рахунок</h4>
							<div>
								Товар відправляється після зарахування коштів на карту Приват Банку.
								Номер карти відправляється після узгодження деталей по замовленню.
								В суму оплати включається комісія банку, вартість доставки не включається до оплати
								товару,
								а клієнт самостійно оплачує доставку при отриманні товару на пошті.
								При безготівковому розрахунку клієнт не може здійснити повернення товару і коштів.
							</div>
							<small className="mt-2">
								* Замовлення приймається від 100грн.. Замовлення з меншою сумою не обробляється
							</small>
						</div>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default DeliveryAndPay;