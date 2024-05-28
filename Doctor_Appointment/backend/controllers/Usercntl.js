const userModel = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const colors = require("colors");

const registerControl = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if all required fields are present
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and username are required",
      });
    }

    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `This email is already taken: ${email}`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: `User registered successfully: ${email}`,
    });
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Error registering user: ${error.message}`,
    });
  }
};

const loginControl = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all required fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Email not found: ${email}`,
      });
    }

    // Compare the password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: `Login successful: ${email}`,
      data: { token: token, username: user.username },
    });
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    res.status(500).json({
      success: false,
      message: `Error logging in: ${error.message}`,
    });
  }
};

// const authControl = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ _id: req.userID });
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         message: "User retrieved successfully",
//         data: {
//           username: user.username,
//           email: user.email,
//         },
//       });
//     }
//   } catch (error) {
//     console.error(`Error in AuthController: ${error.message}`);
//     res.status(500).json({
//       success: false,
//       message: "Error in AuthController",
//     });
//   }
// };

module.exports = { registerControl, loginControl };
