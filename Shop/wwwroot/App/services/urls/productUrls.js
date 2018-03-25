export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProduct/${category}/${subCategory}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProducts/${ids}`;