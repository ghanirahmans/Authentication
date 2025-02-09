const User = require("../models/User");

const getUser = async (request, h) => {
	try {
		const user = await User.findById(request.params.id).select("password");
		if (!user) {
			return h.response({ massage: "User tidak di temukan" }).code(404);
		}
		return h.response(user).code(200);
	} catch (err) {
		return h.response({ massage: "Terjadi kesalahan" }).code(500);
	}
};

module.exports = getUser;
