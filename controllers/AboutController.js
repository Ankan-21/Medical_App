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
        AboutImage:req.file.filename,
    })
    aboutdata.save().then(data=>{
        res.redirect('./about')
        console.log(data);
    }).catch(err=>{
        res.redirect('./about')
        console.log(err);
    })
}

const activeHeadline= (req, res) => {
    id=req.params.id
    AboutModel.findByIdAndUpdate(_id=id, {
        status: true
    }).then(result => {
        console.log("Headline Activeted...");
        res.redirect("./about");
    }).catch(err => {
        console.log(err);
    })
}


const deActiveHeadline = (req, res) => {
    AboutModel.findByIdAndUpdate(req.params.id, {
        status: false
    }).then(result => {
        console.log("Headline Deactiveted...");
        res.redirect("./about");
    }).catch(err => {
        console.log(err);
    })
}
module.exports={
    AdminAbout,
    addAbout,
    activeHeadline,
    deActiveHeadline
}
