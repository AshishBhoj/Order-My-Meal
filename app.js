const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const port = 8000;

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true});

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String
  });

//  compiling our schema into a Model
const contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('index.pug', params);
})
app.post('/', (req, res)=>{
    
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("Saved in database")
    }).catch(() => {
        res.status(200).send("Data not saved")

    });
    // res.status(200).render('index.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});