import {getProductsCookies} from "../services/cookies";

const initialState = getProductsCookies('productsCard');

export const products = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_NEW':
			let canReturnDef = false;
			state.forEach((product) => {
				if (product.id === action.id) {
					canReturnDef = true;
					return;
				}
			});
			if (canReturnDef)
				return state;
			else return [
				...state,
				{
					id: action.id,
					count: action.count
				}
			];
		default:
			return state;
	}
};