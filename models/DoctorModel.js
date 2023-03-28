const mongoose = require("mongoose")
const Schema = mongoose.Schema

const doctorSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    specialist:{
        type : String,
        required : true
    },
    experience:{
        type : String,
        required : true
    },
    qualification:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    DoctorImage:{
        type:String,
        required:true
    },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    status:{
        type : Boolean,
        default : false
    },
    createAt:{
        type : Date,
        default : Date.now
    },
})

const SchemaData = new mongoose.model('doctor' , doctorSchema)

module.exports = SchemaData