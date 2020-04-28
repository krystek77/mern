const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	console.log(token);
	jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
		if (error) {
			return res.status(401).json({
				message: 'Failed Auth',
			});
		} else {
			req.userData = decoded;
			next();
		}
	});
};
