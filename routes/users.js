//[SECTIONS] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controller/users');
	//We will import auth ====
	const auth = require('../auth')

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

//[SECTTION] Route for User Authentication(login)

route.post('/login', (req, res) => {
	controller.loginUser(req.body).then(result => res.send(result));
})


//[SECTIONS] Routes- GET the users details
route.get('/details', auth.verify, (req, res) => {
	controller.getProfile(req.user.id).then(result => res.send(result));
})


//Enrole our register users
//only the verified user can enroll in a course
route.post('/enroll', auth.verify, controller.enroll);


//Get logged user's enrollments
route.get('/getEnrollments', auth.verify, controller.getEnrollments);





//[SECTIONS] Routes- PUT
//[SECTIONS] Routes- DEL
//[SECTIONS] Expose Route System
	module.exports = route;