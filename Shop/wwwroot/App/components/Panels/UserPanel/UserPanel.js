import React from 'react';
import {Navigation} from "../../common/Navigation/Navigation";
import './UserPanel.scss';
import {Route, Switch} from 'react-router-dom';
import {NotFound} from "../../NotFound/NotFound";

const navItems = [
	{
		link: '/userPanel/change-password',
		icon: 'key',
		text: 'Змінити пароль'
	},
	{
		link: '/userPanel/change-email',
		icon: 'at',
		text: 'Змінити Email'
	},
	{
		link: '/userPanel/change-phone-number',
		icon: 'phone',
		text: 'Змінити Телефон',
	},
	{
		link: '/userPanel/mailing',
		icon: 'envelope',
		text: 'Розсилки',
	}

];

class UserPanel extends React.Component {
	render() {
		return (
			<div className="row container-user-panel">
				<div className="col-2 container-user-panel__navigation">
					<Navigation items={navItems} navLink="/" navText="Nav"/>
				</div>
				<div className="col-10">
					<Switch>
						<Route exact path="/userPanel" render={() => <div>User panel</div>}/>
						<Route exact path="/userPanel/change-password" render={() => <div>change-password</div>}/>
						<Route exact path="/userPanel/change-email" render={() => <div>change-email</div>}/>
						<Route exact path="/userPanel/change-phone-number" render={() => <div>change-phone-number</div>}/>
						<Route exact path="/userPanel/mailing" render={() => <div>mailing</div>}/>
						<Route component={NotFound}/>
					</Switch>
				</div>
			</div>
		)
	}
}

export default UserPanel