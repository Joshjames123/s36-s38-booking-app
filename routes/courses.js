const express = require('express');
const route = express.Router();
const CourseController = require('../controller/courses')
const auth = require('../auth');


const { verify, verifyAdmin } = auth;

//Route for Creating a course
route.post('/create', verify, verifyAdmin, (req, res) => {
	console.log("here")
	CourseController.addCourse(req.body).then(result => res.send(result))
})


//Rerive all courses
route.get('/all', (req, res) => {
	CourseController.getAllCourses().then(result => res.send(result));
})

//Retrive all ACTIVE courses
route.get('/active', (req, res) => {
	CourseController.getAllActive().then(result => res.send(result));
})


//Retriving a SECIFIC course
route.get('/:courseId', (req, res) => {
	console.log(req.params.courseId)
	CourseController.getCourse(req.params.courseId).then(result => res.send(result));
})



//Route for UPDATING a course
route.put('/:courseId', verify, verifyAdmin, (req, res) => {
	CourseController.updateCourse(req.params.courseId, req.body).then(result => res.send(result));
})


//Archiving a course
route.put('/:courseId/archive', verify, verifyAdmin, (req, res) => {
	CourseController.archiveCourse(req.params.courseId).then(result => res.send(result));
})


//











module.exports = route;