import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrlById} from "../../services/urls/productUrls";
import './FullInfoProductPlace.scss';

const getProductId = (props) => props.match.params.productId;

class FullInfoProductPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }

    componentDidMount() {
        apiWithoutRedirect()
            .get(getProductUrlById(getProductId(this.props)))
            .then(resp => {
                this.setState({product: resp.data});
            })
    }

    // componentWillReceiveProps(nextProps) {
    //
    // }

    render() {
        return (
            <div className="container-product">
                {this.state.product ?
                    <div className="row container-product__row">
                        <div className="col-4">
                            <div className="container-product__row__product-img-container">
                                <div className="container-product__row__product-img-container__main-img">
                                    <img
                                        src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
                                </div>
                                <div className="container-product__row__product-img-container__sm-img">
                                    <img
                                        src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
                                    <img
                                        src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
                                    <img
                                        src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8_400x400.png"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="container-product__row__info-container">
                                <div className="container-product__row__info-container__main-info">
                                    <h4>{this.state.product.name}</h4>
                                    <div className="container-product__row__info-container__main-info__price">
                                        <h3>{this.state.product.price}</h3>
                                        <span>грн</span>
                                    </div>
                                </div>
                                <hr/>
                                <div className="container-product__row__info-container__to-card">
                                    <div>Кількість</div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-dark">-
                                        </button>
                                        <input type="number" value={1}/>
                                        <button type="button" className="btn btn-dark">+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>loading</div>}
            </div>
        )
    }
}

export default FullInfoProductPlace;