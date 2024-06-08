const express = require('express');
const { gstController } = require('../controllers/gstController');
const router = express.Router();

router.get('/', gstController);

module.exports = router;
