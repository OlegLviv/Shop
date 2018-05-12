import React from 'react';
import './UsersEdit.scss';
import {apiGet, apiPut} from "../../../../../services/api";
import {
	getUserByNameOrLastNameUrl,
	getUserByIdUrl,
	EDIT_USER_PERSONAL_DATA
} from "../../../../../services/urls/userUrls";
import {Spinner} from "../../../../Spinner/Spinner";

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
			lastName: '',
			isLoading: false,
			isLoaded: true
		}
	}

	trySetTrueLoadings = () => {
		if (!this.state.isLoading)
			this.setState({isLoading: true});
		if (this.state.isLoaded)
			this.setState({isLoaded: false});
	};

	setUsersByNameInState = name => {
		this.trySetTrueLoadings();
		apiGet(getUserByNameOrLastNameUrl(name, this.state.activePage))
			.then(resp => this.setState({
				users: resp.data.data,
				activePage: resp.pageNumber,
				totalProductCount: resp.totalCount,
				isLoaded: true,
				isLoading: false
			}));
	};

	setUsersByIdInState = id => {
		console.log(id);
		this.trySetTrueLoadings();
		apiGet(getUserByIdUrl(id))
			.then(resp => this.setState({users: [resp.data], isLoaded: true, isLoading: false}))
			.catch(() => {
				this.setState({users: [], isLoaded: true, isLoading: false});
			});
	};

	onChangeSearch = e => {
		const {value} = e.target;

		if (value[0] === '@' && value.length < 2) {
			this.setState({searchValue: value});
			return;
		}
		if (value[0] === '@' && value.length > 2) {
			this.setState({searchValue: value});
			this.setUsersByIdInState(value.slice(1));
		}
		else {
			this.setState({searchValue: value});
			this.setUsersByNameInState(value);
		}
	};

	onClickUser = user => {
		this.setState({
			selectedUser: user,
			name: user.name,
			lastName: user.lastName
		});
		console.log('selected user', user);
	};

	onSave = () => {
		const user = {
			id: this.state.selectedUser.id,
			name: this.state.name,
			lastName: this.state.lastName
		};

		this.trySetTrueLoadings();
		apiPut(EDIT_USER_PERSONAL_DATA, user)
			.then(resp => {
				if (resp.status === 200) {
					alert("Дані успішно оновлено");
					this.setState({isLoaded: true, isLoading: false});
				}
			})
			.catch(() => {
				alert(`Error:Сталась помилка`);
				this.setState({isLoaded: true, isLoading: false});
			});
	};

	onClose = () => {
		this.setState({selectedUser: null});
		this.onChangeSearch({target: {value: this.state.searchValue}});
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

	//todo need to add spinner
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
							<button className="btn btn-danger"
									onClick={this.onClose}>Закрити
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	};

	renderNotFoundById = () => {
		if (!this.state.isLoading &&
			this.state.isLoaded &&
			!this.state.users.length &&
			this.state.searchValue.length > 2 &&
			this.state.searchValue[0] === '@')
			return <div className="text-center"><h4>Нічого не знайдено</h4></div>;
		else return null;
	};

	renderNotFoundByName = () => {
		if (!this.state.isLoading &&
			this.state.isLoaded &&
			!this.state.users.length &&
			this.state.searchValue.length &&
			this.state.searchValue[0] !== '@')
			return <div className="text-center"><h4>Нічого не знайдено</h4></div>;
		else return null;
	};

	render() {
		return (
			<div className="user-edit-container">
				{
					!this.state.selectedUser ? <div>
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
							<small className="my-2">* Для того щоб знайти користувача по id втавте перед id знак @
							</small>
						</div>
						<div className="user-edit-container__product-list-box">
							{this.renderNotFoundById()}
							{this.renderNotFoundByName()}
							{!this.state.isLoading && this.state.isLoaded ?
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
								</ul> : <Spinner/>}
						</div>
					</div> : this.renderEditPanel()
				}
			</div>
		)
	}
}

export default UsersEdit;