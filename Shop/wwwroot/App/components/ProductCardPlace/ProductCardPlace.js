import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';
import {getCookie} from "../../services/cookies";
import {apiWithoutRedirect} from "../../services/api";
import {getProductsUrlByIds} from "../../services/urls/productUrls";

class ProductCardPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		const productIds = getCookie('productsCard');
		apiWithoutRedirect()
			.get(getProductsUrlByIds(productIds))
			.then(resp => {
				console.log('got prods:', resp.data);
				this.setState({products: resp.data});
			})
	}

	render() {
		return (
			<div className="container-p-card-place">
				<div className="container-p-card-place__footer">
					<button className="btn btn-outline-danger">Очистити кошик
						<Icon name="trash ml-1"/>
					</button>
					<h1 className="text-center">Кошик</h1>
				</div>
				<table className="table container-p-card-place__table">
					<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col"></th>
						<th scope="col">Ціна</th>
						<th scope="col">Кількість</th>
						<th scope="col">Вартість</th>
					</tr>
					</thead>
					<tbody>
					{
						this.state.products.map((item, i) => {
							return (
								<tr key={item.id}>
									<th>{i + 1}</th>
									<td>
										<div className="media">
											<img className="mr-5"
												 src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
											<div className="media-body">
												<h3>{item.description.name}</h3>
												<h6 className="my-3">Kod</h6>
											</div>
										</div>
									</td>
									<td>{item.description.price}</td>
									<td>
										<div className="btn-group">
											<button type="button" className="btn btn-secondary">Left</button>
											<button type="button" className="btn btn-secondary">Middle</button>
											<button type="button" className="btn btn-secondary">Right</button>
										</div>
									</td>
									<td>ds</td>
								</tr>
							)
						})
					}
					</tbody>
				</table>
			</div>
		);
	}
}

export default ProductCardPlace;