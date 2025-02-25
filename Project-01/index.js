const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const req = require("express/lib/request");

const app = express();
const PORT = 8000;

// async and await must be written.

// Connection of mongodb.
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log("MngoDB connected"))
.catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle : {
        type: String 
    },

}, 
{ timestamps: true}
);

// create a model.
const User = mongoose.model("user", userSchema);

// Since the body is giving undefined result. so we need to use MIDDLEWARE.
app.use(express.urlencoded({extended : false}));

// Custom middleware.
app.use((req, res, next) => {
    // console.log("Hello from Middleware 1.");

    // we're getting the log info in log.txt
    fs.appendFile('log.txt',
        `${Date.now()}: ${req.path}: ${req.method}\n`,
        (err, data) =>{
            next();
        }
    )
});

// app.use((req, res, next) => {
//     return res.end("Hey buddy...");
// });

// for demonstration purpose.
app.get("/users", async(req, res) => {
    const allUsers = await User.find({});
    const html = `
    <ul>
        ${allUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")};
    </ul>
    `;
    res.send(html);
});


// REST API Points.
app.get("/api/users", async(req, res) => {
    const allUser = await User.find({});

    res.setHeader("X-MyName", "Joha");
    // Always add X to custom headers.
    return res.json(allUser);
});

app.get("/api/users/:id", async(req, res) =>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ error: "Not found the user."});
    }
    return res.json(user);
});

app.post("/api/users", async(req, res) => {
    // TODO : Create a new User.

    const body = req.body;

    if(!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({msg : "All fields are required."});
    }
    
    // creating user.
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    });

    return res.status(201).json({msg: "success"});
});

app.patch("/api/users/:id", async(req, res) => {
    // TODO : Edit User.

    // find user by id.
    const userbyId = await User.findByIdAndUpdate(req.params.id, {lastName : "Changed"});
    return res.status(200).json({ status : "Updated."});
});

app.delete("/api/users/:id", async(req, res) => {
    // TODO : Delete User.
    await User.findByIdAndDelete(req.params.id);

    return res.status(204).json({ status: "Deleted"});
});

// Grouping of route 

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));