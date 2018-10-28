import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from './types';
import store from './../store';

export const getUsers = () => dispatch => {
	store.dispatch(setUsersLoading());
	axios
		.get('/users/users', { headers: { Authorization: localStorage.getItem('id_token')}})
		.then(res => {
			store.dispatch({
				type: GET_USERS,
				payload: res.data.users
			})
		}
		)
};

export const deleteUser = (id) => dispatch => {
	return new Promise(function(resolve, reject){
		axios
			.delete('/users/user/' + id , { headers: { Authorization: localStorage.getItem('id_token')}})
			.then(res => {
				store.dispatch({
					type: DELETE_USER,
					payload: id
				})
				console.log(id)
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
};

export const addUser = (user) => dispatch => {
	return new Promise(function(resolve, reject){
		axios
			.post('/users/user',  user , { headers: { Authorization: localStorage.getItem('id_token')}})
			.then(res => {
				if(res.data.success){
					store.dispatch({
						type: ADD_USER,
						payload: res.data.newUser
					})
				}
				console.log(res.data)
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})
	})
};

export const setUsersLoading = () => {
	return{
		type: USERS_LOADING
	}
}