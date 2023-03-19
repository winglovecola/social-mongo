const connection = require('../config/connection');
const { Thought, User } = require('../models');
const getRandomName = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');



  await Thought.deleteMany({});
  await User.deleteMany({});
/*
  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName().replace (' ', '_').toLowerCase();
    const email = `${username}@gmail.com`;


    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);



  console.log(users);*/
  process.exit(0);
});
