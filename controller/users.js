//[SECTIONS] Dependencies and Modules
	const User = require('../models/User') //model for user, this is needed as the interface between the app and database.

//[SECTIONS] Functionalities [CREATE]
	//1. Register New Account
	module.exports.register = (userData) => {
		let fName = userData.firstName;
		let lName = userData.lastName;
		let email = userData.email;
		let passW = userData.password;
		let mobil = userData.mobileNo;
		//create a new instance of an object appended with the model, for us to create a new document that will inherit properties stated inside the user schema.
		let newUser = new User({
			firstName: fName,
			lastName: lName,
			email: email,
			password: passW,
			mobileNo: mobil
		})
		//save this new document inside the database and chan a thenable expression to handle the outcome of the promise when saving the new data.
		return newUser.save().then((user, err) => {
			//create a selection control structure to determine the response between the 2 states.
			if (user) {
				return user;
			} else {
				return 'Failed to Register account';
			}
		}); //assign router
	};

//[SECTIONS] Functionalities [RETRIVE]

//[SECTIONS] Functionalities [UPDATED]

//[SECTIONS] Functionalities [DELETE]