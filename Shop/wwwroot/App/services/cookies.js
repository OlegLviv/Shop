import {PRODUCT_OFFERS} from "../constants/cookies";

export const setCookie = (name, value, days) => {
	const d = new Date();
	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const setCookies = (name, values, days) => {
	const d = new Date();
	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	values = values.join(',');
	document.cookie = name + "=" + values + ";" + expires + ";path=/";
};

export const addProductCookies = (name, id, count, days) => {
	const d = new Date();
	const idCountStr = `${id}--${count}`;

	d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

	const expires = "expires=" + d.toUTCString();
	const products = getProductsOutOfCookies(name);
	let newCookie = '';

	if (!products.length) {
		document.cookie = `${name}=${idCountStr};${expires};path=/`;
		return;
	}

	for (const i in products) {
		if (id === products[i].id) {
			products[i].count += count;
			newCookie = products.map(product => `${product.id}--${product.count}`).join(',');
			document.cookie = `${name}=${newCookie};${expires};path=/`;
			return;
		}
	}

	newCookie = products.map(product => `${product.id}--${product.count}`).join(',').concat(`,${idCountStr}`);
	document.cookie = `${name}=${newCookie};${expires};path=/`;
};

export const getCookie = (cname) => {
	const name = cname + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};

export const getProductsOutOfCookies = cname => {
	const prodCookie = getCookie(cname);

	if (!prodCookie)
		return [];

	const idCountArr = prodCookie.split(',');
	const idCountObjArr = [];

	for (const i in idCountArr) {
		idCountObjArr.push({
			id: idCountArr[i].split('--')[0],
			count: Number(idCountArr[i].split('--')[1])
		});
	}
	return idCountObjArr;
};

const isProductIdOffersCookieExist = id => {
	const prodOfferC = getCookie(PRODUCT_OFFERS);
	if (!prodOfferC)
		return false;

	const ids = prodOfferC.split(',');
	for (let i = 0; i < ids.length; i++) {
		if (ids[i] === id)
			return true;
	}
	return false;
};

export const addProductIdOfferCookie = (productId, days) => {
	if (!isProductIdOffersCookieExist(productId)) {
		if (!getCookie(PRODUCT_OFFERS)) {
			setCookie(PRODUCT_OFFERS, productId, days);
			return;
		}

		let cookie = `${getCookie(PRODUCT_OFFERS)},${productId}`;

		if (cookie.split(',').length > 10)
			cookie = productId;

		setCookie(PRODUCT_OFFERS, cookie, days);
	}
};

export const getProductIdOffers = () => getCookie(PRODUCT_OFFERS).split(',');