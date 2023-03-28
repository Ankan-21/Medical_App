const AboutModel = require('../models/AboutModel')


const AdminAbout=(req,res)=>{
    AboutModel.find((err, data)=>{
        if(!err){
            res.render('./admin/about' , {
                'title' : 'About Page',
                data:req.admin,
                abouts : data,
            })
        }
    })
}

const addAbout = (req,res)=>{
    const aboutdata = new AboutModel({
        content : req.body.content,
        Image:req.file.filename,

    })
    aboutdata.save().then(data=>{
        res.redirect('./about')
        console.log(data);
    }).catch(err=>{
        res.redirect('./about')
        console.log(err);
    })
}
module.exports={
    AdminAbout,
    addAbout
}
