//[SECTIONS] Dependencies and Modules
	const User = require('../models/User')
	const bcrypt = require('bcrypt');
	const dotenv = require('dotenv');
	const auth = require('../auth.js');

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
				return {mesage: 'Failed to Register account'};
			}
		});
	};


//User Authentication

module.exports.loginUser = (data) => {

	return User.findOne({ email: data.email }).then(result => {
		//User does not exist
		if(result == null) {
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(data.password, result.password)

			if(isPasswordCorrect){
				return {accessToken: auth.createAccessToken(result.toObject()) }
			} else {
				return false;
			}
		}
	})
}


//[SECTIONS] Functionalities [RETRIVE] the user details

module.exports.getProfile = (data) => {
	return User.findById(data).then(result => {
		result.password = '';
		return result;
	})
}














//[SECTIONS] Functionalities [UPDATED]

//[SECTIONS] Functionalities [DELETE]