import React from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    onBasketButClick = (e) => {
        this.props.onBasketButClick(e);
    };

    onLikeButClick = (e) => {
        this.props.onLikeButClick(e);
    };

    render() {
        return (
            <div className="card">
                <img className="card-img-top"
                     src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title text-center">{this.props.product.description.name}</h5>
                    <h6 className="card-text text-center">{`${this.props.product.description.price} грн`}</h6>
                    <div className="card__footer">
                        <button className="btn btn-primary" onClick={this.onBasketButClick}>В кошик</button>
                        <button className="btn btn-info" onClick={this.onLikeButClick}>В обране</button>
                    </div>
                </div>
            </div>
        );
    }
}

ProductCard.propTypes = {
    onBasketButClick: PropTypes.func,
    onLikeButClick: PropTypes.func,
    product: PropTypes.object.isRequired
};

export default ProductCard;