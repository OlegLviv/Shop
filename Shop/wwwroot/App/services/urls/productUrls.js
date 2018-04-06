export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductUrlById = (productId) => `/api/product/GetProduct/${productId}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProductsByIds/${ids}`;

export const getProductsUrlByName = (name) => `/api/product/GetProducts/${name}`;

export const getProductsUrlByQuery = (category, subCategory, priceFrom, priceTo, query = ' ', pageNumber = 1, pageSize = 16, sortingType = 0) => `/api/product/GetProducts/${category}/${subCategory}/${priceFrom}/${priceTo}/${query}/${pageNumber}/${pageSize}/${sortingType}`;

export const sendFeedbackUrl = '/api/product/SendFeedback';

export const getProductFeedbackById = (productId) => `/api/product/GetProductFeedback/${productId}`;