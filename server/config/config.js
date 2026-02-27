const dotenv = require('dotenv');
dotenv.config();

const config = {
	PORT : process.env.PORT || 3000,
	MONGO_URI: process.env.MONGO_URI,
	CLIENT_URL: process.env.CLIENT_URL,
	JWT : {
		EXPIRATION : process.env.JWT_EXPIRATION,
		SECRET : process.env.JWT_SECRET
	}
}

module.exports = config;