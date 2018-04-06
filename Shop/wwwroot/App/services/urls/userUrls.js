export const GET_USER_ROLE = '/api/User/role';
export const GET_USER_INFO = '/api/User/userInfo';
export const REGISTRATION_USER = '/api/User/registration';

export const getIsExistUserUrl = (userNameOrEmail) => `/api/User/IfUserExist/${userNameOrEmail}`;