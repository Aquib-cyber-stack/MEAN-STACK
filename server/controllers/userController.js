const userService = require('../services/userServices');
const jsend = require('jsend');

const signUp = async (req, res) => {
		try {
				const { user , token} = await userService.signUp(req.body);
				res.cookie('token', token, { httpOnly: true });
				res.json(jsend.success({ user , token }));
		} catch (error) {
				res.status(400).json({ message: error.message });
		}
}

const login = async (req, res) => {
		try {
				const { user , token} = await userService.login(req.body.email, req.body.password);
				res.cookie('token', token, { httpOnly: true });
				res.json(jsend.success({ user , token }));
		} catch (error) {
				res.status(400).json({ message: error.message });
		}
}

const logout = (req, res) => {
		res.clearCookie('token' , { httpOnly: true , secure: true , sameSite: 'Strict' });
		res.json(jsend.success({ message: 'Logged out successfully' }));
}

module.exports = { signUp, login , logout };
