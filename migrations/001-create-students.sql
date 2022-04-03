-- Up

CREATE TABLE IF NOT EXISTS students (
  'id' TEXT PRIMARY KEY,
  'name' TEXT NOT NULL,
  'email' TEXT,
  'password' TEXT,
  'birthday' TEXT,
  'classes_per_week' INTEGER NOT NULL,
  'price_per_month' INTEGER NOT NULL,
  'created_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  'updated_at' TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

-- Down

DROP TABLE students
