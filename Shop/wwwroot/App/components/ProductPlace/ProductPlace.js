import React from 'react';
import {apiWithoutRedirect} from "../../services/api";
import {getProductUrl} from "../../services/urls/productUrls";
import ProductCard from "./ProductCard/ProductCard";
import './ProductPlace.scss';
import {addCookies} from "../../services/cookies";

const getCategory = (props) => props.match.params.category;
const getSubCategory = (props) => props.match.params.subCategory;

class ProductPlace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        const prodUrl = getProductUrl(getCategory(this.props), getSubCategory(this.props));
        apiWithoutRedirect()
            .get(prodUrl)
            .then(resp => {
                this.onGetCategorySubCategory(this.props);
                this.setState({products: resp.data});
                console.log('respDm', resp.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    componentWillReceiveProps(nextProps) {
        const prodUrl = getProductUrl(getCategory(nextProps), getSubCategory(nextProps));
        apiWithoutRedirect()
            .get(prodUrl)
            .then(resp => {
                this.setState({products: resp.data});
                console.log('respWrp', resp.data);
                this.onGetCategorySubCategory(nextProps);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    onGetCategorySubCategory(props) {
        this.props.onGetCategorySubCategory({
            category: getCategory(props),
            subCategory: getSubCategory(props)
        });
    }

    onLikeButClick = (e, id) => {
        if (!this.props.isLogIn) {
            addCookies("products", id, 1);
        }
    };

    render() {
        return (
            <div className="container-fluid container-products">
                <div className="row container-products__row">
                    {this.state.products.map(item => {
                        return (
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 container-products__row__item">
                                <ProductCard product={item} key={item.id} onLikeButClick={this.onLikeButClick}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default ProductPlace;