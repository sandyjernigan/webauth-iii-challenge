const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../middleware/restricted.js');

router.get('/', restricted, (req, res) => {

  // If the user is an admin they can see all users
  // Otherwise, the server only returns documents with the same department as the logged in user. 
    // For example if the logged in user belongs to the finance department, then only users with the finance department should be returned; 
    // if the logged in user is in sales only users on the sales department should be returned.

  const { sub, department } = req.decodedToken;

  if (role === 'admin') {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  } else {
    Users.findBy({ department })
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  }
});

module.exports = router;