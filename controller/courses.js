const Course = require('../models/Course');

//Create a new course
/*
Steps:
	1. Create a new Course object using the mongoose model and the information from the request body.
	2. Save the new Course to the database.
*/

module.exports.addCourse = (reqBody) => {

	//Create a variable "newCourse" and instantiate the name, description, price
	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});

	//save the created object to our database
	return newCourse.save().then((course, error) => {
		//course creation  is successful or not.
		if (error) {
			return false;
		} else {
			return true;
		}
	}).catch(error => error)

}



//Retrive all courses
//1. Retrive all the courcess from the database

module.exports.getAllCourses = () => {
	return Course.find({}).then(result => {
		return result;
	})
}

//Retrive all ACTIVE courses
//1. Retrive all the courses wih the property isActive: true

//users who aren't logged in should also be able to view the course
module.exports.getAllActive = () => {
	return Course.find({ isActive: true}).then(result => {
		return result;
	}).catch(error => error)
}


//Retriveing a specific course
//1. Retrive the course that matches the course ID provided form the URL

module.exports.getCourse = (reqParams) => {
	return Course.findById(reqParams).then(result => {
		return result;
	}).catch(error => error)
}


//Update a course
/*
Steps:
	1. Create a variable "updatedCourse" which will contain the info retrived from the req.body.
	2. Find and update the course using the coirseId retrived from the req.params and the variable "updateCourse" containing from req.body,
*/


module.exports.updateCourse = (courseId, data) => {
	//specify the fields/properties of the document to be update.
	let updatedCourse = {
		name: data.name,
		description: data.description,
		price: data.price
	}
	//
	//findByIdAndUpdate(document Id, updatesToBeApplied)
	return Course.findByIdAndUpdate(courseId, updatedCourse).then((course, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	}).catch(error => error)
}