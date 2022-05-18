//[SECTION] Dependencies and Modules
	const express = require('express');

//[SECTION] Environment Setup
	const port = 4000;

//[SECTION] Server Setup
	const app = express();

//[SECTION] Database Connection
//[SECTION] Backend Routes
//[SECTION] Server Gateway Respose
	app.listen(port, () => {
		console.log(`API is Hosted port ${port}`);
	})