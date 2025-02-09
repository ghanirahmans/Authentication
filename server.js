require("dotenv").config();
const Hapi = require("@hapi/hapi");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const init = async () => {
	connectDB();

	const server = Hapi.server({
		port: process.env.PORT || 5000,
		host: "localhost",
	});

	server.route([...authRoutes, ...userRoutes]);

	await server.start();
	console.log(`Server running on ${server.info.uri}`);
};

init().catch((err) => console.error(err));
