import {combineReducers} from 'redux';
import {products} from "./products";
import {order} from "./order";

export default combineReducers({products, order});