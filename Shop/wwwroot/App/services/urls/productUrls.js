export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductUrlById = (productId) => `/api/product/GetProduct/${productId}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProductsByIds/${ids}`;

export const getProductsUrlByName = (name, pageNumber = 1, pageSize = 16) => `/api/product/GetProducts/${name}/${pageNumber}/${pageSize}`;

export const getProductsUrlByQuery = (category, subCategory, priceFrom, priceTo, query = ' ', pageNumber = 1, pageSize = 16, sortingType = 0) => `/api/product/GetProducts/${category}/${subCategory}/${priceFrom}/${priceTo}/${query}/${pageNumber}/${pageSize}/${sortingType}`;

export const SEND_FEEDBACK_URL = '/api/product/SendFeedback';

export const getProductFeedbackUrlById = (productId) => `/api/product/GetProductFeedback/${productId}`;

export const getProductPropsUrl = (subCategory) => `/api/product/GetProductProperties/${subCategory}`;

export const ADD_PRODUCT_URL = '/api/product/AddProduct';