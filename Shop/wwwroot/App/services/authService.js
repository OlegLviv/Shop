import axios from 'axios';
import {GET_TOKEN} from "./urls/tokenUrls";
import {GET_USER_ROLE_URL} from "./urls/userUrls";
import {REGISTRATION_USER_URL} from "./urls/userUrls";
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
				api().get(GET_USER_ROLE_URL)
					.then(resp => {
						const {role} = resp.data;
						if (role) {
							switch (role) {
								case 'Admin': {
									window.location.replace('/adminPanel');
								}
									break;
								case 'Client': {
									window.location.replace('/userPanel');
								}
									break;
							}
						}
					});
			}
		});
};

export const singOutToken = (action) => {
	const access_token = localStorage.getItem('access_token');
	if (access_token) {
		localStorage.removeItem('access_token');
		window.location.replace('/');
		action();
	}
};

export const registerUser = (registerModel) => {
	return axios
		.post(REGISTRATION_USER_URL, registerModel);
};