const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const User = require("../models/User");
const { log } = require("debug/src/browser");

exports.registerUser = async (request, h) => {
	const { email, password } = request.payload;

	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
	});

	const { error } = schema.validate({ email, password });
	if (error) return h.response({ message: error.details[0].message }).code(400);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		return h.response({ message: "Registrasi berhasil!" }).code(201);
	} catch (err) {
		return h.response({ message: "Email sudah terdaftar!" }).code(500);
	}
};

exports.loginUser = async (request, h) => {
	const { email, password } = request.payload;

	const user = await User.findOne({ email });
	if (!user) return h.response({ message: "Email tidak terdaftar!" }).code(400);

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return h.response({ message: "Password salah!" }).code(400);

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return h.response({ message: "Login berhasil!", token }).code(200);
};
