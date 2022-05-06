const db = require('./db');

// Return an array of guests for an event excluding the current user
const getGuestsForEvent = (event_id, currentUser) => {
  return db.query(`
  SELECT *
  FROM users
  WHERE id IN (
    SELECT user_id
    FROM event_attendee_times
    JOIN event_times ON event_time_id = event_times.id
    WHERE event_times.event_id = $1
    AND user_id != $2
    GROUP BY user_id
  );
  `, [event_id, currentUser.id])
    .then(res => {
      return res.rows;
    });
};

module.exports.getGuestsForEvent = getGuestsForEvent;

// edit the user - add name and email or update them if necessary
const editUser = (newUser, currentUser) => {

  if (currentUser.name !== newUser.name || currentUser.email !== newUser.email) {
    const params = [currentUser.id, newUser.name, newUser.email];

    return db.query(`
    UPDATE users
    SET (name, email) = ($2, $3)
    WHERE id = $1
    RETURNING *;
    `, params)
      .then(res => {
        return res.rows[0];
      });
  } else {
    return currentUser;
  }
};

module.exports.editUser = editUser;


// Add Response
const addResponse = ({event_time_id, user_id, response}) => {
  return db.query(
    `
    INSERT INTO event_attendee_times (event_time_id, user_id, response)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,[event_time_id, user_id, response])
    .then(res => res.rows[0]);
};

// Update Response
const editResponse = ({response, id, event_time_id, user_id}) => {
  return db.query(
    `
    UPDATE event_attendee_times
    SET response = $1
    WHERE id = $2
    AND event_time_id = $3
    AND user_id = $4
    RETURNING *;
    `,[response, id, event_time_id, user_id])
    .then(res => res.rows[0]);
};

// Update Responses
const editResponses = (responses) => {
  const responsePromises = [];
  for (const response of responses) {
    responsePromises.push(editResponse(response));
  }

  return Promise.all(responsePromises);
};

// Get Responses for a specific user and event
const getResponsesPerUserForEvent = (event_time_id, user) => {
  return db.query(`
  SELECT event_attendee_times.id,
  event_attendee_times.user_id,
  event_attendee_times.response,
  event_attendee_times.event_time_id,
  event_times.event_id,
  event_times.start_time,
  event_times.end_time
  FROM event_attendee_times
  JOIN event_attendee_times ON event_time_id = event_times.id
  WHERE event_times.event_id = $1
  AND user_id = $2
  ORDER BY start_time;
  `, [event_time_id, user.id])
    .then(responses => {
      const userResponses = responses.rows;
      return {user, userResponses};
    });
};

module.exports.getResponsesPerUserForEvent = getResponsesPerUserForEvent;

// get an array of user objects and associated Responses for a specific event
const getGuestResponsesForEvent = (event_id, currentUser) => {

  return getGuestsForEvent(event_id, currentUser)
    .then((users) => {
      const promiseArray = [];
      for (const user of users) {
        promiseArray.push(getResponsesPerUserForEvent(event_id, user));
      }
      return Promise.all(promiseArray);
    });
};

module.exports.getGuestResponsesForEvent = getGuestResponsesForEvent;
