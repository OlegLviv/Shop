import React from 'react';
import './ProductCardPlace.scss';
import {Icon} from 'react-fa';

class ProductCardPlace extends React.Component {
	constructor(props) {
		super(props);
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
					<tr>
						<th scope="row">1</th>
						<td>
							<div className="media">
								<img className="mr-5" src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
								<div className="media-body">
									<h3>Name</h3>
									<h6 className="my-3">Kod</h6>
								</div>
							</div>
						</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default ProductCardPlace;