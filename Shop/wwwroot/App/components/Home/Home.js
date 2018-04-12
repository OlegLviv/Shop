import React, {Component} from 'react';
import ProductPlace from '../ProductPlace/ProductPlace';
import {Route, Switch} from 'react-router-dom';
import './Home.scss';
import DeliveryAndPay from "../DeliveryAndPay/DeliveryAndPay";

class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="home-container">
                <Switch>
                    <Route exact path="/products/:category/:subCategory"
                           render={(props) => <ProductPlace {...props} isLogIn={this.props.isLogIn}/>}/>
                    <Route path="/" component={ProductPlace}/>
                    <Route path="/products/:category/:subCategory/:q" component={ProductPlace}/>
                </Switch>
            </div>
        );
    }
}

export default Home;