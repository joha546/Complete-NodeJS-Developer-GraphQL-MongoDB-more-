const express = require("express");

const app = express();

// Middleware to initiate ejs engine

app.set('view engine', "ejs");


// rendering the homepage.
app.get("/", (req, res) =>{
    // render method takes the name of html page which is to be rendered and goes to views folder, find it
    // and render it.
    // we can send multiple properties also.
    let data ={
        name : "Md Khaled Bin Joha",
        hobbies : ['Computer Programming', 'Playing Football', 'Watching movies']
    }
    // res.render("home", {name : "Joha"});

    res.render("home", {data : data});
})

const server = app.listen(4000, function(){
    console.log(`Server listening to port 4000.`);
})