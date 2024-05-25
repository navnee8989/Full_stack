const express = require('express')
const colors = require('colors')
const morgan = require("morgan")
const {config} = require('dotenv')
const connectDB = require('./config/db')
const userRouter = require('./routes/userRoute')






const app = express()
config();
app.use(morgan('dev'))
app.use(express.json())

connectDB()


//Routes
app.use('/api/users',userRouter)

const PORT = process.env.PORT || 2589

app.listen(PORT,()=>{
    console.info(`Server ${process.env.NODE_MODE} Running in ${PORT}`.bgGreen.white)
})

