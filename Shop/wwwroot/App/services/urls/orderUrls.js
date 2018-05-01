//	GET
export const getOrdersUrl = (pageNumber = 1, pageSize = 16, orderStatus = 0) => `/api/order/getOrders/${pageNumber}/${pageSize}/${orderStatus}`;

export const getOrderUrl = id => `/api/order/getOrder/${id}`;
//	POST
export const CREATE_ORDER_URL = '/api/order/createOrder';