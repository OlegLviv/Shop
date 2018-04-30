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