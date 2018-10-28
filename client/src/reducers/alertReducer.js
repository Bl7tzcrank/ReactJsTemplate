import { ALERT, DEALERT } from '../actions/types';

const initialState = {
	open: false,
	text: '',
	type: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case ALERT: 
			return{
				...state,
				open: !state.open,
				text: action.payload.text,
				type: action.payload.type
			};
		case DEALERT: 
			return{
				...state,
				open: !state.open,
				text: '',
				type: ''
			}
		default:
			return state;
	}
}