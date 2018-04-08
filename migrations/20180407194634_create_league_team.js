exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("league_team", function(table) {
      table.increments();
      table.integer("league_id").unsigned();
      table.foreign("league_id").references("leagues.id");
      table.integer("organization_id").unsigned();
      table.string("sport");
      table.string("name").notNullable();
      table.specificType("members", "integer[]");
      table.integer("captain_user_id").unsigned();
      table.specificType("co_captains", "integer[]");
      table.string("photo");
      table.json("color");
      table.string("url");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("league_team")]);
};
