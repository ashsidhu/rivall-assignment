exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("leagues", function(table) {
      table.increments();
      table.string("name").notNullable();
      table.integer("organization_id").unsigned();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("leagues")]);
};
