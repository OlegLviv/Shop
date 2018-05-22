//	GET
export const getIsExistUserUrl = userNameOrEmail => `/api/User/IfUserExist/${userNameOrEmail}`;

export const getUserByNameOrLastNameUrl = (name, pageNumber = 1, pageSize = 5) => `/api/User/GetUserByName/${name}/${pageNumber}/${pageSize}`;

export const getUserByIdUrl = id => `/api/User/GetUserById/${id}`;

export const GET_USER_INFO_URL = '/api/User/userInfo';

export const GET_USER_ROLE_URL = '/api/User/role';

//	POST
export const REGISTRATION_USER_URL = '/api/User/registration';

export const CHANGE_USER_PASSWORD_URL = `/api/User/ChangePassword`;

export const SEND_CHANGE_EMAIL_TOKEN_URL = '/api/User/SendChangeEmailToken';

export const SEND_CONFIRM_EMAIL_CODE = '/api/user/SendConfirmEmailCode';

//	PUT
export const EDIT_USER_PERSONAL_DATA_URL = `/api/User/EditPersonalData`;

export const CHANGE_USER_EMAIL_URL = '/api/User/ChangeEmail';

export const CHANGE_USER_PHONE_URL = '/api/User/ChangePhone';