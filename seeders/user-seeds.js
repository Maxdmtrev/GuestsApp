// Подключаем mongoose.
const mongoose = require("mongoose");
const fs = require('fs');
const moment = require('moment');
const faker = require('faker');
mongoose.connect('mongodb://localhost/guest', { useNewUrlParser: true });
const userList = 'users.txt';
const fileWrite = './users-copy.csv';

const User = require('../models/user');

// Read and save database users === complete
async function seedDB(path) {
  const data = fs.readFileSync(path,'utf8').split('\n');
  const tempData = data
      .map((el) => el.split(','));
  console.log(tempData);
  for (let i = 0; i < tempData.length; i ++) {
    const user = new User( {
      first_name: tempData[i][0],
      last_name: tempData[i][1],
      status: false
    });
    console.log(user);
    await user.save();
  }
  mongoose.connection.close();
}

// Create Users with faker.npm
async function userDB() {
  for (let i = 0; i < 20; i++) {
    let user = new User({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      date: moment(faker.date.past()).format("MMM Do YY"),
      status: false
    });
    console.log(user);
    await user.save();
  }
  mongoose.connection.close();
}

// Start seed DB -------------

// seedDB(userList);
userDB();
// const userSeedDB = seedDB(userList);
// const userCreateDB = userDB();

// // Find user in DB
// async function findUser(param) {
//     const find = await FindOne({}, {first_name: param});
//     console.log(find);
//     mongoose.connection.close();
// };



// async function userWrite(filename, people) {
//   const content = people.reduce((acc, elem) => `${acc} ${Object.values(elem)}\n`, '');
//   await fs.writeFileSync(filename, content);
// }
//
// userWrite(fileWrite, UserPars.userCreateDB);

// module.exports = { userCreateDB, userSeedDB };