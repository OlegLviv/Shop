import React, {Component} from 'react';
import NavigationProducts from '../NavigationProducts/NavigationProducts';
import ProductPlace from '../ProductPlace/ProductPlace';
import {Route, Switch} from 'react-router-dom';
import './Home.scss';

let categoryC = null;
let subCategoryC = null;

class Home extends Component {
    constructor(props) {
        super(props);
    }

    // TODO need to fix that. Don't working if CategoryProductPlace call componentDidMount() func
    onGetCategorySubCategoryProductPlace = ({category, subCategory}) => {
        // console.log('cat sub cat: ', category, subCategory);
        categoryC = category;
        subCategoryC = subCategory;
    };

    render() {
        return (
            <div className="home-container">
                <div className="row">
                    <div className="col-xl-3 col-lg-4">
                        {
                            categoryC && subCategoryC ? <div>{categoryC + ' ' + subCategoryC}</div> :
                                <NavigationProducts/>
                        }
                    </div>
                    <div className="col-xl-9 col-lg-8">
                        <Switch>
                            <Route exact path="/products/:category/:subCategory"
                                   render={(props) => <ProductPlace {...props} isLogIn={this.props.isLogIn}
                                                                    onGetCategorySubCategory={this.onGetCategorySubCategoryProductPlace}/>}/>
                            <Route path="/products/:category/:subCategory/:q" component={ProductPlace}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;