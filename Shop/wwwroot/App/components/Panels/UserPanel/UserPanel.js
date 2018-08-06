import React from 'react';
import {Navigation} from "../../common/Navigation/Navigation";
import './UserPanel.scss';
import {Route, Switch} from 'react-router-dom';
import {NotFound} from "../../common/NotFound/NotFound";
import ChangePassword from './ChangePassword/ChangePassword';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import ChangePhone from './ChangePhone/ChangePhone';
import Mailing from './Mailing/Mailing';
import Orders from './Orders/Orders';
import {apiGet} from "../../../services/api";
import {GET_USER_ROLE_URL} from "../../../services/urls/userUrls";
import {Spinner} from "../../Spinner/Spinner";
import {Forbidden} from "../../common/Forbidden/Forbidden";

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
	},
	{
		link: '/userPanel/orders',
		icon: 'folder-open',
		text: 'Мої замовлення',
	}
];

class UserPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			canShow: false
		}
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	componentWillMount() {
		apiGet(GET_USER_ROLE_URL)
			.then(resp => {
				if (resp.date.role === 'User')
					this.setState({loading: false, canShow: true});
				else this.setState({loading: false});
			});
	}

	render() {
		const {loading, canShow} = this.state;

		if (!loading && canShow)
			return (
				<div className="row container-user-panel">
					<div className="col-xl-2 col-lg-3 container-user-panel__navigation">
						<Navigation items={navItems} navLink="/" navText="Меню"/>
					</div>
					<div className="col-xl-10 col-lg-9">
						<Switch>
							<Route exact path="/userPanel" render={() => <div>User panel</div>}/>
							<Route exact path="/userPanel/change-password" component={ChangePassword}/>
							<Route exact path="/userPanel/change-email" component={ChangeEmail}/>
							<Route exact path="/userPanel/change-phone-number" component={ChangePhone}/>
							<Route exact path="/userPanel/mailing" component={Mailing}/>
							<Route exact path="/userPanel/orders" component={Orders}/>
							<Route component={NotFound}/>
						</Switch>
					</div>
				</div>
			);

		if (loading)
			return <Spinner/>;
		if (!loading && !canShow)
			return <Forbidden/>
	}
}

export default UserPanel