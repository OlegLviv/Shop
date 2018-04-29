//	GET
export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductUrlById = productId => `/api/product/GetProduct/${productId}`;

export const getProductsUrlByIds = ids => `/api/product/GetProductsByIds/${ids}`;

export const getProductsUrlByName = (name, pageNumber = 1, pageSize = 16) => `/api/product/GetProducts/${name}/${pageNumber}/${pageSize}`;

export const getProductsUrlByQuery = (category, subCategory, priceFrom, priceTo, query = ' ', pageNumber = 1, pageSize = 16, sortingType = 0) => `/api/product/GetProducts/${category}/${subCategory}/${priceFrom}/${priceTo}/${query}/${pageNumber}/${pageSize}/${sortingType}`;

export const getProductFeedbackUrlById = productId => `/api/product/GetProductFeedback/${productId}`;

export const getProductPropsUrl = subCategory => `/api/product/GetProductProperties/${subCategory}`;

export const getProductImageCountUrl = productId => `/api/product/GetProductImageCount/${productId}`;

//	POST
export const ADD_PRODUCT_URL = '/api/product/AddProduct';

export const SEND_FEEDBACK_URL = '/api/product/SendFeedback';

export const ADD_PROPERTY = '/api/product/AddProperty';

export const ADD_POSSIBLE_PROPERTY = '/api/product/AddPossibleProperty';

// PUT

export const EDIT_PRODUCT_URL = '/api/product/EditProduct';

//	DELETE
export const getProductUrlForDelete = productId => `/api/product/DeleteProduct/${productId}`;

export const getProductUrlForDeleteImage = (productId, number = 0) => `/api/product/DeleteProductImage/${productId}/${number}`;

export const getProductUrlForDeleteProperty = (subCategory, propName) => `/api/product/DeleteProperty/${subCategory}/${propName}`;