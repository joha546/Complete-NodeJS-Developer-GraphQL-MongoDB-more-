function add(a, b){
    return a + b
}

function sub(a, b){
    return a - b
}

// exporting the function to the hello.js
/*
when you try to export multiple function to any file. 
you need to use javascript object to send otherwise the first method will be overridden.
 */
module.exports = {
    add,
    sub
}