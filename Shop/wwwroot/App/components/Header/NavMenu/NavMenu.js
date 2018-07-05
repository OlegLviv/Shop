import React from 'react';
import './NavManu.scss';
import {Icon} from 'react-fa';
import {Link} from 'react-router-dom';
import {getCookie} from '../../../services/cookies';
import Autocomplete from 'react-autocomplete';
import {apiWithoutRedirect} from "../../../services/api";
import {getProductsByNameUrl} from "../../../services/urls/productUrls";
import {connect} from 'react-redux';
import {SITE_NAME} from "../../constants/siteConstants";

const getLikeProductsCount = () => {
	const prodCookie = getCookie('likeProducts');
	if (!prodCookie.split(',')[0]) {
		return 0;
	}
	return prodCookie.split(',').length;
};

const autocompleteMenuStyle = {
	boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
	position: 'fixed',
	overflow: 'auto',
	maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
	'z-index': '11',
	'min-width': '20rem'
};

const getProductCardItemCount = ({products}) => {
	let sum = 0;
	products.map(product => sum += product.count);
	return sum;
};

class NavMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchVal: '',
			products: []
		}
	}

	onChangeAutocomplete = (e) => {
		const {value} = e.target;
		if (!value) {
			this.setState({
				products: [],
				searchVal: ''
			});
			return;
		}
		apiWithoutRedirect()
			.get(getProductsByNameUrl(value))
			.then(reps => {
				this.setState({products: reps.data.data});
			});
		this.setState({searchVal: value});
	};

	onSelectAutocomplete = (val) => {
		this.setState({searchVal: val})
	};

	renderAutocompleteItem = (product) => {
		const {id, name} = product;
		return (
			<div className="menu-container__navbar-right__search__search-item">
				<Link to={`/product/${id}`}>{name}</Link>
			</div>
		);
	};

	render() {
		const likeProdCount = getLikeProductsCount();
		const productCardItemsCount = getProductCardItemCount(this.props);
		return (
			<div className="menu-container">
				<nav className="navbar navbar-expand-lg navbar-light menu-container__navbar">
					<Link to="/" className="navbar-brand">{SITE_NAME}</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
							data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
							aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"/>
					</button>
					<div className="collapse navbar-collapse menu-container__navbar-right" id="navbarSupportedContent">
						<div/>
						<div className="form-inline my-2 search-box">
							<Autocomplete
								inputProps={({
									class: 'form-control mr-sm-2 menu-container__navbar-right__search',
									placeholder: 'Пошук товарів...'
								})}
								menuStyle={autocompleteMenuStyle}
								getItemValue={(product) => product.name}
								items={this.state.products}
								renderItem={this.renderAutocompleteItem}
								value={this.state.searchVal}
								onChange={this.onChangeAutocomplete}
								onSelect={this.onSelectAutocomplete}/>
							{/*<button*/}
								{/*className="btn btn-dark my-sm-0 form-control mr-sm-2 menu-container__navbar-right__search-but">*/}
								{/*<Icon name="search"/>*/}
							{/*</button>*/}
						</div>
						<ul className="navbar-nav mr-auto menu-container__navbar__card">
							<li className="nav-item">
								<Link to="/productsCard"><Icon size="2x"
															   name="shopping-cart ml-xl-5 ml-lg-3 menu-container__navbar__card__icon-shoping ico"/></Link>
								{productCardItemsCount !== 0 && <div
									className="menu-container__navbar__card__shoping-card">{productCardItemsCount}</div>}
							</li>
							<li className="nav-item">
								<Link to="/likedProducts"><Icon size="2x"
																name="heart ml-xl-5 ml-lg-3 menu-container__navbar__card__icon-like ico"/></Link>
								{likeProdCount !== 0 && <div
									className="menu-container__navbar__card__like">{likeProdCount}</div>
								}
							</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

export default connect(state => ({
	products: state.products
}))(NavMenu);