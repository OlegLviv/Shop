import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Navigation} from "./Navigation/Navigation";
import './AdminPanel.scss';
import {ActionOnProducts} from "./ActionOnProducts/ActionOnProducts";
import {NotFound} from "../../NotFound/NotFound";
import AddNew from './ActionOnProducts/AddNew/AddNew';
import Edit from './ActionOnProducts/Edit/Edit';
import UserEdit from './UsersEdit/UsersEdit';

export const AdminPanel = () => {
	return (
		<div className="row container-adm-panel">
			<div className="col-2 container-adm-panel__navigation">
				<Navigation/>
			</div>
			<div className="col-10">
				<Switch>
					<Route exact path="/adminPanel/action-on-products" component={ActionOnProducts}/>
					<Route path="/adminPanel/action-on-products/add-new" component={AddNew}/>
					<Route path="/adminPanel/action-on-products/edit" component={Edit}/>
					<Route path="/adminPanel/users" component={UserEdit}/>
					<Route path="/adminPanel/site-settings" render={() => <div>site settings</div>}/>
					<Route path="/adminPanel/owner-settings" render={() => <div>owner settings</div>}/>
					<Route component={NotFound}/>
				</Switch>
			</div>
		</div>
	)
};