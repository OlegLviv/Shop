import React from 'react';
import './NavigationProducts.scss';
import {guid} from "../../utils/utils";

const stationaries = [
	'Папки шкільні',
	'Папки офісні',
	'Зощити',
	'Блокноти',
	'Стікери',
	'Словники',
	'Письмове приладдя',
	'Шкільне приладдя',
	'Офісне приладдя',
	'ЗНО'
];

const gifts = [
	'Шкатулки',
	'Декоративні коробочки',
	'Статуетки'
];

// TODO Need to know how which books
const books = [
	'Енциклопедії'
];

class NavigationProducts extends React.Component {
	render() {
		return (
			<ul className="list-group-flush">
				<li className="list-group-item home-container__list-group-item-head">Каталог товарів</li>
				<li className="list-group-item home-container__list-group-item">
					<div className="btn-group dropright home-container__list-group-item__dropright">
						<button type="button"
								className="home-container__list-group-item__dropright__dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Рюкзаки. Сумочки
						</button>
						<div className="dropdown-menu">
						</div>
					</div>
				</li>
				<li className="list-group-item home-container__list-group-item">
					<div className="btn-group dropright home-container__list-group-item__dropright">
						<button type="button"
								className="home-container__list-group-item__dropright__dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Канцтовари
						</button>
						<div className="dropdown-menu">
							{
								stationaries.map(item => <a key={guid()} className="dropdown-item" href="#">{item}</a>)
							}
						</div>
					</div>
				</li>
				<li className="list-group-item home-container__list-group-item">
					<div className="btn-group dropright home-container__list-group-item__dropright">
						<button type="button" className="home-container__list-group-item__dropright__dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Подарунки
						</button>
						<div className="dropdown-menu">
							{
								gifts.map(item => <a key={guid()} className="dropdown-item" href="#">{item}</a>)
							}
						</div>
					</div>
				</li>
				<li className="list-group-item home-container__list-group-item">
					<div className="btn-group dropright home-container__list-group-item__dropright">
						<button type="button" className="home-container__list-group-item__dropright__dropdown-toggle"
								data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Книги
						</button>
						<div className="dropdown-menu">
							{
								books.map(item => <a key={guid()} className="dropdown-item" href="#">{item}</a>)
							}
						</div>
					</div>
				</li>
			</ul>
		);
	}
}

export default NavigationProducts;