// The user schema should include: username, password and department. 
// The department should be a string used to group the users. No need for a departments table or setting up relationships.

exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 128).notNullable().unique();
    users.string('password', 128).notNullable();
    users.string('department');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
