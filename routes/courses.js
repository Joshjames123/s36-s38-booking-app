const express = require('express');
const route = express.Router();
const CourseController = require('../controller/courses')
const auth = require('../auth');

//destructure the actual function that we need to use

const { verify, verifyAdmin } = auth;

//Route for Creating a course
route.post('/create', verify, verifyAdmin, (req, res) => {
	console.log("here")
	CourseController.addCourse(req.body).then(result => res.send(result))
})


//Rerive all courses
route.get('/all', verify, verifyAdmin, (req, res) => {
	CourseController.getAllCourses().then(result => res.send(result));
})

//Retrive all ACTIVE courses
route.get('/active', (req, res) => {
	CourseController.getAllActive().then(result => res.send(result));
})


//Retriving a SECIFIC course
//req.params (is short for a parameter)
//" /:parameterName"

route.get('/:courseId', (req, res) => {
	console.log(req.params.courseId)
	//we can retrive the course ID by accessing the request's "params" property which conttains all the parameters provided via the URL
	CourseController.getCourse(req.params.courseId).then(result => res.send(result));
})



//Route for UPDATING a course
route.put('/:courseId', verify, verifyAdmin, (req, res) => {
	CourseController.updateCourse(req.params.courseId, req.body).then(result => res.send(result));
})
















module.exports = route;