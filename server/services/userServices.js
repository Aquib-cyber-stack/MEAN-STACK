const userRepo = require('../repos/usersRepo')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');


const signUp = async (userData) => {
	try {
		const findUser = await userRepo.findUserByEmail(userData.email);
		if (findUser) {
			throw new Error('User already exists');
		}
		const newUser = await userRepo.createUser(userData);
		const token = jwt.sign({ 
			id: newUser._id,
			email: newUser.email,
			imgUrl: newUser.imgUrl,
			username: newUser.username
		}, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRATION });
		return { user : newUser, token };
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

const login = async (email,password) => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}
		const token = jwt.sign({ 
			id: user._id,
			email: user.email,
			imgUrl: user.imgUrl,
			username: user.username
		}, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRATION });
		return { user, token };
	} 
	catch (error) {
		throw new Error(error.message);
	}
}

module.exports = {
	signUp,
	login
}