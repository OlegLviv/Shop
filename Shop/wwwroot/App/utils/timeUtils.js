export const convertDateToDateString = date => {
	if (isNaN(date))
		return '';

	return new Date(date * 1000).toLocaleDateString();
};

export const convertDateToTimeString = date => {
	if (isNaN(date))
		return '';
	const dateObj = new Date(date * 1000);
	let minutes = dateObj.getMinutes();

	if (minutes < 10)
		minutes = `0${minutes}`;

	return `${dateObj.getHours()}:${minutes}`;
};