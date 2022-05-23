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
/*
Stepts:
1. Check the database if the user email exists
2. Compare the password provided in the login from with password stored in the data base.
3. Generate/return a JSON web token if the user is successfully logged in and return flase if not.

*/

module.exports.loginUser = (data) => {
	//findOne method returns the first record in the collection that matches the search criteria
	return User.findOne({ email: data.email }).then(result => {
		//User does not exist
		if(result == null) {
			return false;
		} else {
			//User exists
			//'compareSync' method from the bycrypt to used in comparing the non encrypted password from the login and the database password. it return 'true or false'
			const isPasswordCorrect = bcrypt.compareSync(data.password, result.password)

			if(isPasswordCorrect){
				return {accessToken: auth.createAccessToken(result.toObject()) }
			} else {
				//password do not match
				return false;
			}
		}
	})
}


//[SECTIONS] Functionalities [RETRIVE] the user details

/*
1. Find the document in the database using the user's ID.
2. Reassign the password of the returned document to an empty string.
3. return the result back to the client.
*/

module.exports.getProfile = (data) => {
	return User.findById(data).then(result => {
		//change the value of the users password to an empty string
		result.password = '';
		return result;
	})
}














//[SECTIONS] Functionalities [UPDATED]

//[SECTIONS] Functionalities [DELETE]