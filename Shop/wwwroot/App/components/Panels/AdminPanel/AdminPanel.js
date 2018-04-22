import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Navigation} from "./Navigation/Navigation";
import './AdminPanel.scss';
import {ActionOnProducts} from "./ActionOnProducts/ActionOnProducts";
import {ActionOnUsers} from "./ActionOnUsers/ActionOnUsers";
import {NotFound} from "../../NotFound/NotFound";
import AddNew from './ActionOnProducts/AddNew/AddNew';
import Edit from './ActionOnProducts/Edit/Edit';
import UserEdit from './UsersEdit/UsersEdit';
import {Spinner} from "../../Spinner/Spinner";
import {apiGet} from "../../../services/api";
import {GET_USER_ROLE} from "../../../services/urls/userUrls";

class AdminPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isLoaded: false,
			canShow: false
		}
	}

	componentDidMount() {
		apiGet(GET_USER_ROLE)
			.then(resp => {
				console.log(resp);
				if (resp.data.role === 'Admin')
					this.setState({
						isLoading: false,
						isLoaded: true,
						canShow: true
					});
				else
					this.setState({
						isLoading: false,
						isLoaded: true,
						canShow: false
					})
			});
	}

	//	todo need implement main admin panel route
	render() {
		const {isLoading, isLoaded, canShow} = this.state;
		if (isLoaded && !isLoading && canShow) {
			return (
				<div className="row container-adm-panel">
					<div className="col-2 container-adm-panel__navigation">
						<Navigation/>
					</div>
					<div className="col-10">
						<Switch>
							<Route exact path="/adminPanel" render={()=><div>Admin Panel</div>}/>
							<Route exact path="/adminPanel/action-on-products" component={ActionOnProducts}/>
							<Route path="/adminPanel/action-on-products/add-new" component={AddNew}/>
							<Route path="/adminPanel/action-on-products/edit" component={Edit}/>
							<Route exact path="/adminPanel/action-on-users" component={ActionOnUsers}/>
							<Route path="/adminPanel/action-on-users/edit-personal-data" component={UserEdit}/>
							<Route path="/adminPanel/action-on-users/edit-credentials"
								   render={() => <div>Edit cred</div>}/>
							<Route path="/adminPanel/action-on-users/lock-unlock"
								   render={() => <div>Edit lock/unlock</div>}/>
							<Route path="/adminPanel/site-settings" render={() => <div>site settings</div>}/>
							<Route path="/adminPanel/owner-settings" render={() => <div>owner settings</div>}/>
							<Route component={NotFound}/>
						</Switch>
					</div>
				</div>
			);
		}
		if (isLoading && !isLoaded)
			return <Spinner/>;
	}
}

export default AdminPanel;