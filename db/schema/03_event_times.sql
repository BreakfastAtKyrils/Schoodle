DROP TABLE IF EXISTS event_times CASCADE;

CREATE TABLE event_times (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id integer NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  start_time timestamp NOT NULL,
  end_time timestamp NOT NULL,
  vote integer DEFAULT 0
);
