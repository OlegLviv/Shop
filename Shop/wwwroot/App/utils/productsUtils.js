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
		// Backs
		case 'Рюкзаки для дошкільнят':
			return 'backpacks-for-preschoolers';
		case 'Рюкзаки для школярів':
			return 'backpacks-for-schoolchildren';
		case 'Рюкзаки для дорослих':
			return 'backpacks-for-adults';
		case 'Рюкзаки для перевзуття':
			return 'backpacks-for-dressing';
		case 'Дитячі сумочки':
			return 'baby-handbags';

		//	Stationery
		case 'Пенали':
			return 'pencil-cases';
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
			return 'decorative-boxes';
		case 'Статуетки':
			return 'figures';

		//	Books
		case 'Енциклопедії':
			return 'encyclopedias';
		case 'Художня література':
			return 'fiction';
		case 'Дитяча художня література':
			return 'childrens-fiction';
		case 'Психологія':
			return 'psychology';
		case 'Релігійна література':
			return 'religious-literature';
		case 'Дитяча релігійна література':
			return 'childrens-religious-literature';
		case 'Казки':
			return 'tales';
		case 'Книжки для малят':
			return 'kids-books';
	}
};

export const normalizeRouteToSubCategory = routeValue => {
	switch (routeValue) {
		// Backs
		case 'backpacks-for-preschoolers':
			return 'Рюкзаки для дошкільнят';
		case 'backpacks-for-schoolchildren':
			return 'Рюкзаки для школярів';
		case 'backpacks-for-adults':
			return 'Рюкзаки для дорослих';
		case 'backpacks-for-dressing':
			return 'Рюкзаки для перевзуття';
		case 'baby-handbags':
			return 'Дитячі сумочки';

		//	Stationery
		case 'pencil-cases':
			return 'Пенали';
		case 'shingles-elastics-rulers':
			return 'Стругалки, резинки, лінійки';
		case 'schoolFolders':
			return 'Папки шкільні';
		case 'officeFolders':
			return 'Папки офісні';
		case 'copyBooks':
			return 'Зошити';
		case 'diaries':
			return 'Щоденники';
		case 'office-paper':
			return 'Папір офісний';
		case 'notebooks':
			return 'Блокноти';
		case 'stickers':
			return 'Стікери';
		case 'dictionaries':
			return 'Словники';
		case 'colored-paper-and-cardboard':
			return 'Кольоровий папір і картон';
		case 'stands-for-books':
			return 'Підставки для книг';
		case 'pens':
			return 'Ручки';
		case 'stands-for-pens':
			return 'Підставки для ручок';
		case 'pencils':
			return 'Олівці';
		case 'flomasters':
			return 'Фломастери';
		case 'paints-and-brushes':
			return 'Фарби і пензлики';
		case 'markers':
			return 'Маркери';
		case 'correctors':
			return 'Коректори';
		case 'plasticine':
			return 'Пластилін';
		case 'glue':
			return 'Клей';
		case 'scotch-tape':
			return 'Скотч';
		case 'calculators':
			return 'Калькулятори';
		case 'scissors-and-knives':
			return 'Ножиці і ножі канц.';
		case 'schoolSupplies':
			return 'Шкільне приладдя';
		case 'officeSupplies':
			return 'Офісне приладдя';
		case 'zno':
			return 'ЗНО';

		//	Gifts
		case 'casket':
			return 'Шкатулки';
		case 'decorative-boxes':
			return 'Декоративні коробочки';
		case 'figures':
			return 'Статуетки';

		//	Books
		case 'encyclopedias':
			return 'Енциклопедії';
		case 'fiction':
			return 'Художня література';
		case 'childrens-fiction':
			return 'Дитяча художня література';
		case 'psychology':
			return 'Психологія';
		case 'religious-literature':
			return 'Релігійна література';
		case 'childrens-religious-literature':
			return 'Дитяча релігійна література';
		case 'tales':
			return 'Казки';
		case 'kids-books':
			return 'Книжки для малят';
	}
};

export const normalizeCategoryToRoute = category => {
	switch (category) {
		case 'Рюкзаки. Сумочки':
			return 'backpacks-handbags';
		case 'Канцтовари':
			return 'stationery';
		case 'Подарунки':
			return 'gifts';
		case 'Книги':
			return 'books';
	}
};

export const normalizeRouteToCategory = routeValue => {
	switch (routeValue && routeValue.toLowerCase()) {
		case 'backpacks-handbags':
			return 'Рюкзаки. Сумочки';
		case 'stationery':
			return 'Канцтовари';
		case 'gifts':
			return 'Подарунки';
		case 'books':
			return 'Книги';
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
	backs: [
		'Рюкзаки для дошкільнят',
		'Рюкзаки для школярів',
		'Рюкзаки для дорослих',
		'Рюкзаки для перевзуття',
		'Дитячі сумочки'
	],
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
		'Енциклопедії',
		'Художня література',
		'Дитяча художня література',
		'Психологія',
		'Релігійна література',
		'Дитяча релігійна література',
		'Казки',
		'Книжки для малят'
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
