const express = require('express');
const { registerControl, loginControl, authControl } = require('../controllers/Usercntl');
const authMiddleware = require('../middlewares/authMiddleware');
const userModel = require('../models/usersModel');

const router = express.Router();

router.post('/register', registerControl);
router.post('/login', loginControl);
router.post('/getUserData', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        } else {
            res.status(200).send({
                success: true,
                message: "User Data Found",
                data: {
                    username: user.username,
                    email: user.email
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error In Get The User ${error}`,
        });
    }
});

module.exports = router;