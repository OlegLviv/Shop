// todo need add if
export const mapProductQueryToObject = (query) => {
    const obj = {};
    for (let item in query.split(';')) {
        const splitedP = query.split(';')[item];
        const key = splitedP.split('=')[0];
        const value = splitedP.split('=')[1];
        obj[key] = value;
    }
    return obj;
};

export const addObjectQueryToProducts = (products) => {
    for (let product in products) {
        products[product].objectQuery = mapProductQueryToObject(products[product].query);
    }
    return products;
};

export const productColors = () => [
    '#ff2020',
    '#20ff20',
    '#2020ff',
    '#111',
    '#fff'
];