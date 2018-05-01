//	GET
export const getOrdersUrl = (pageNumber = 1, pageSize = 16, orderStatus = 0) => `/api/order/getOrders/${pageNumber}/${pageSize}/${orderStatus}`;
//	POST
export const CREATE_ORDER_URL = '/api/order/createOrder';