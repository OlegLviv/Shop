import React from 'react';
import './Actions.scss';
import {Icon} from 'react-fa';

const TITLE = "Акції";

export default () => (
	<div className="actions-cont">
		<div className="actions-cont__box">
			<h2 className="actions-cont__box__title">
				<div className="mr-2">{TITLE}</div>
				<Icon name="exclamation-circle"/>
			</h2>
			<h4>Замовлення приймаються від 100грн</h4>
			<h4 className="actions-cont__box__action-text">
				<div>* До 31 серпня діє акція на всі канцтовари, крім рюкзаків і книг.</div>
				<h4>Замовлення на суму:</h4>
				<ul>
					<li>Від 300грн - 5% знижки</li>
					<li>Від 500грн - 7% знижки</li>
					<li>Від 1000грн - безкоштовна доставка</li>
				</ul>
			</h4>
		</div>
	</div>
);