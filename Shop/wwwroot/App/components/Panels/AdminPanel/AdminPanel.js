import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Navigation} from '../../common/Navigation/Navigation';
import './AdminPanel.scss';
import {ActionOnProducts} from "./ActionOnProducts/ActionOnProducts";
import {ActionOnUsers} from "./ActionOnUsers/ActionOnUsers";
import {NotFound} from "../../common/NotFound/NotFound";
import {Forbidden} from "../../common/Forbidden/Forbidden";
import AddNew from './ActionOnProducts/AddNew/AddNew';
import Edit from './ActionOnProducts/Edit/Edit';
import UserEdit from './ActionOnUsers/UsersEdit/UsersEdit';
import {Spinner} from "../../Spinner/Spinner";
import {apiGet} from "../../../services/api";
import {GET_USER_ROLE} from "../../../services/urls/userUrls";

const navItems = [
	{
		link: '/adminPanel/action-on-products',
		icon: 'shopping-basket',
		text: 'Продукти'
	},
	{
		link: '/adminPanel/action-on-users',
		icon: 'users',
		text: 'Користувачі'
	},
	{
		link: '/adminPanel/site-settings',
		icon: 'cogs',
		text: 'Настройки сайту'
	},
	{
		link: '/adminPanel/owner-settings',
		icon: 'user',
		text: 'Особисті настройки'
	}

];

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
						<Navigation items={navItems} navLink="/" navText="Navbar"/>
					</div>
					<div className="col-10">
						<Switch>
							<Route exact path="/adminPanel" render={() => <div>Admin Panel</div>}/>
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
		if (isLoaded && !isLoading && !canShow)
			return <Forbidden/>
	}
}

export default AdminPanel;