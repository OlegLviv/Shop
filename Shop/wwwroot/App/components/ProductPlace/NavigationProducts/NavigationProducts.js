import React from 'react';
import './NavigationProducts.scss';
import {Link} from 'react-router-dom';
import {guid} from "../../../utils/utils";
import {normalizeNavSubCategoryToRoute} from "../../../utils/productsUtils";
import {NAVIGATION_SUB_CATEGORIES} from "../../../utils/productsUtils";

class NavigationProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    renderNavProd = () => {
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
                                NAVIGATION_SUB_CATEGORIES.stationeries.map(item => <Link
                                    key={guid()}
                                    className="dropdown-item"
                                    to={`/products/stationery/${normalizeNavSubCategoryToRoute(item)}`}>{item}</Link>)
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
                                NAVIGATION_SUB_CATEGORIES.gifts.map(item => <Link
                                    key={guid()}
                                    className="dropdown-item"
                                    to={`/products/gift/${normalizeNavSubCategoryToRoute(item)}`}>{item}</Link>)
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
                                NAVIGATION_SUB_CATEGORIES.books.map(item => <a key={guid()} className="dropdown-item"
                                                                               href="#">{item}</a>)
                            }
                        </div>
                    </div>
                </li>
            </ul>
        )
    };

    render() {
        return (
            <div>
                {
                    this.renderNavProd()
                }
            </div>
        );
    }
}

export default NavigationProducts;