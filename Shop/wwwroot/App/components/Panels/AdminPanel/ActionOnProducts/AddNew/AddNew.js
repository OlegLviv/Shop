import React from 'react';
import './AddNew.scss';
import {NAVIGATION_CATEGORIES} from "../../../../../utils/productsUtils";
import {getSubCategories} from "../../../../../utils/productsUtils";
import {apiWithoutRedirect} from "../../../../../services/api";
import {getProductPropsUrl} from "../../../../../services/urls/productUrls";
import {normalizeSubCategoryToRoute} from "../../../../../utils/productsUtils";
import {clearObjectProps} from "../../../../../utils/utils";
import {createProductQueryByObject} from "../../../../../utils/utils";
import {ADD_PRODUCT_URL} from "../../../../../services/urls/productUrls";

class AddNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: NAVIGATION_CATEGORIES[1],
            subCategory: getSubCategories(NAVIGATION_CATEGORIES[1])[0],
            subCategoryProps: [],
            productName: '',
            price: 0,
            product: {}
        }
    }

    componentDidMount() {
        console.log(this.state.subCategory);
        this.setSubCategoryState();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.subCategory !== this.state.subCategory) {
            this.setSubCategoryState();
        }
    }

    setSubCategoryState = () => {
        apiWithoutRedirect()
            .get(getProductPropsUrl(normalizeSubCategoryToRoute(this.state.subCategory)))
            .then(resp => {
                console.log(resp.data);
                const {product} = this.state;
                clearObjectProps(product);
                for (let i in resp.data) {
                    product[resp.data[i].propValue] = resp.data[i].possiblePropsValues[0];
                }
                console.log('prod', product);
                this.setState({
                    subCategoryProps: resp.data,
                    product: product
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    onChangeOptionCategory = (e) => {
        this.setState({category: e.target.value})
    };

    onChangeOptionSubCategory = (e) => {
        this.setState({subCategory: e.target.value})
    };

    onChangeProductName = (e) => {
        this.setState({productName: e.target.value});
    };

    onChangePrice = (e) => {
        const numValue = Number(e.target.value);
        if (this.state.price > 10000) {
            this.setState({price: 10000});
            return;
        }
        if (!isNaN(numValue)) {
            this.setState({price: numValue});
        }
    };

    onChangePropsValue = (propName, e) => {
        const {product} = this.state;
        product[propName] = e.target.value;
        console.log(product);
        this.setState({product: product});
    };

    onSave = () => {
        const query = createProductQueryByObject(this.state.product);
        if (this.state.productName.length === 0 || this.state.price === 0)
            return;
        const product = {
            category: this.state.category,
            subCategory: this.state.subCategory,
            name: this.state.productName,
            price: this.state.price,
            query: query
        };
        apiWithoutRedirect()
            .post(ADD_PRODUCT_URL, product)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    onClear = () => {

    };

    render() {
        return (
            <div className="container-add-new">
                <div className="row container-add-new__row">
                    <div className="col-6 container-add-new__row__item" border-right="true">
                        <div>Оберіть карегорію</div>
                    </div>
                    <div className="col-6 container-add-new__row__item">
                        <div>Оберіть підкарегорію</div>
                    </div>
                    <div className="col-6 container-add-new__row__item--inverse" border-right="true"
                         border-bottom="true" border-left="true">
                        <select onChange={this.onChangeOptionCategory} defaultValue={this.state.category}>
                            {
                                NAVIGATION_CATEGORIES.map(item => <option
                                    value={item}>{item}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="col-6 container-add-new__row__item--inverse" border-right="true"
                         border-bottom="true">
                        <select onChange={this.onChangeOptionSubCategory}>
                            {
                                getSubCategories(this.state.category).map(item => <option>{item}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-6 container-add-new__row__item" border-right="true" margin-top="true">
                        <div>Властивість товару</div>
                    </div>
                    <div className="col-6 container-add-new__row__item" margin-top="true">
                        <div>Значення властивості</div>
                    </div>

                    <div className="container-add-new__props">
                        <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                             border-bottom="true" border-left="true">
                            <div className="container-add-new__props__item--inverse__text">Назва</div>
                        </div>
                        <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                             border-bottom="true">
                            <input className="form-control" onChange={this.onChangeProductName}/>
                        </div>
                    </div>

                    {
                        this.state.subCategoryProps.map(item => {
                            return (
                                <div className="container-add-new__props">
                                    <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                                         border-bottom="true" border-left="true">
                                        <div
                                            className="container-add-new__props__item--inverse__text">{item.propValue}</div>
                                    </div>
                                    <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                                         border-bottom="true">
                                        <select onChange={(e) => this.onChangePropsValue(item.propValue, e)}>
                                            {
                                                item.possiblePropsValues.map(itemPP =>
                                                    <option>{itemPP}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="container-add-new__props">
                        <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                             border-bottom="true" border-left="true">
                            <div className="container-add-new__props__item--inverse__text">Ціна</div>
                        </div>
                        <div className="col-6 container-add-new__props__item--inverse" border-right="true"
                             border-bottom="true">
                            <input className="form-control" value={this.state.price} onChange={this.onChangePrice}/>
                        </div>
                    </div>
                </div>
                <div className="container-add-new__action-box">
                    <button className="btn btn-info container-add-new__action-box__save" onClick={this.onSave}>Зберегти
                        товар
                    </button>
                    <button className="btn btn-danger container-add-new__action-box__clear"
                            onClick={this.onClear}>Очистити
                    </button>
                </div>
            </div>
        )
    }
}

export default AddNew;