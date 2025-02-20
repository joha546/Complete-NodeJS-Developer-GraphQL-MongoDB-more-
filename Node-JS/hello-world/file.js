// file handling in js

const fs = require('fs');

// File writing.

// Synchronous call.
// fs.writeFileSync('./test.txt', 'Hey There');

// Asynchronous call.
// fs.writeFile('./test.txt', "Hello World!!!", (err) => {});


// File reading.

// Synchronous call.
// const result = fs.readFileSync('./contact.txt', "utf-8");
// console.log(result);

// Asynchronous call.
/*
asynchronous call expects from you to give a callback function which will return 
error (if occured) or result expected value.
and Asynchronous doesn't return anything to a particular variable.
*/
fs.readFile('./contact.txt', 'utf-8', (err, result) =>{
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(result);
    }
});