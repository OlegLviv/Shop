import {getProductsOutOfCookies} from "../services/cookies";

const initialState = getProductsOutOfCookies('productsCard');

export const products = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_NEW':
			return [
				...state,
				{
					id: action.id,
					count: Number(action.count)
				}
			];
		default:
			return state;
	}
};