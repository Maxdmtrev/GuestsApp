const mongoose = require("mongoose");
const fs = require('fs');
const UserPars = require('./user-seeds');
const fileWrite = './users-copy.csv';

mongoose.connect('mongodb://localhost/guest', { useNewUrlParser: true });


// writeFile()
const writeFile = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, error => {
            if (error) reject(error);
            resolve('File created successfuly');
        });
    });
};

writeFile(fileWrite, UserPars)
    .then(result => console.log(result))
    .catch(error => console.log(error));