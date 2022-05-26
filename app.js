//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const cors = require('cors');
	const dotenv = require('dotenv');
	const userRoutes = require('./routes/users');
	const courseRoutes = require('./routes/courses');

//[SECTION] Environment Setup
	dotenv.config();
	let account = process.env.CREDENTIALS;
	const port = process.env.PORT;

//[SECTION] Server Setup
	const app = express();
	app.use(express.json());
	app.use(cors()) // it enables all origin/address/URL if the client request
	
//[SECTION] Database Connection
	mongoose.connect(account)
	const connectStatus = mongoose.connection
	connectStatus.once('open', () => console.log(`Database Connected`));

//[SECTION] Backend Routes
	app.use('/users', userRoutes);
	app.use('/courses', courseRoutes);

//[SECTION] Server Gateway Respose
	app.get('/', (req, res) => {
		res.send('Welcome to Booking Course Application!')
	});

	app.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	});