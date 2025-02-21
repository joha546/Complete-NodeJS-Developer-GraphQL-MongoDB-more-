// we don't need http server because express handles it internally.
// const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) =>{
    return res.send("Hello from HomePage.");
});

app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name} welcome to about page.`);
})

// we don't need to create http server also.
// const myServer = http.createServer(app);

// built http server without express js.
// it has many limitations.

// const fs = require("fs");
// const url = require("url")

// const myServer = http.createServer((req, res) => {
//     const log = `${Date.now()}: ${req.url} New Req Received. \n`;
//     const header = `${Date.now()}: ${req.headers}\n`;
//     const myUrl = url.parse(req.url);
//     console.log(myUrl);

//     // we're using here non-blocking request to support concurrent or parallel response.
//     fs.appendFile("log.txt", log, (err, data) => {
//         fs.appendFile("header.txt", header, (err, data)=>{
//             switch(myUrl.pathname){         // extracting pathname from the whole url.   
//                 case '/':
//                     res.end("Hello From Server");
//                     break;
//                 case '/about':
//                     res.end("I am Md Khaled Bin Joha");
//                     break;
//                 case '/contact-us':
//                     res.end("Contact No : 01828262134")
//                     break;
//                 default:
//                     res.end("404 Not Found.");
//                     break;
//             }
            
//         });
//     });
//     // console.log(req.headers);
// });

app.listen(8000, () => console.log("Server started."))
