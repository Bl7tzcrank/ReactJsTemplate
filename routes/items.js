const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Item Model
const Item = require('../models/Item');

// @route 	GET ap/items
// @desc 	Get All Items
// @access 	Public
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(items => res.json(items));
});

// @route 	POST ap/items
// @desc 	Add Item
// @access 	Public
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then(item => res.json(item));
});

// @route 	DELETE ap/items/:id
// @desc 	Delete Item
// @access 	Public
router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	console.log(req.params)
	Item.findById(req.params.id)
		.then(item => item.remove().then(() => res.json({success: true})))
		.catch(err => res.status(404).json({success: false}));
});


module.exports = router;