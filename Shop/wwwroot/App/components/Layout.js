﻿import React from 'react';
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

export const Layout = () => {
	return (
		<Router>
			<div className="layout-container">
				<Header/>
				<Route exact path='/' component={Home}/>
				<Route path='/contacts' component={Contacts}/>
				<Route path='/deliveryAndPay' component={DeliveryAndPay}/>
				<Route path='/aboutCompany' component={AboutCompany}/>
				<Route path='/adminPanel' component={AdminPanel}/>
				<Route path='/userPanel' component={UserPanel}/>
				<Route path='/logIn' component={LogIn}/>
			</div>
		</Router>
	);
};