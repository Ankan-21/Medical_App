const mongoose = require("mongoose")
const Schema = mongoose.Schema

const aboutSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    subtitle:{
        type : String,
         required : true
    },
    Image:{
        type:String,
        required:true
    },
    content:{
        type : String,
        required : true
    },
    writer:{
        type : String,
        required : true
    },
   
    status:{
        type : Boolean,
        default : false
    },
    createAt:{
        type : Date,
        default : Date.now
    },
})

const SchemaData = new mongoose.model('about' , aboutSchema)

module.exports = SchemaData