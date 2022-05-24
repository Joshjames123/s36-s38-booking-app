//[SECTIONS] Dependencies and Modules
	const User = require('../models/User')
	const Course = require('../models/Course')
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

//Enrollment register user
/*
Enrollment steps
	1. Look for the user by its ID.
	-push the details of the course we're trying to enroll in. We'll push the details to a new enrollment subdocument in our user.
	2.Look for the course by its ID.
	-push the details of the enrollee/user who's trying to enfoll. we'll push  to a new enrollees subdocument in our course.

	3.When both saving documents are successful, we send a message to a client. true if successful, false if not.
*/

module.exports.enroll = async (req,res) => {
	//console.log("test enroll route");
	console.log(req.user.id); // the user's id from the decoded token after verify()
	console.log(req.body.courseId); // the course ID from our request body

	//Process stops here and sends respose if user an admin
	if(req.user.isAdmin) {
		return res.send({message: "Action Forbidden"})
	}

	//get the user's ID to save the courseId inside the enrollments field

	let isUserUpdated = await User.findById(req.user.id).then(user => {
		//add the courseId in an object and push that object into user's enrollments array:

		let newEnrollment = {
			courseId: req.body.courseId
		}

		user.enrollments.push(newEnrollment);

		//save the changes made to our user document
		return user.save().then(user => true).catch(err => err.message)

		//if isUserUpdated douse not containt the boolean true, we will stop our process and return a message to our client
		if(isUserUpdated !== true) {
			return res.send({ message: isUserUpdated})
		}

	});

	//find the course Id that we will need to push to our enrollee
	let isCourseUpdated = await Course.findById(req.body.courseId).then(course => {
			//Create an object which will be push to enrollees array/field
			let enrollee = {
				userId: req.user.id
			}

			course.enrollees.push(enrollee);
			//save the course document
			return course.save().then(course => true).catch(err => err.message)

			if(isCourseUpdated !== true) {
				return res.send({ message: isCourseUpdated })
			}
	})

	//send message to the client that we have successfully enrolled our user if both isUserUpdated and isCourseUpdate contain the bollean true.

	if(isUserUpdated && isCourseUpdated) {
		return res.send({ message: "Rnrolled Successfully" })
	}
}



//Get user's enrollemnts

module.exports.getEnrollments = (req, res) => {
	User.findById(req.user.id)
	.then(result => res.send(result.enrollments))
	.catch(err => res.send(err))
}









//[SECTIONS] Functionalities [UPDATED]

//[SECTIONS] Functionalities [DELETE]