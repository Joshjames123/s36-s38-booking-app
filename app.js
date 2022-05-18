//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');

//[SECTION] Environment Setup
	dotenv.config();
	let account = process.env.CREDENTIALS;
	const port = process.env.PORT;

//[SECTION] Server Setup
	const app = express();
	
//[SECTION] Database Connection
	mongoose.connect(account)
	const connectStatus = mongoose.connection
	connectStatus.once('open', () => console.log(`Database Connected`));

//[SECTION] Backend Routes
	

//[SECTION] Server Gateway Respose
	app.get('/', (req, res) => {
		res.send('Welcome to Enrollment-System')
	});

	app.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	});