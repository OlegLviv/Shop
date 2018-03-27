export const getProductUrlByCatSubCat = (category, subCategory) => `/api/product/GetProducts/${category}/${subCategory}`;

export const getProductsUrlByIds = (ids) => `/api/product/GetProducts/${ids}`;