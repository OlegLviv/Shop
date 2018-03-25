import React from 'react';
import Header from './Header/Header';
import Home from './Home/Home';
import Contacts from './Contacts/Contacts';
import DeliveryAndPay from './DeliveryAndPay/DeliveryAndPay';
import AboutCompany from './AboutCompany/AboutCompany';
import {AdminPanel} from "./Panels/AdminPanel/AdminPanel";
import LogIn from './LogIn/LogIn';
import './Layout.scss';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {UserPanel} from "./Panels/UserPanel/UserPanel";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogIn: false,
            user: null
        }
    }

    onLogIn = (user) => {
        console.log('yser', user);
        this.setState({
            isLogIn: true,
            user: user
        })
    };

    render() {
        const {user, isLogIn} = this.state;
        return (
            <Router>
                <div className="layout-container">
                    <Header onLogIn={this.onLogIn}/>
                    <Route exact path='/' render={(props) => <Home user={user} isLogIn={isLogIn} {...props}/>}/>
                    <Route path='/contacts' component={Contacts}/>
                    <Route path='/deliveryAndPay' component={DeliveryAndPay}/>
                    <Route path='/aboutCompany' component={AboutCompany}/>
                    <Route path='/adminPanel' component={AdminPanel}/>
                    <Route path='/userPanel' component={UserPanel}/>
                    <Route path='/logIn' component={LogIn}/>
                    <Route path='/products' render={(props) => <Home user={user} isLogIn={isLogIn} {...props}/>}/>
                </div>
            </Router>
        );
    }
}

export default Layout;