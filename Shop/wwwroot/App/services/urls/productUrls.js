export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductUrlById = (productId) => `/api/product/GetProduct/${productId}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProducts/${ids}`;

export const getProductsUrlByName = (name) => `/api/product/GetProducts/${name}`;

export const getProductsUrlByQuery = (category, subCategory, priceFrom, priceTo, query) => `/api/product/GetProducts/${category}/${subCategory}/${priceFrom}/${priceTo}/${query}`;