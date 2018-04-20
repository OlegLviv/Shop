import React from 'react';
import './UsersEdit.scss';
import {apiGet} from "../../../../services/api";
import {getUserByNameOrLastNameUrl} from "../../../../services/urls/userUrls";

class UsersEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			activePage: 1,
			totalProductCount: 0,
			users: []
		}
	}

	setUsersByNameInState = name => {
		apiGet(getUserByNameOrLastNameUrl(name, this.state.activePage))
			.then(resp => this.setState({
				users: resp.data.data,
				activePage: resp.pageNumber,
				totalProductCount: resp.totalCount
			}));
	};

	setUsersByIdInState = id =>{

	};

	onChangeSearch = e => {
		const {value} = e.target;
		if (value[0] === '@')
			console.log('yes');
		else {
			this.setState({searchValue: value});
			this.setUsersByNameInState(value);
		}
	};

	render() {
		return (
			<div className="user-edit-container">
				<div className="user-edit-container__header">
					Редактор користовачів
				</div>
				<div className="user-edit-container__search-box">
					<h6 className="text-center">Пошук</h6>
					<input className="form-control"
						   type="text"
						   value={this.state.searchValue}
						   onChange={this.onChangeSearch}
						   placeholder="Введіть ім'я або id користувача"/>
				</div>
				<div className="user-edit-container__product-list-box">
					<ul className="list-group user-edit-container__product-list-box__list-group">
						{
							this.state.users.map(user => <li
								className="list-group-item user-edit-container__product-list-box__list-group__item">
								<div>{`${user.name} ${user.lastName}`}</div>
								<div>{`id: ${user.id}`}</div>
							</li>)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default UsersEdit;