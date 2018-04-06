export const normalizeLogInResponse = (resp, userName, password) => {
	if (resp.status === 400) {
		switch (resp.data) {
			case 'Incorrect user name or email':
				userName('Невірний email або логін');
				break;
			case 'Incorrect password':
				password('Невірний пароль');
				break;
		}
	}
};