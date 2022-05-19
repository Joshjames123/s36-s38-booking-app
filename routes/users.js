//[SECTIONS] Dependencies and Modules
	const exp = require('express'); // needed library to impliment a new route
	const controller = require('../controller/users'); //controller component that holds all the business logic aspect of out app.

//[SECTIONS] Routing Component
	//implement a new routing system dedicated for the users collection.
	const route = exp.Router();

//[SECTIONS] Routes- POST
	route.post('/register', (req, res) => {
		console.log(req.body);
	});
//[SECTIONS] Routes- GET
//[SECTIONS] Routes- PUT
//[SECTIONS] Routes- DEL
//[SECTIONS] Expose Route System
	module.exports = route;