import axis from 'axios';

const headerToken = token => ({
	Authorization: `Bearer ${token}`
});

export const api = () => {
	const access_token = localStorage.getItem('access_token');
	if (!access_token) {
		window.location.replace(`/loginIn`);
		return null;
	}
	else {
		return axis.create({
			headers: headerToken(access_token)
		});
	}
};