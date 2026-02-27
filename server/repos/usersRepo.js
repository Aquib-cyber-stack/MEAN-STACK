const User = require('../models/User');

const createUser = async (userData) => {
	try {
		const user = new User(userData);
		await user.save();
		return user;
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const findUserByEmail = async (email) => {
	try {
		const user = await User.findOne({email});
		return user;
	} catch (error) {
		throw new Error(error.message)
	}
}

module.exports = {
	createUser,
	findUserByEmail
}