export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProducts/${ids}`;

export const getProductsUrlByQuery = (category, subCategory, priceFrom, priceTo, query) => `/api/product/GetProducts/${category}/${subCategory}/${priceFrom}/${priceTo}/${query}`;