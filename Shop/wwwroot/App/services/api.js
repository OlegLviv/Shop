import axios from 'axios';

const headerToken = token => ({
	Authorization: `Bearer ${token}`
});

export const api = () => {
	if (!localStorage.getItem('access_token')) {
		window.location.replace(`/logIn`);
		return axios;
	}
	else {
		return axios.create({
			headers: headerToken(localStorage.getItem('access_token')),
		});
	}
};

export const apiGet = (url, error) => api()
	.get(url)
	.catch(err => {
		if (err.response.status === 401 || err.response.status === 403)
			window.location.replace('/logIn');
		else {
			console.error(err.response.data);
			error(err);
		}
	});

export const apiPost = (url, body, error) => api()
	.post(url, body)
	.catch(err => {
		if (err.response.status === 401 || err.response.status === 403)
			window.location.replace('/logIn');
		else {
			console.error(err.response.data);
			error(err);
		}
	});

export const apiPut = (url, body, error) => api()
	.put(url, body)
	.catch(err => {
		if (err.response.status === 401 || err.response.status === 403)
			window.location.replace('/logIn');
		else {
			console.error(err.response.data);
			error(err);
		}
	});

export const apiDelete = (url, error) => api()
	.delete(url)
	.catch(err => {
		if (err.response.status === 401 || err.response.status === 403)
			window.location.replace('/logIn');
		else {
			console.error(err.response.data);
			error(err);
		}
	});

export const apiWithoutRedirect = () => {
	if (!localStorage.getItem('access_token'))
		return axios;
	return axios.create({
		headers: headerToken(localStorage.getItem('access_token'))
	});
};