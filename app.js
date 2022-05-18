//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');

//[SECTION] Environment Setup
	const port = 4000;

//[SECTION] Server Setup
	const app = express();

//[SECTION] Database Connection
	mongoose.connect('mongodb+srv://joshjames123:admin123@cluster0.ldn4y.mongodb.net/?retryWrites=true&w=majority')
	//check the connection status
	const connectStatus = mongoose.connection
	//lets checj if the connection emitted an 'open' event.
	connectStatus.once('open', () => console.log(`Database Connected`));

//[SECTION] Backend Routes
	

//[SECTION] Server Gateway Respose
	app.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	})