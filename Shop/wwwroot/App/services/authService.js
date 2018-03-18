import axios from 'axios';
import {GET_TOKEN} from "./urls/authUrls";
import {GET_USER_ROLE} from "./urls/userUrls";
import {api} from "./api";

export const logInToken = (userName, password) => {
	const loginModel = {
		userName: userName,
		password: password
	};
	return axios
		.post(GET_TOKEN, loginModel)
		.then(resp => {
			const {token} = resp.data;
			if (token) {
				localStorage.setItem('access_token', token);
			}
			if (localStorage.getItem('access_token')) {
				api().get(GET_USER_ROLE)
					.then(resp => {
						const {role} = resp.data;
						if (role) {
							switch (role) {
								case 'Admin': {
									window.location.replace('/adminPanel');
								}
									break;
								case 'User': {
									window.location.replace('/userPanel');
								}
									break;
							}
						}
					});
			}
		})
		.catch(err => {
			console.error(err);
		})
};

export const singOutToken = (action) => {
	const access_token = localStorage.getItem('access_token');
	if (access_token) {
		localStorage.removeItem('access_token');
		action();
	}
};