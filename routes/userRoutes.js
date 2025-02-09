const getUser = require("../controllers/userController");

const userRoutes = [
	{
		method: "GET",
		path: "/user/{id}",
		handler: getUser,
	},
];

module.exports = userRoutes;
