import React, {Component} from 'react';
import './Home.scss';

class Home extends Component {
	render() {
		return (
			<div className="home-container">
				<div className="row">
					<div className="col-4">
						<ul className="list-group-flush">
							<li className="list-group-item home-container__list-group-item-head">Каталог товарів</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button"
											class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Рюкзаки. Сумочки
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button"
											class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Канцтовари
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button" class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Пакувальні матеріали
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button" class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Офісне та презентаційне обладнання
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button" class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Побутова хімія
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
							<li className="list-group-item home-container__list-group-item">
								<div className="btn-group dropright home-container__list-group-item__dropright">
									<button type="button" class="home-container__list-group-item__dropright__dropdown-toggle"
											data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										Продукти харчування
									</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="#">Action</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div className="col-8">4</div>
				</div>
			</div>
		);
	}
}

export default Home;