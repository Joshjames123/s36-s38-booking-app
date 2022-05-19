//[SECTION] Dependencies and Module
	const mongoose = required('mongoose');

//[SECTION] Schema/Blueprint
	//1. identufy what each course in the collection would look like.
		//-> name,
		//-> description
		//-> price
		//-> isActive (determin wether the subject is offerd)
		//-> createdOn (when the subject was included in the database)
		//-> enrollees (students enrolled in each subject)
	const courseSchema = new mongoose.Schema({
		name {
			type: String,
			required: [true, 'is Required']
		},
		description {
			type: String,
			required: [true, 'is Required']
		},
		price {
			type:Number,
			required: [true, 'Course Price is Required']
		},
		isActive {
			type: Boolean,
			default: true
		}, //this is to identify if the subject is currently being offered by the institution.
		createdOn {
			type: Date,
			default: new Date()
		}, //'new Date()' expression instantiates a new date stores the current date and time whenever a course is created in the database.
		enrollees: [
			{
				//each object stored in this array would identify a single student
				userID: {
					type: String,
					required: [true, 'Student ID is Required']
				},
				enrolledON: {
					type: Date,
					default: new Date()
				}
			}
		]
	});

//[SECTION] Model
	//lets produce a model which will be used as interface between the server side app and the database.
	module.exports = mongoose.model('Course', courseSchema)