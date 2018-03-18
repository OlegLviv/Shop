import axis from 'axios';

const headerToken = token => ({
	Authorization: `Bearer ${token}`
});

const access_token = localStorage.getItem('access_token');

export const api = () => {
	if (!access_token) {
		window.location.replace(`/logIn`);
		return null;
	}
	else {
		return axis.create({
			headers: headerToken(access_token),
		});
	}
};


export const apiWithotRedirect = () => {
	return axis.create({
		headers: headerToken(access_token)
	});
};