import React from 'react';

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
	render() {
		return (
			<div>{getSubCategory(this.props)}</div>
		);
	}
}

export default ProductPlace;