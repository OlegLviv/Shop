export const order = (state = {}, action) => {
	switch (action.type) {
		case 'SET_ORDER':
			return action.order;
		case 'CHANGE_ORDER':
			return action.order;
		default :
			return state;
	}
};