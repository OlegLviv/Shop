export const guid = () => {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const normalizeNavCategoryToRoute = (subCategory) => {
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

export const objectToArrayKeys = (obj) => Object.keys(obj).map(i => i);
