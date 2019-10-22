// Setup an initial user, for testing this should not be in production
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  const hash = bcrypt.hashSync('somePassCode@2019', 16);

  return knex('users').insert([   
    {
      username: 'baseUser',
      password: hash,
      department: 'new' // new should only be able to see their own information
     }
  ]);
};