const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Since the body is giving undefined result. so we need to use MIDDLEWARE.
app.use(express.urlencoded({extended : false}));

// for demonstration purpose.
// app.get("/users", (req, res) => {
//     const html = `
//     <ul>
//         ${users.map((user) => `<li>${user.first_name}</li>`).join("")};
//     </ul>
//     `;
//     res.send(html);
// });


// REST API Points.
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.get("/api/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req, res) => {
    // TODO : Create a new User.

    const body = req.body;
    // console.log(body);
    users.push({...body, id : users.length +1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) =>{
        return res.json({ status : "success", id : users.length});
    })

});

app.patch("/api/users/:id", (req, res) => {
    // TODO : Edit User.

    // find user by id.
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({ message: "User not found" });
    }

    // this is for testing the rest api. 
    // I haven't updated the MOCK_DATA.json yet.
    users[userIndex] = { ...users[userIndex], ...req.body};

    return res.json({ status : "Updated.", user : users[userIndex]});
});

app.delete("/api/users/:id", (req, res) => {
    // TODO : Delete User.
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if(userIndex === -1){
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);

    return res.json({ status: "Deleted", remainingUsers: users });
});

// Grouping of route 

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));