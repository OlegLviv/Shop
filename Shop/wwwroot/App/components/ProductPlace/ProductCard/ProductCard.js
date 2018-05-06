import React from 'react';
import './ProductCard.scss';
import {Link} from 'react-router-dom';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inProductCardTextBut: 'В кошик',
            isEnableInProductCardBut: true,
            imgSrc: this.props.defaultImgSrc
        }
    }

    componentDidMount() {
        this.props.imgSrcPromise.then(data => this.setState({imgSrc: data}))
    }

    componentWillReceiveProps(nextProps) {
        nextProps.imgSrcPromise.then(data => this.setState({imgSrc: data}))
    }

    onProductCardButClick = (e) => {
        if (this.state.inProductCardTextBut !== 'Додано') {
            this.setState((prev) => ({
                inProductCardTextBut: 'Додано',
                isEnableInProductCardBut: !prev.isEnableInProductCardBut
            }));
        }
        this.props.onProductCardButClick(e, this.props.product.id);
    };

    onLikeButClick = (e) => {
        this.props.onLikeButClick(e, this.props.product.id);
    };

    render() {
        return (
            <div className="card card-dev">
                <img className="card-img-top"
                     src={this.state.imgSrc}
                     alt="Card image cap"/>
                <div className="card-body">
                    <Link to={`/product/${this.props.product.id}`}>
                        <h5 className="card-title text-center">{this.props.product.name}</h5>
                    </Link>
                    <h4 className="text-center">{`${this.props.product.price} грн`}</h4>
                    <div className="card-dev__footer">
                        <button className="btn btn-dark"
                                onClick={this.onProductCardButClick}
                                disabled={!this.state.isEnableInProductCardBut}>{this.state.inProductCardTextBut}</button>
                        <button className="btn btn-info" onClick={this.onLikeButClick}>В обране</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;