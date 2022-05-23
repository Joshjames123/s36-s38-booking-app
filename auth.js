const jwt = require('jsonwebtoken');
//User defined string data that will be used to create our JSON web tokens
//Used in the algorithm for encrypting our data which makes it difficult to decode the information without the defined secret keyword
const secret = 'CourseBookingAPI';


//JWT is a way to securely pass information from one part of a server to the frontend or other parts of our application. This will allow us to authorize our users to access or disallow access to certain parts of our app.




//Token Creation
// Analogy: Pack the gift and provide a lock with the secret code as the key

module.exports.createAccessToken = (user) =>{
	//check if we can receive the details of the user from our login
	console.log(user);

	//object to contain some details of our user
	//this will the data within our payload
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	//Generate a JSON web token using the jwt's sign method
	return jwt.sign(data, secret, {})


}


//Token Verification
// Analogy: Receive the gift and open the lock to verify if the sender is legitimate and the gift was not tampered with.

module.exports.verify = (req, res, next) => {
	// the token is retrieved from the request header
	console.log(req.headers.authorization)

	let token = req.headers.authorization;

	//This if statement will first check if the token variable contains undefined or a proper jwt. If its undefined, we will check token's data type with typeof, then send a message to the client.
	if(typeof token === "undefined"){
		return res.send({ auth: "Failed. No token" });
	} else {
		console.log(token);
		//Bearer eyJsdkfjdskfnkdsjdslkfjdskf
		//slice(<startingPosition>, <endPosition> )
		token = token.slice(7, token.length)

		//Validate the token using the "verify" method decrypting the token using the secret code
		jwt.verify(token, secret, function(err, decodedToken) {

				//err will contain the error from decoding your token. This will contain the reason why we will reject the token.

				//If verification of the token is success, then jwt.verify will return the decoded token.
			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})
			} else {
				console.log(decodedToken); //contains the data from our token
				req.user = decodedToken
				//user property will be added to request object and will contain our decodedToken. It can be accessed in the verify


				next();
				//middleware function
				//next() will let us proceed to the next middleware Or controller
			}
		})


	}
}



//verify an admin and will be used also as a middleware

module.exports.verifyAdmin = (req, res, next) => {
	//we can get details from req.user because verifyAdmin comes after verify method.
	//Note: You can only have req.user for any middleware or controller that comes after verify
	if(req.user.isAdmin) {
		//if the logged user, based on his token is an admin, we will proceed to the next middleware/controller.
		next();
	} else {
		return res.send({
			auth: "Failed",
			message: "Action Forbidden"
		})
	}

}




























