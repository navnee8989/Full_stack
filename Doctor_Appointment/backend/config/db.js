const mongoose = require("mongoose")
const colors = require("colors")


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`Database connect in ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log("Database Connection Error",error);
    }
}
module.exports = connectDB