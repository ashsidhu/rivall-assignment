import db from "../db";

export const showDays = async function(dayIds) {
  const query = db("league_day")
    .select()
    .whereIn("id", dayIds);
  return await query;
};

export const updateGameDay = async function(mergeFrom, mergeTo) {
  const query = db("league_game")
    .where({ day_id: mergeFrom })
    .update({
      day_id: mergeTo
    });
  return await query;
};

export const deleteDay = async function(id) {
  const query = db("league_day")
    .where("id", id)
    .del();
  return await query;
};

export const showGamesByDayId = async function(dayId) {
  const query = db("league_game")
    .select()
    .where("day_id", dayId);
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
