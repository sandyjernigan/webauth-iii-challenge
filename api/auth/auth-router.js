const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js');

const Users = require('../users/users-model.js');

// for endpoints /api/register 	Creates a user using the information sent inside the body of the request. 
// Hash the password before saving the user to the database.
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // jwt should be generated
      const token = generateToken(saved);
      res.status(201).json({user: saved, token});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// /api/login 	Use the credentials sent inside the body to authenticate the user. 
// On successful login, create a new JWT with the user id as the subject and send it back to the client. 
// If login fails, respond with the correct status code and the message: 'You shall not pass!'
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findbyUserName(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) { 
        // jwt should be generated
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  
  const payload = {
    sub: user.id, // sub in payload is what the token is about
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: '1d', // expires in 1 day
  };

  console.log("token set") 
  console.log(payload)
  console.log(process.env.JWT_SECRET)
  console.log(options)
  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, process.env.JWT_SECRET, options); // this method is synchronous
}

module.exports = router;
