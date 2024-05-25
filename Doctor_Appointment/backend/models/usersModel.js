const mongoose = require('mongoose')


const userShcema = mongoose.Schema({
        username:{
            type: String,
            required:[true,"Feild Not be A Empty"]
        },
        email:{
            type: String,
            required:[true,"Email feild Require"]
        },
        password:{
            type:String,
            required:[true,"Password feild Are require"]
        }
})
const userModel = mongoose.model("users",userShcema)
module.exports = userModel