exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("league_day", function(table) {
      table.increments();
      table.integer("league_id").unsigned().notNullable();
      table.foreign("league_id").references("leagues.id");
      table.integer("schedule_id").unsigned().notNullable();
      table.foreign("schedule_id").references("league_schedule.id");
      table.timestamp("date", true).notNullable();
      table.boolean("is_tournament");
      table.specificType("byes", "integer[]");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("league_day")]);
};
