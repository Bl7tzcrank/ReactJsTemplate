//For the routes in the url
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');

// Register
router.post('/user', passport.authenticate('jwt', {session:false}), (req,res,next) => {
	let newUser = new User({
		username: req.body.username,
		password: req.body.password
	});
	User.addUser(newUser, (err, user) =>{
		if(err){
			res.json({success: false, msg:'Error: User not created.'});
		} else {
			res.json({success: true, newUser: {_id: newUser._id, username: newUser.username}, msg: 'User created.'});
		}
	});
});

// Authenticate
router.post('/authenticate', (req,res,next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err,user) =>{
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found.'});
		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 2000
				});
				res.json({
					success: true,
					msg: 'Authenticated',
					token: 'bearer '+token,
					user: {
						id: user._id,
						username: user.username
					}
				});
			} else{
				return res.json({success: false, msg: 'Wrong Password.'});
			};
		});
	});
});

// Profile (shall be protected by authentication). Put passport... in to protect any route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res,next) => {
	res.json({user: req.user});
});

// Returns all users. Passport protected. 
router.get('/users', passport.authenticate('jwt', {session:false}), (req,res,next) => {
	User.getAllUser((err,users) => {		
		if(err){
			res.json({success: false, msg:'Error: User could not be removed.'});
		} else {
			res.json({success: true, users});
		}
	});
});

router.delete('/user/:id', passport.authenticate('jwt', {session:false}),  (req,res,next) => {
	const id = req.params.id;
	User.deleteUserById(id, (err, obj) => {
		if(err){
			res.json({success: false, msg:'Error: User could not be removed.'});
		} else {
			res.json({success: true, msg:'User removed.'});
		}
	});
	//res.json({success: username});
});

module.exports = router;