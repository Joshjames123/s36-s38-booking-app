//[SECTIONS] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controller/users');

//[SECTIONS] Routing Component
	const route = exp.Router();

//[SECTIONS] Routes- POST
	route.post('/register', (req, res) => {
		console.log(req.body);
		let userData = req.body;
		
		controller.register(userData).then(outcome => {
			res.send(outcome)
		})
	});
//[SECTIONS] Routes- GET
//[SECTIONS] Routes- PUT
//[SECTIONS] Routes- DEL
//[SECTIONS] Expose Route System
	module.exports = route;