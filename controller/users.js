//[SECTIONS] Dependencies and Modules
	const User = require('../models/User')
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');

//[SECTION] Environment Variables Setup
	dotenv.config()
	const asin = Number(process.env.SALT);


//[SECTIONS] Functionalities [CREATE]
	//1. Register New Account
	module.exports.register = (userData) => {
		let fName = userData.firstName;
		let lName = userData.lastName;
		let email = userData.email;
		let passW = userData.password;
		let mobil = userData.mobileNo;

		let newUser = new User({
			firstName: fName,
			lastName: lName,
			email: email,
			password: bcrypt.hashSync(passW, asin),
			mobileNo: mobil
		})
		
		return newUser.save().then((user, err) => {
			
			if (user) {
				return user;
			} else {
				return 'Failed to Register account';
			}
		});
	};

//[SECTIONS] Functionalities [RETRIVE]

//[SECTIONS] Functionalities [UPDATED]

//[SECTIONS] Functionalities [DELETE]