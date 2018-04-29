export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const objectToArrayKeys = (obj) => {
    if (!obj)
        return;
    return Object.keys(obj).map(i => i);
};

export const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

export const clearObjectProps = (obj) => {
    if (!obj)
        return;
    Object.keys(obj).map(i => delete obj[i]);
};

export const arrayDiff = (arr, arrS) => {
    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) < 0;
        });
    };
    return arr.diff(arrS);
};

export const toUpperFirstCharInArray = array => {
	if (!array)
		return;

	const newArr = [];
	for (const i in array) {
		newArr.push(`${array[i][0].toUpperCase()}${array[i].slice(1)}`);
	}

	return newArr;
};

export const toUpperFirstChar = value => {
	if (!value)
		return;

	return `${value[0].toUpperCase()}${value.slice(1)}`;
};