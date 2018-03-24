import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrl} from "../../services/urls/productUrls";
import ProductCard from "./ProductCard/ProductCard";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		const prodUrl = getProductUrl(getCategory(this.props), getSubCategory(this.props));
		apiWithoutRedirect()
			.get(prodUrl)
			.then(resp => {
				this.setState({products: resp.data});
			})
			.catch(err => {
				console.log(err.response);
			})
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					{this.state.products.map(item => {
						return (
							<div className="col-4">
								<ProductCard product={item}/>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}

export default ProductPlace;