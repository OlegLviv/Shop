import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrlById} from "../../services/urls/productUrls";
import './FullInfoProductPlace.scss';
import {Spinner} from "../Spinner/Spinner";

const getProductId = (props) => props.match.params.productId;

class FullInfoProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
			productCount: 1,
			aboutProductNacCase: 'description'
		}
	}

	// todo need add catch
	componentDidMount() {
		apiWithoutRedirect()
			.get(getProductUrlById(getProductId(this.props)))
			.then(resp => {
				this.setState({product: resp.data});
			});
	}

	// todo need add catch
	componentWillReceiveProps(nextProps) {
		apiWithoutRedirect()
			.get(getProductUrlById(getProductId(nextProps)))
			.then(resp => {
				this.setState({product: resp.data});
			});
	}

	onProductCountDec = () => {
		if (this.state.productCount === 0) {
			return;
		}
		this.setState(prevState => ({productCount: prevState.productCount - 1}));
	};

	onProductCountInc = () => {
		this.setState(prevState => ({productCount: prevState.productCount + 1}))
	};

	renderDescription = () => {
		return (
			<div className="card-body-text">
				{this.state.product.description ? this.state.product.description : 'Опису для даного товару немає'}
			</div>
		);
	};

	//todo need add characteristics logic
	renderCharacteristics = () => {
		return (
			<div className="card-body-text">
				{/*{this.state.product.description}*/}
				charact
			</div>
		);
	};

	//todo need add feedback logic
	renderFeedback = () => {
		return (
			<div className="container-c-b">
				<div className="container-c-b__card-body-content">
					<div className="container-c-b__card-body-content__comment">
						<div className="container-c-b__card-body-content__comment__userName">Oleh Kokhan</div>
						<div className="container-c-b__card-body-content__comment__date">13.06.2018</div>
						<div className="container-c-b__card-body-content__comment__commentBody">Simple comment</div>
					</div>
				</div>
				<div className="container-c-b__submit-box">
					<textarea className="form-control" type="text" placeholder="Введіть свій коментар"/>
					<button className="btn btn-dark">Відправити</button>
				</div>
			</div>
		);
	};

	renderNavAboutProduct = () => {
		let cardBodyContent = null;
		switch (this.state.aboutProductNacCase) {
			case 'description':
				cardBodyContent = this.renderDescription();
				break;
			case 'characteristics':
				cardBodyContent = this.renderCharacteristics();
				break;
			case  'feedback':
				cardBodyContent = this.renderFeedback();
				break;
		}
		return (
			<div className="card text-center">
				<div className="card-header">
					<ul className="nav nav-tabs card-header-tabs">
						<li className="nav-item nav-item-dev"
							onClick={() => this.setState({aboutProductNacCase: 'description'})}>
							<a className={`nav-link ${this.state.aboutProductNacCase === 'description' ? 'active' : ''}`}>Опис</a>
						</li>
						<li className="nav-item nav-item-dev"
							onClick={() => {
								this.setState({aboutProductNacCase: 'characteristics'});
							}}>
							<a className={`nav-link ${this.state.aboutProductNacCase === 'characteristics' ? 'active' : ''}`}>Характеристики</a>
						</li>
						<li className="nav-item nav-item-dev"
							onClick={() => this.setState({aboutProductNacCase: 'feedback'})}>
							<a className={`nav-link ${this.state.aboutProductNacCase === 'feedback' ? 'active' : ''}`}>Відгуки</a>
						</li>
					</ul>
				</div>
				<div className="card-body card-body-dev">
					{
						cardBodyContent
					}
				</div>
			</div>
		)
	};

	render() {
		return (
			<div className="container-product">
				{this.state.product ?
					<div>
						<div className="row container-product__row">
							<div className="col-xl-5 col-lg-5 col-md-5">
								<div className="container-product__row__product-img-container">
									<div className="container-product__row__product-img-container__main-img">
										<img
											src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
									</div>
									<div className="container-product__row__product-img-container__sm-img">
										<img
											src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
										<img
											src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
										<img
											src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
									</div>
								</div>
							</div>
							<div className="col-xl-7 col-lg-7 col-md-7">
								<div className="container-product__row__info-container">
									<div className="container-product__row__info-container__main-info">
										<h4 className="h4-dev">{this.state.product.name}</h4>
										<div className="container-product__row__info-container__main-info__price">
											<h3>{this.state.product.price}</h3>
											<span>грн</span>
										</div>
									</div>
									<hr/>
									<div className="container-product__row__info-container__to-card">
										<div>Кількість</div>
										<div className="btn-group">
											<button type="button" className="btn btn-dark"
													onClick={this.onProductCountDec}>-
											</button>
											<input type="number" value={this.state.productCount}/>
											<button type="button" className="btn btn-dark"
													onClick={this.onProductCountInc}>+
											</button>
										</div>
										<div className="container-product__row__info-container__to-card__btn-to-card">
											<button className="btn btn-dark btn-lg">В кошик</button>
											<button className="btn btn-info btn-lg">В обране</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						{this.renderNavAboutProduct()}
					</div>
					: <Spinner/>}
			</div>
		)
	}
}

export default FullInfoProductPlace;