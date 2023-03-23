const express = require('express');
const mongoose = require('mongoose');
const body_parser=require('body-parser')
const cookie=require('cookie-parser')
const ejs = require('ejs');
const path = require('path');
const app = express();
const port = 9010;

app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cookie())

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'public')));

const adminAuth=require('./middlewares/adminAuth')
app.use(adminAuth.authJwt);

const UserRoute = require('./routes/UserRoute');
const AdminRoute=require("./routes/AdminRoute")

app.use(UserRoute);
app.use("/admin",AdminRoute)

const dbCon = "mongodb+srv://nodeClass:LMoQihMaJfCIw0pQ@cluster0.vimfle7.mongodb.net/Medical";
mongoose.connect(dbCon, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(port, () => {
            console.log(`server running http://localhost:${port}`);
            console.log(`Connected`);
        })
    }).catch(err => {
        console.log(err);
    })