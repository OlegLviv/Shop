export const createOrders = (productIds, counts) => {
	if (productIds.length !== counts.length)
		throw new Error('Product ids array length not equals product counts array length');

	const orderArr = [];

	for (const i in productIds) {
		orderArr.push({
			productId: productIds[i],
			count: counts[i]
		});
	}
	return orderArr;
};

export const convertOrderStatus = orderStatus => {
	switch (orderStatus) {
		case 0:
			return 'Нове';
		case 1:
			return 'Переглянуте';
		case 2:
			return 'Відіслано';
		case 3:
			return 'Очікує на отримання';
		case 4:
			return 'Закрито';
	}
};