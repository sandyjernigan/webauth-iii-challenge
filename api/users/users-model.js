const db = require('../../data/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findbyUserName, 
};

function find() {
  return db('users')
    .select('id', 'username', 'department');
}

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'department')
    .where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'department')
    .where({ id })
    .first();
}

function findbyUserName(username) {
  return db('users')
    .where({ username })
    .first();
}