const league_id = 1;
const league_name = "Epic League";

const teams = [
  { id: 1, name: "Rangers", league_id },
  { id: 2, name: "Boomers", league_id },
  { id: 3, name: "Badasses", league_id },
  { id: 4, name: "Screamers", league_id }
];

const schedule_id = 1;

const oneDayInMs = 86400000;
function getDate(daysAhead = 0) {
  return new Date(Date.now() + daysAhead * oneDayInMs).toDateString();
}
const date_1 = getDate();
const date_2 = getDate(1);
const day_ids = [1, 2]
const days = [
  { id: day_ids[0], date: date_1, schedule_id, league_id },
  { id: day_ids[1], date: date_2, schedule_id, league_id }
];

const game_ids = [1, 2, 3, 4];
const start_time = "05:00 PM"
const end_time = "06:00 PM"
const games = [
  { id: game_ids[0], day_id: day_ids[0], schedule_id, league_id, start_time, end_time},
  { id: game_ids[1], day_id: day_ids[0], schedule_id, league_id, start_time, end_time},
  { id: game_ids[2], day_id: day_ids[1], schedule_id, league_id, start_time, end_time},
  { id: game_ids[3], day_id: day_ids[1], schedule_id, league_id, start_time, end_time}
]

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex("league_game").del(),
    knex("league_day").del(),
    knex("league_schedule").del(),
    knex("league_team").del(),
    knex("leagues").del()
  ])
    .then(function() {
      return knex("leagues").insert([{ id: league_id, name: league_name }]);
    })
    .then(function() {
      return knex("league_team").insert(teams);
    })
    .then(function() {
      return knex("league_schedule").insert([{ id: schedule_id, league_id }]);
    })
    .then(function() {
      return knex("league_day").insert(days);
    })
    .then(function() {
      return knex("league_game").insert(games);
    });
};
