// [SECTION] Modules and Dependencies
	const mongoose = require('mogoose');

// [SECTION] Schema/Blueprint
	//1.Create an instance of a schema to describe the user Data
		//-> first name
		//-> last name
		//-> email address
		//-> password
		//-> mobileNo
		//-> isAdmin (to identify the role on the app)
		//-> enrollments (list of subjects)
	const userSchema = new mongoose.Schema({
		firstName: {
			type: String,
			required: [true, 'First Name is Required']
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is Required']
		},
		email: {
			type: String,
			required: [true, 'Email is Required']
		},
		password: {
			type: String,
			required: [true, 'Password is Required']
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		mobileNo: {
			type: String,
			required: [true, 'Mobile Number is Required']
		},
		enrollments: [
			{
				//every document that will be stored in this array structure would describe a course/subject that a user is enrolled in.
				courseID: {
					type: String,
					required: [true, 'Subject ID is Required']
				},
				enrolledON: {
					type: Date,
					default: new Date()
				}, //date when the student enrolled
				status: {
					type: String,
					default: 'Enrolled'
				} //status of enrollemnt
			}
		]
	})

// [SECTION] Model
	//create a model for the user that will be use as interface for the app to communicate with the Database Management System.
	//SYNTAX: library.model(<Model Name>,<Schema>)
	//Model Name -. will be processed to preduce the name of the collection, by converting all the character in all lowecase and adding 'S' at the end. 'users' => collection name result.
	//expose the data so that it will become usable for the rest of the app.
	module.exports = mongoose.model('User', userSchema);