import React from 'react';

class ProductCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div className="card">
				<img className="card-img-top"
					 src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"
					 alt="Card image cap"/>
				<div className="card-body">
					<h4 className="card-title text-center">{this.props.product.Description.Name}</h4>
					<h5 className="card-text text-center">{`${this.props.product.Description.Price} грн`}</h5>
					<div className="row">
						<div className="col-6">
							<button className="btn btn-primary text-left">В кошик</button>
						</div>
						<div className="col-6">
							<button className="btn btn-info text-right">В обране</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductCard;