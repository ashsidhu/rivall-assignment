import db from "../db";

export const showDays = async function(dayIds) {
  const query = db("league_day")
    .select()
    .whereIn("id", dayIds);
  return await query;
};

const timeQuery = field => (`EXTRACT(HOUR FROM ${field}) * INTERVAL '1 HOUR' +
             EXTRACT(MINUTE FROM ${field}) * INTERVAL '1 MINUTE' +
             EXTRACT(SECOND FROM ${field}) * INTERVAL '1 SECOND'`)


export const updateGameDay = async function(mergeFrom, mergeTo, toDate) {
  const query = db("league_game")
    .where({ day_id: mergeFrom })
    .update({
      day_id: mergeTo,
      start_time: db.raw(`'${toDate}'::TIMESTAMP + ${timeQuery("start_time")}`),
      end_time: db.raw(`'${toDate}'::TIMESTAMP + ${timeQuery("end_time")}`)
    });
  return await query;
};

export const deleteDay = async function(id) {
  const query = db("league_day")
    .where("id", id)
    .del();
  return await query;
};

export const showGamesByDayIds = async function(dayIds) {
  const query = db("league_game")
    .select()
    .whereIn("day_id", dayIds);
  return await query;
};

export const getFullSchedule = async function(scheduleId) {
  const dayQuery = db("league_day")
    .select()
    .where("schedule_id", scheduleId);
  const gameQuery = db("league_game")
    .select()
    .where("schedule_id", scheduleId);
  const [days, games] = await Promise.all([dayQuery, gameQuery]);
  return {
    days,
    games
  };
};
