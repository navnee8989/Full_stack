const express = require('express')
const {registerControl,loginControl} = require('../controllers/Usercntl')

const router = express.Router()

router.post('/register',registerControl)
router.post('/login',loginControl)

module.exports = router