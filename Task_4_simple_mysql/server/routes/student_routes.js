const express = require('express')
const { getStudent, getStudnetByID } = require('../controllers/studentController')


// routes object 

const router = express.Router()

// routes
router.get('/studentlist',getStudent)

//Get Student By Id

router.get("/studentlist/:id",getStudnetByID)


// Delete Student By ID
router.delete('/studentlist/:id')


module.exports = router