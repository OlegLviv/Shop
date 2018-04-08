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

export const priceRange = {
    minPrice: 0,
    maxPrice: 10000
};

export const normalizeNavSubCategoryToRoute = (subCategory) => {
    switch (subCategory) {
        case 'Папки шкільні':
            return 'schoolFolders';
        case 'Папки офісні':
            return 'officeFolders';
        case 'Зошити':
            return 'copyBooks';
        case 'Блокноти':
            return 'notebooks';
        case 'Стікери':
            return 'stickers';
        case 'Словники':
            return 'dictionaries';
        case 'Письмове приладдя':
            return 'writingSupplies';
        case 'Шкільне приладдя':
            return 'schoolSupplies';
        case 'Офісне приладдя':
            return 'officeSupplies';
        case 'ЗНО':
            return 'zno';

        case 'Шкатулки':
            return 'casket';
        case 'Декоративні коробочки':
            return 'decorativeBoxes';
        case 'Статуетки':
            return 'figures';
    }
};

export const normalizeCategory = (category) => {
    switch (category) {
        case 'Рюкзаки. Сумочки':
            return NAVIGATION_SUB_CATEGORIES.backs;
        case 'Канцтовари':
            return NAVIGATION_SUB_CATEGORIES.stationeries;
        case 'Подарунки':
            return NAVIGATION_SUB_CATEGORIES.gifts;
        case 'Книги':
            return NAVIGATION_SUB_CATEGORIES.books;
    }
};

export const NAVIGATION_CATEGORIES = [
    'Рюкзаки. Сумочки',
    'Канцтовари',
    'Подарунки',
    'Книги'
];

export const NAVIGATION_SUB_CATEGORIES = {
    backs: [],
    stationeries: [
        'Папки шкільні',
        'Папки офісні',
        'Зошити',
        'Блокноти',
        'Стікери',
        'Словники',
        'Письмове приладдя',
        'Шкільне приладдя',
        'Офісне приладдя',
        'ЗНО'
    ],
    gifts: [
        'Шкатулки',
        'Декоративні коробочки',
        'Статуетки'
    ],
    books: [
        'Енциклопедії'
    ]
};