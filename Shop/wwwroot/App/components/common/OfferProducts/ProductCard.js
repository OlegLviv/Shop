import React from 'react';
import './ProductCard.scss';
import {getProductImageUrl} from "../../../services/urls/productUrls";
import {Link} from 'react-router-dom';

export const ProductCard = props => {
	return (
		<div className={`card prod-card ${props.className}`}>
			<img className="card-img-top prod-card__img" src={getProductImageUrl(props.id)} alt="Card image cap"/>
			<div className="card-body prod-card__card-body">
				<Link to={`/product/${props.id}`}>
					<h5 className="text-center prod-card__card-body__text">{props.name}</h5>
				</Link>
			</div>
		</div>
	);
};