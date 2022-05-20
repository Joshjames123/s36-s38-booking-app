//[SECTIONS] Dependencies and Modules
	const User = require('../models/User') //model for user, this is needed as the interface between the app and database.
	const bcrypt = require('bcrypt'); //acquire the bycrypt library to perform hashing on a data.
	const dotenv = require('dotenv');

//[SECTION] Environment Variables Setup
	dotenv.config()
	const asin = Number(process.env.SALT);
	//the reason for the error has something with *data types*. every piece of information comming from a ".env" by default is a STRING data type.
	//to solve this issue convert string into a number: there are 2 methids in Jabascript that will allow us to execute this task.
		//parseInt() and Number()

//[SECTIONS] Functionalities [CREATE]
	//1. Register New Account
	module.exports.register = (userData) => {
		let fName = userData.firstName;
		let lName = userData.lastName;
		let email = userData.email;
		let passW = userData.password;
		let mobil = userData.mobileNo;
		//create a new instance of an object appended with the model, for us to create a new document that will inherit properties stated inside the user schema.
		console.log(typeof asin)
		//we need to perform data hashing on the passwrd of the user, to hide it's original/real value , however we need to be able to execute this task ====

		//SYNTAX: bcrypt.hashSync(value,salt);
			//value -> the data to be hashed/mask.
			//salt -> (number daya type) this will identify the number of rounds that will define how many time the data will be processed to produce a new secured hiddedn value.
		let newUser = new User({
			firstName: fName,
			lastName: lName,
			email: email,
			password: bcrypt.hashSync(passW, asin),
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