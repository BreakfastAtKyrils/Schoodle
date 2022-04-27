DROP TABLE IF EXISTS event_attendee_times CASCADE;

CREATE TABLE event_attendee_times (
  id SERIAL PRIMARY KEY NOT NULL,
  event_time_id INTEGER NOT NULL REFERENCES event_times(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  response BOOLEAN
);
