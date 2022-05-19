//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');
	const userRoutes = require('./routes/users') //routing ststem users

//[SECTION] Environment Setup
	dotenv.config();
	let account = process.env.CREDENTIALS;
	const port = process.env.PORT;

//[SECTION] Server Setup
	const app = express();
	app.use(express.json()); //the app should be able to recognize data written in a json format.
	
//[SECTION] Database Connection
	mongoose.connect(account)
	const connectStatus = mongoose.connection
	connectStatus.once('open', () => console.log(`Database Connected`));

//[SECTION] Backend Routes
	app.use(userRoutes);

//[SECTION] Server Gateway Respose
	app.get('/', (req, res) => {
		res.send('Welcome to Booking Course Application')
	});

	app.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	});