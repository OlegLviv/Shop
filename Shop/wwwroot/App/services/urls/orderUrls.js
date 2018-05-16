//	GET
export const getAllOrdersUrl = (pageNumber = 1, pageSize = 16, orderStatus = 0) => `/api/order/getAllOrders/${pageNumber}/${pageSize}/${orderStatus}`;

export const getOwnOrdersUrl = (pageNumber = 1, pageSize = 16, orderStatus = 0) => `/api/order/getOwnOrders/${pageNumber}/${pageSize}/${orderStatus}`;

export const getOrderUrl = id => `/api/order/getOrder/${id}`;

//	POST
export const CREATE_ORDER_URL = '/api/order/createOrder';

export const CREATE_USER_ORDER_URL = '/api/order/CreateUserOrder';

//	PUT
export const getChangeOrderStatusUrl = (id, orderStatus) => `/api/order/ChangeOrderStatus/${id}/${orderStatus}`;