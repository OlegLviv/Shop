//	GET
export const getIsExistUserUrl = userNameOrEmail => `/api/User/IfUserExist/${userNameOrEmail}`;

export const getUserByNameOrLastNameUrl = (name, pageNumber = 1, pageSize = 5) => `/api/User/GetUserByName/${name}/${pageNumber}/${pageSize}`;

export const getUserByIdUrl = id => `/api/User/GetUserById/${id}`;

export const GET_USER_INFO = '/api/User/userInfo';

export const GET_USER_ROLE = '/api/User/role';

//	POST
export const REGISTRATION_USER = '/api/User/registration';

export const CHANGE_USER_PASSWORD = `/api/User/ChangePassword`;

export const SEND_CHANGE_EMAIL_TOKEN = '/api/User/SendChangeEmailToken';

//	PUT
export const EDIT_USER_PERSONAL_DATA = `/api/User/EditPersonalData`;

export const CHANGE_USER_EMAIL = '/api/User/ChangeEmail';