-- Up
CREATE TABLE IF NOT EXISTS working_days (
  'id' text PRIMARY KEY,
  'month' text NOT NULL,
  'yeah' text NOT NULL,
  'number_of_weeks' integer NOT NULL,
  'dates' text NOT NULL,
  'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  'updated_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Down

DROP TABLE working_days
