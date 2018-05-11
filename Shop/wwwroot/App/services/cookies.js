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
	const oldCookie = getCookie(name);
	if (oldCookie === idCountStr) {
		return;
	}
	const oldCookies = oldCookie.split(',');
	for (let cookie in oldCookies) {
		if (oldCookies[cookie] === idCountStr) {
			return;
		}
	}
	if (!oldCookie) {
		document.cookie = name + "=" + idCountStr + ";" + expires + ";path=/";
		return;
	}
	let newCookie = '';
	if (oldCookie) {
		newCookie = oldCookie.concat(`,${idCountStr}`);
	}
	document.cookie = name + "=" + newCookie + ";" + expires + ";path=/";
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

export const getProductsCookies = cname => {
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