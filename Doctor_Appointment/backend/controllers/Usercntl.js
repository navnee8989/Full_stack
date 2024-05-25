const userModel = require('../models/usersModel');
const bcryptjs = require("bcryptjs");
const JWT = require('jsonwebtoken');

const registerControl = async (req, res) => {
    try {
        const existingEmail = await userModel.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).send({
                success: false,
                message: `This email is already taken: ${req.body.email}`
            });
        }

        const password = req.body.password;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(200).send({
            success: true,
            data: req.body,
            message: `User registered successfully: ${req.body.email}`
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: error,
            message: `Error registering user: ${error.message}`
        });
    }
};

const loginControl = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: `Email not found: ${req.body.email}`
            });
        }

        const isMatched = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatched) {
            return res.status(400).send({
                success: false,
                message: "Incorrect password"
            });
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({
            success: true,
            message: `Login successful: ${user.email}`,
            data: token
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            data: error,
            message: `Error logging in: ${error.message}`
        });
    }
};

module.exports = { registerControl, loginControl };
