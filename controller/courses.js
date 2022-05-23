const Course = require('../models/Course');

//Create a new course

module.exports.addCourse = (reqBody) => {

	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});

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

module.exports.getAllCourses = () => {
	return Course.find({}).then(result => {
		return result;
	})
}

//Retrive all ACTIVE courses

//users who aren't logged in should also be able to view the course
module.exports.getAllActive = () => {
	return Course.find({ isActive: true}).then(result => {
		return result;
	}).catch(error => error)
}


//Retriveing a specific course

module.exports.getCourse = (reqParams) => {
	return Course.findById(reqParams).then(result => {
		return result;
	}).catch(error => error)
}


//Update a course

module.exports.updateCourse = (courseId, data) => {

	let updatedCourse = {
		name: data.name,
		description: data.description,
		price: data.price
	}
	//

	return Course.findByIdAndUpdate(courseId, updatedCourse).then((course, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	}).catch(error => error)
}