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

export const normalizeSubCategoryToRoute = (subCategory) => {
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
        case 'Ручки':
            return 'pens';
        case 'Олівці':
            return 'pencils';
        case 'Маркери':
            return 'markers';
        case 'Коректори':
            return 'proofreaders';
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

export const normalizecategoryToRoute = (category) => {
    switch (category) {
        case 'Рюкзаки. Сумочки':
            return 'Backpacks Handbags';
        case 'Канцтовари':
            return 'Stationery';
        case 'Подарунки':
            return 'Gifts';
        case 'Книги':
            return 'Books';
    }
};


export const getSubCategories = (category) => {
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
        'Ручки',
        'Олівці',
        'Маркери',
        'Коректори',
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
