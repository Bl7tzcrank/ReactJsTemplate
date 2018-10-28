import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import store from './../store';

export const getItems = () => dispatch => {
	store.dispatch(setItemsLoading());
	axios
		.get('/items', { headers: { Authorization: localStorage.getItem('id_token')}})
		.then(res => {
			store.dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
			console.log(res.data)}
		)
};

export const deleteItem = (id) => dispatch => {
	axios
		.delete('/items/' + id , { headers: { Authorization: localStorage.getItem('id_token')}})
		.then(res => {
			store.dispatch({
				type: DELETE_ITEM,
				payload: id
			})
			console.log(id)}
		)
};

export const addItem = (item) => dispatch => {
	axios
		.post('/items',  item , { headers: { Authorization: localStorage.getItem('id_token')}})
		.then(res => {
			store.dispatch({
				type: ADD_ITEM,
				payload: res.data
			})
			console.log(res.data)}
		)
};

export const setItemsLoading = () => {
	return{
		type: ITEMS_LOADING
	}
}