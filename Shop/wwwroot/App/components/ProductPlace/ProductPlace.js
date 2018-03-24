import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrl} from "../../services/urls/productUrls";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
	render() {
		const prodUrl = getProductUrl(getCategory(this.props), getSubCategory(this.props));
		console.log(prodUrl);
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				console.log(resp);
			});
		return (
			<div>
				<div>{getCategory(this.props)}</div>
				<div>{getSubCategory(this.props)}</div>
			</div>
		);
	}
}

export default ProductPlace;