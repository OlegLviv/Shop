import axios from 'axios';
import {GET_TOKEN} from "./urls/authUrls";

export const logInToken = (userName, password) => {
	const loginModel = {
		userName: userName,
		password: password
	};
	return axios
		.post(GET_TOKEN, loginModel)
		.then(resp => {
			const {token} = resp.data;
			console.log('resp--', resp);
			if (token) {
				localStorage.setItem('access_token', token);
			}
			if (localStorage.getItem('access_token')) {

			}
		})
		.catch(err => {
			console.error(err);
		})
};