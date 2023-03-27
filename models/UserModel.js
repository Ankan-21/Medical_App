const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // status: {
    //     type: Boolean,
    //     default: true
    // },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createAt:{
        type : Date,
        default : Date.now
    },

    // for contact

    emailPass : {
        type : String,
        required :true
    }
    
})

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;