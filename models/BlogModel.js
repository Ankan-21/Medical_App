const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    subtitle:{
        type : String,
        required : true
    },
    content:{
        type : String,
        required : true
    },
    PostImage:{
        type:String,
        required:true
    },
    status:{
        type : Boolean,
        default : true
    },
    createAt:{
        type : Date,
        default :new Date
    }
})

const SchemaData = new mongoose.model('blog' , blogSchema)

module.exports = SchemaData