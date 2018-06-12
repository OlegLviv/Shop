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

export const priceRange = {
	minPrice: 0,
	maxPrice: 10000
};

export const normalizeSubCategoryToRoute = subCategory => {
	switch (subCategory) {
		//	Stationery
		case 'Пенали':
			return 'pencils';
		case 'Стругалки, резинки, лінійки':
			return 'shingles-elastics-rulers';
		case 'Папки шкільні':
			return 'schoolFolders';
		case 'Папки офісні':
			return 'officeFolders';
		case 'Зошити':
			return 'copyBooks';
		case 'Щоденники':
			return 'diaries';
		case 'Папір офісний':
			return 'office-paper';
		case 'Блокноти':
			return 'notebooks';
		case 'Стікери':
			return 'stickers';
		case 'Словники':
			return 'dictionaries';
		case 'Кольоровий папір і картон':
			return 'colored-paper-and-cardboard';
		case 'Підставки для книг':
			return 'stands-for-books';
		case 'Ручки':
			return 'pens';
		case 'Підставки для ручок':
			return 'stands-for-pens';
		case 'Олівці':
			return 'pencils';
		case 'Фломастери':
			return 'flomasters';
		case 'Фарби і пензлики':
			return 'paints-and-brushes';
		case 'Маркери':
			return 'markers';
		case 'Коректори':
			return 'correctors';
		case 'Пластилін':
			return 'plasticine';
		case 'Клей':
			return 'glue';
		case 'Скотч':
			return 'scotch-tape';
		case 'Калькулятори':
			return 'calculators';
		case 'Ножиці і ножі канц.':
			return 'scissors-and-knives';
		case 'Шкільне приладдя':
			return 'schoolSupplies';
		case 'Офісне приладдя':
			return 'officeSupplies';
		case 'ЗНО':
			return 'zno';

		//	Gifts
		case 'Шкатулки':
			return 'casket';
		case 'Декоративні коробочки':
			return 'decorativeBoxes';
		case 'Статуетки':
			return 'figures';

		//	Books
		case 'Енциклопедії':
			return 'encyclopedias';
	}
};

export const normalizeCategoryToRoute = category => {
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


export const getSubCategories = category => {
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
		'Пенали',
		'Стругалки, резинки, лінійки',
		'Папки шкільні',
		'Папки офісні',
		'Зошити',
		'Щоденники',
		'Папір офісний',
		'Блокноти',
		'Стікери',
		'Словники',
		'Кольоровий папір і картон',
		'Підставки для книг',
		'Ручки',
		'Підставки для ручок',
		'Олівці',
		'Фломастери',
		'Фарби і пензлики',
		'Маркери',
		'Коректори',
		'Пластилін',
		'Клей',
		'Скотч',
		'Калькулятори',
		'Ножиці і ножі канц.',
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

export const createProductQueryByObject = obj => {
	if (!obj)
		return;
	return Object.keys(obj).map(i => i.concat(`=${obj[i]}`)).join(';');
};

export const createProductsQueryByObject = obj => {
	if (!obj)
		return;
	return Object.keys(obj).map(i => i.concat(`=${obj[i].join(',')}`)).join(';');
};

export const formateQueryDictionary = (key, value, dictionary) => {
	if (!dictionary)
		dictionary = {};

	if (dictionary[key]) {
		dictionary[key].push(value);
	}
	if (!dictionary[key]) {
		dictionary[key] = [];
		dictionary[key].push(value);
	}
	console.log(dictionary);
	return dictionary;
};

export const formateQueryDictionaryWithRemove = (key, value, dictionary) => {
	if (!dictionary)
		return;

	const indexForDel = dictionary[key].indexOf(value);
	dictionary[key].splice(indexForDel, indexForDel === 0 ? 1 : indexForDel);

	if (dictionary[key].length === 0) {
		delete dictionary[key];
	}
	console.log('rem', dictionary);
	return dictionary;
};
