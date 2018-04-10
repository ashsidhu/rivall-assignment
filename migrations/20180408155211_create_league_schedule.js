exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("league_schedule", function(table) {
      table.increments();
      table.integer("league_id").unsigned().notNullable();
      table.foreign("league_id").references("leagues.id");
      table.integer("league_registration_id").unsigned();
      table.specificType("days_of_week", "text[]");
      table.integer("game_length_in_minutes").unsigned();
      table.integer("num_game_per_week_per_team").unsigned();
      table.integer("num_simultaneous_games").unsigned();
      table.integer("num_tournament_week").unsigned();
      table.integer("num_week").unsigned();
      table.boolean("has_tournament");
      table.string("schedule_type");
      table.timestamp("start_date");
      table.json("time_frame");
      table.string("time_zone");
      table.specificType("week_descriptions", "text[]");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("league_schedule")]);
};
