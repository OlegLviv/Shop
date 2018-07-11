import React from 'react';
import {apiPost, apiWithoutRedirect} from "../../services/api";
import {
	getProductByIdUrl, getProductFeedbackByIdUrl, getProductImageCountUrl,
	getProductImageUrl, SEND_SUBFEEDBACK_URL
} from "../../services/urls/productUrls";
import './FullInfoProductPlace.scss';
import {Spinner} from "../Spinner/Spinner";
import {SEND_FEEDBACK_URL} from "../../services/urls/productUrls";
import {addProductCookies, addProductIdOfferCookie} from "../../services/cookies";
import {connect} from 'react-redux';
import {convertDateToDateString, convertDateToTimeString} from "../../utils/timeUtils";
import DocumentTitle from 'react-document-title';
import {Icon} from 'react-fa';

const getProductId = props => props.match.params.productId;

class FullInfoProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: null,
			productFeedbacks: [],
			productCount: 1,
			aboutProductNacCase: 'description',
			feedbackValue: '',
			isLoadingFeedbacks: false,
			isLoadedFeedbacks: false,
			selectedImgUrl: '',
			addProductButText: 'В кошик',
			isExpandedSubFeedbacks: [],
			subFeedbacksValues: [],
			submitSubCommentLoading: false,
			submitCommentLoading: false
		}
	}

	componentDidMount() {
		this.updateProduct(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.updateProduct(nextProps);
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.addProductButText !== nextState.addProductButText) {
			setTimeout(() => this.setState({addProductButText: 'В кошик'}), 2500);
		}
	}

	updateProduct = props => {
		apiWithoutRedirect()
			.get(getProductByIdUrl(getProductId(props)))
			.then(resp => {
				apiWithoutRedirect()
					.get(getProductImageCountUrl(resp.data.id))
					.then(imgCResp => {
						const product = resp.data;
						product.imgSources = [];
						addProductIdOfferCookie(product.id, 3);

						for (let i = 0; i < imgCResp.data; i++) {
							product.imgSources.push(getProductImageUrl(product.id, i));
						}
						console.log('prod', product);
						this.setState({product: product});
					});
			});
	};

	//todo need clean if added feedback
	sendFeedback = () => {
		const {isLogin, user} = this.props;

		if (!this.props.isLogin) {
			alert('please login');
		}
		if (isLogin && user) {
			!this.state.submitCommentLoading && this.setState({submitCommentLoading: true});
			const sendCommentObj = {
				productId: this.state.product.id,
				userId: user.id,
				body: this.state.feedbackValue
			};
			apiWithoutRedirect()
				.post(SEND_FEEDBACK_URL, sendCommentObj)
				.then(resp => {
					if (resp.status === 200) {
						const newFeedback = this.state.productFeedbacks;
						newFeedback.push(resp.data);
						this.setState({
							feedbackValue: '',
							productFeedbacks: newFeedback,
							submitCommentLoading: false
						});
					}
				})
				.catch(err => {
					if (err.response.status === 401) {
						alert('please login')
					}
					this.setState({submitCommentLoading: false});
				});
		}
	};

	getMainImgSrc = () => {
		if (this.state.product.imgSources.length > 0 && !this.state.selectedImgUrl)
			return this.state.product.imgSources[0];
		if (this.state.product.imgSources.length > 0 && this.state.selectedImgUrl)
			return this.state.selectedImgUrl;
		else return 'https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png';
	};

	onProductCountDec = () => {
		if (this.state.productCount === 0) {
			return;
		}
		this.setState(prevState => ({productCount: prevState.productCount - 1}));
	};

	onProductCountInc = () => this.setState(prevState => ({productCount: prevState.productCount + 1}))

	onSendFeedback = () => this.sendFeedback();

	onSendFeedbackKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.sendFeedback();
		}
	};

	onFeedbackClick = () => {
		this.setState({
			aboutProductNacCase: 'feedback',
			isLoadingFeedbacks: true,
			isLoadedFeedbacks: false
		});
		apiWithoutRedirect()
			.get(getProductFeedbackByIdUrl(this.state.product.id))
			.then(resp => {
				this.setState({
					productFeedbacks: resp.data,
					isLoadingFeedbacks: false,
					isLoadedFeedbacks: true
				})
			})
	};

	onSmallImgClick = src => this.setState({selectedImgUrl: src});

	onAddToBackedClick = () => {
		if (this.state.addProductButText === 'Додано')
			return;

		addProductCookies('productsCard', this.state.product.id, this.state.productCount, 1);
		this.props.onAddNewProduct(this.state.product.id, this.state.productCount);
		this.setState({addProductButText: 'Додано'});
	};

	onToggleSubFeedbacks = i => this.setState(prevState => {
		const isExpandedSubFeedbacks = [...prevState.isExpandedSubFeedbacks];
		isExpandedSubFeedbacks[i] = !isExpandedSubFeedbacks[i];
		return {isExpandedSubFeedbacks};
	});

	onChangeSubFeedbacksValue = (i, {target}) => {
		const subFeedbacksValues = [...this.state.subFeedbacksValues];
		subFeedbacksValues[i] = target.value;
		this.setState({subFeedbacksValues});
	};

	onSendSubFeedback = (feedbackId, i) => {
		const body = {
			feedbackId,
			body: this.state.subFeedbacksValues[i]
		};
		!this.state.submitSubCommentLoading && this.setState({submitSubCommentLoading: true});

		apiWithoutRedirect()
			.post(SEND_SUBFEEDBACK_URL, body)
			.then(resp => {
				if (resp.status === 200) {
					const productFeedbacks = [...this.state.productFeedbacks];
					productFeedbacks[i].subFeedbacks.push(resp.data);
					const subFeedbacksValues = [...this.state.subFeedbacksValues];
					subFeedbacksValues[i] = '';
					this.setState({
						productFeedbacks,
						subFeedbacksValues,
						submitSubCommentLoading: false
					});
				}
			})
			.catch(err => {
				if (err.response.status === 401)
					alert('Please login');
				this.setState({submitSubCommentLoading: false});
			});
	};

	renderDescription = () => {
		return (
			<div className="description">
				{this.state.product.description ? this.state.product.description : 'Опису для даного товару немає'}
			</div>
		);
	};

	//todo need add characteristics logic
	renderCharacteristics = () => {
		return (
			<div className="card-body-text">
				{/*{this.state.product.description}*/}
				В розробці
			</div>
		);
	};

	renderSubCommentsSubmitBox = (isLogin, i, id) => {
		if (this.state.submitSubCommentLoading)
			return <Spinner/>;
		if (isLogin && !this.state.submitSubCommentLoading)
			return (
				<div
					className="container-c-b__card-body-content__sub-comments__submit-box">
													 <textarea className="form-control"
															   placeholder="Введіть відповіть..."
															   value={this.state.subFeedbacksValues[i]}
															   onChange={(e) => this.onChangeSubFeedbacksValue(i, e)}/>
					<button className="btn btn-dark ml-1"
							onClick={() => this.onSendSubFeedback(id, i)}>
						Відправити
						<Icon name="comments ml-1"/>
					</button>
				</div>
			);
	};

	renderFeedback = () => {
		const {user, isLogin} = this.props;
		if (!this.state.isLoadedFeedbacks && this.state.isLoadingFeedbacks) {
			return <Spinner/>
		}
		return (
			<div className="container-c-b">
				{
					this.state.productFeedbacks.map((item, i) => {
						console.log('item', item);
						return (
							<div className="container-c-b__card-body-content">
								<div className="container-c-b__card-body-content__comment"
									 style={{
										 'box-shadow': `${user && (this.props.user.id === item.userId && '1px 1px 10px 3px #17a2b899')}`,
										 'margin-left': `${user && (this.props.user.id === item.userId && '5rem')}`,
										 'background': `${user && (this.props.user.id === item.userId && '#e3e3e3')}`
									 }}>
									<div
										className="container-c-b__card-body-content__comment__userName">{`${item.userName} ${item.userLastName}`}
									</div>
									<hr className="container-c-b__card-body-content__comment__hr"/>
									<div
										className="container-c-b__card-body-content__comment__date">{`${convertDateToDateString(item.date)} ${convertDateToTimeString(item.date)}`}</div>
									<div
										className="container-c-b__card-body-content__comment__commentBody">{item.body}</div>
									<div className="container-c-b__card-body-content__comment__subfeedbacks-toggle"
										 onClick={() => this.onToggleSubFeedbacks(i)}>Показати відповіді
									</div>
								</div>
								{
									this.state.isExpandedSubFeedbacks[i] &&
									<div className="container-c-b__card-body-content__sub-comments">
										{
											item.subFeedbacks && item.subFeedbacks.map(subFeedback => (
												<div
													className="container-c-b__card-body-content__sub-comments__comment">
													<div
														className="container-c-b__card-body-content__sub-comments__comment__userName">{`${subFeedback.userName} ${subFeedback.userLastName}`}</div>
													<hr className="container-c-b__card-body-content__sub-comments__comment__hr"/>
													<div
														className="container-c-b__card-body-content__sub-comments__comment__date">{`${convertDateToDateString(subFeedback.date)} ${convertDateToTimeString(subFeedback.date)}`}</div>
													<div
														className="container-c-b__card-body-content__sub-comments__comment__body">{subFeedback.body}</div>
												</div>
											))
										}
										<div>
											{
												this.renderSubCommentsSubmitBox((user && isLogin), i, item.id)
											}
										</div>
									</div>
								}
							</div>
						)
					})
				}
				{this.props.isLogin && this.props.user ? <div className="container-c-b__submit-box">
					<textarea className="form-control"
							  placeholder="Введіть свій коментар"
							  onChange={(e) => this.setState({feedbackValue: e.target.value})}
							  onKeyPress={this.onSendFeedbackKeyPress}/>
					<button className="btn btn-dark" onClick={this.onSendFeedback}>
						Відправити
						<Icon name="comment ml-1"/>
					</button>
				</div> : <div className="container-c-b__submit-box">Для того щоб залишити повідомлення увійдіть в
					систему</div>}
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
			<div className="card text-center card-about-prod">
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
							onClick={this.onFeedbackClick}>
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
			<DocumentTitle title={this.state.product ? this.state.product.name : 'Загрузка...'}>
				<div className="container-product">
					{this.state.product ?
						<div>
							<div className="row container-product__row">
								<div className="col-xl-5 col-lg-5 col-md-5">
									<div className="container-product__row__product-img-container">
										<div className="container-product__row__product-img-container__main-img">
											<img
												src={this.getMainImgSrc()}/>
										</div>
										<div className="container-product__row__product-img-container__sm-img">
											{
												this.state.product.imgSources.map(src => <img
													onClick={() => this.onSmallImgClick(src)} src={src}/>)
											}
										</div>
									</div>
								</div>
								<div className="col-xl-7 col-lg-7 col-md-7">
									<div className="container-product__row__info-container">
										<div className="container-product__row__info-container__main-info">
											<h4 className="h4-dev">{this.state.product.name}</h4>
											<div className="container-product__row__info-container__main-info__price">
												<h3 className={`${(this.state.product.priceWithDiscount > 0) && 'with-discount'}`}>{
													`${this.state.product.price} грн`
												}</h3>
											</div>
											{(this.state.product.priceWithDiscount > 0) &&
											<div
												className="container-product__row__info-container__main-info__priceDiscount">{
												`${this.state.product.priceWithDiscount} грн`
											}</div>}
										</div>
										<hr className="container-product__row__info-container__main-info__hr"/>
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
											<hr/>
											<div
												className="available">{this.state.product.isAvailable ? 'Є в наявності' : 'Немає в наявності'}</div>
											<div
												className="container-product__row__info-container__to-card__btn-to-card">
												<div>
													<button className="btn btn-dark btn-lg"
															onClick={this.onAddToBackedClick}>
														{
															this.state.addProductButText
														}
													</button>
													<button className="btn btn-info btn-lg">В обране</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{this.renderNavAboutProduct()}
						</div>
						: <Spinner/>}
				</div>
			</DocumentTitle>
		)
	}
}

export default connect(state => ({}), dispatch => ({
	onAddNewProduct: (id, count) => dispatch({type: 'ADD_NEW', id: id, count: count})
}))(FullInfoProductPlace);