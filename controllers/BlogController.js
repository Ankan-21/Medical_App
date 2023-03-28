const BlogModel = require('../models/BlogModel')


const blog=(req,res)=>{
    BlogModel.find((err, data)=>{
        if(!err){
            res.render('./admin/blogs' , {
                'title' : 'Blog Page',
                blogs : data,
            })
        }
    })
}


const addBlog = (req,res)=>{
    const blogdata = new BlogModel({
        title : req.body.title,
        subtitle : req.body.subtitle,
        content : req.body.content,
        PostImage : req.file.filename,
    })
    blogdata.save().then(data=>{
        res.redirect('./blog')
        console.log(data);
    }).catch(err=>{
        res.redirect('./blog')
        console.log(err);
    })
}

module.exports = {
    blog,
    addBlog
}