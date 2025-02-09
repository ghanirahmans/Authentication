const authController = require("../controllers/authController");

const authRoutes = [
	{
		method: "POST",
		path: "/register",
		handler: authController.registerUser,
	},
	{
		method: "POST",
		path: "/login",
		handler: authController.loginUser,
	},
];

module.exports = authRoutes;
