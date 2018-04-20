import React from 'react';
import './UsersEdit.scss';
import {apiGet, apiPut} from "../../../../services/api";
import {getUserByNameOrLastNameUrl, getUserByIdUrl, EDIT_USER_PERSONAL_DATA} from "../../../../services/urls/userUrls";

class UsersEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			activePage: 1,
			totalProductCount: 0,
			users: [],
			selectedUser: null,
			name: '',
			lastName: ''
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

	setUsersByIdInState = id => {
		apiGet(getUserByIdUrl(id))
			.then(resp => this.setState({users: [resp.data]}));
	};

	onChangeSearch = e => {
		const {value} = e.target;
		if (value[0] === '@' && value.length > 1) {
			this.setState({searchValue: value});
			this.setUsersByIdInState(value.slice(1));
		}
		else {
			this.setState({searchValue: value});
			this.setUsersByNameInState(value);
		}
	};

	onClickUser = user => {
		this.setState({selectedUser: user});
		console.log('selected user', user);
	};

	onSave = () => {
		const user = {
			id: this.state.selectedUser.id,
			name: this.state.name,
			lastName: this.state.lastName
		};

		apiPut(EDIT_USER_PERSONAL_DATA, user)
			.then(resp => {
				if (resp.status === 200)
					alert("Дані успішно оновлено");
			})
			.catch(err => {
				alert(`Error:Сталась помилка`);
				console.error(err.response.data);
			});
	};

	renderUserInfo = () => {
		return (
			<table>
				<thead className="table-head">
				<tr>
					<th>Додаткова інформація про користувача</th>
					<th/>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>Id Користувача</td>
					<td>{this.state.selectedUser.id}</td>
				</tr>
				<tr>
					<td>Підтверджений email</td>
					<td>{this.state.selectedUser.emailConfirmed.toString()}</td>
				</tr>
				<tr>
					<td>Підтверджений телефон</td>
					<td>{this.state.selectedUser.phoneNumberConfirmed.toString()}</td>
				</tr>
				</tbody>
			</table>
		);
	};

	renderEditPanel = () => {
		return (
			<div>
				{this.renderUserInfo()}
				<table>
					<thead className="table-head">
					<tr>
						<th>Назва властивості</th>
						<th>Значення властивості</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>Ім'я</td>
						<td>
							<input type="text"
								   className="form-control"
								   defaultValue={this.state.selectedUser.name}
								   placeholder="Введіть ім'я"
								   onChange={(e) => this.setState({name: e.target.value})}/>
						</td>
					</tr>
					<tr>
						<td>Прізвище</td>
						<td>
							<input type="text"
								   className="form-control"
								   defaultValue={this.state.selectedUser.lastName}
								   placeholder="Введіть прізвище"
								   onChange={(e) => this.setState({lastName: e.target.value})}/>
						</td>
					</tr>
					<tr>
						<td>
							<button className="btn btn-info"
									onClick={this.onSave}>Зберегти
							</button>
						</td>
						<td>
							<button className="btn btn-danger">Вийти</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
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
				<div>
					{
						!this.state.selectedUser ? <div className="user-edit-container__product-list-box">
							<ul className="list-group user-edit-container__product-list-box__list-group">
								{
									this.state.users.map(user => <li
										key={user.id}
										onClick={() => this.onClickUser(user)}
										className="list-group-item user-edit-container__product-list-box__list-group__item">
										<div>{`${user.name} ${user.lastName}`}</div>
										<div>{`id: ${user.id}`}</div>
									</li>)
								}
							</ul>
						</div> : this.renderEditPanel()
					}
				</div>
			</div>
		)
	}
}

export default UsersEdit;