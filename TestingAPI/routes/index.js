const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const { BookTicket } = require('../controllers/BookController');

router.post('/',  BookTicket);

module.exports = router;
