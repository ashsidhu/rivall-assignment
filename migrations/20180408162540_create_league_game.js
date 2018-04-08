exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("league_game", function(table) {
      table.increments();
      table.integer("league_id").unsigned().notNullable();
      table.foreign("league_id").references("leagues.id");
      table.integer("schedule_id").unsigned().notNullable();
      table.foreign("schedule_id").references("league_schedule.id");
      table.integer("day_id").unsigned().notNullable();
      table.foreign("day_id").references("league_day.id");
      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
      table.string("field_name");
      table.specificType("teams", "text[]");
      table.string("winner");
      table.json("venue");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("league_game")]);
};
