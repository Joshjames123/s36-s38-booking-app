const jwt = require('jsonwebtoken');
const secret = 'CourseBookingAPI';



//Token Creation

module.exports.createAccessToken = (user) =>{

	console.log(user);

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})

}


//Token Verification

module.exports.verify = (req, res, next) => {

	console.log(req.headers.authorization)

	let token = req.headers.authorization;

	if(typeof token === "undefined"){
		return res.send({ auth: "Failed. No token" });
	} else {
		console.log(token);
		token = token.slice(7, token.length)

		jwt.verify(token, secret, function(err, decodedToken) {

			if(err){
				return res.send({
					auth: "Failed",
					message: err.message
				})
			} else {
				console.log(decodedToken);
				req.user = decodedToken

				next();

			}
		})


	}
}

































