const express = require('express')
const colors = require('colors')
const morgan = require("morgan")
const {config} = require('dotenv')
const connectDB = require('./config/db')







const app = express()
config();
app.use(morgan('dev'))
app.use(express.json())

connectDB()


//Routes

app.get('/',(req,res)=>{
    res.status(200).send({
        massege: "Server Start in HomePage"
    })
})

const PORT = process.env.PORT || 2589

app.listen(PORT,()=>{
    console.info(`Server ${process.env.NODE_MODE} Running in ${PORT}`.bgGreen.white)
})

