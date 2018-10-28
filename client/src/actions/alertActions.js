import store from './../store';
import { ALERT, DEALERT } from './types';

export const flash = (props, time) => dispatch => {
	store.dispatch({
		type: ALERT,
		payload: props
	});
	setTimeout(function(){ 
		store.dispatch({
		type: DEALERT
	})}
		, time);
};