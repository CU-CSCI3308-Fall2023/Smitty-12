CREATE TABLE IF NOT EXISTS preferences(
   preferences_id SERIAL PRIMARY KEY,
   age_range INTEGER NOT NULL,
   sex VARCHAR NOT NULL,
   pets INTEGER NOT NULL,
   budget INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS photos(
   photo_id SERIAL PRIMARY KEY,
   photo_1 VARCHAR NOT NULL,
   photo_2 VARCHAR NOT NULL,
   photo_3 VARCHAR NOT NULL,
   photo_4 VARCHAR NOT NULL,
   photo_5 VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
   user_id ISERIAL PRIMARY KEY,
   username VARCHAR NOT NULL,
   password VARCHAR NOT NULL,
   first_name  VARCHAR NOT NULL,
   last_name VARCHAR NOT NULL, 
   bio VARCHAR NOT NULL,
   location VARCHAR NOT NULL,
   age INTEGER NOT NULL,
   photo_id INTEGER REFERENCES photos(photo_id),
   preferences_id INTEGER REFERENCES preferences(preferences_id)
);

CREATE TABLE IF NOT EXISTS matches (
    match_id SERIAL PRIMARY KEY,
    user_id_from INT,
    user_id_to INT,
    FOREIGN KEY (user_id_from) REFERENCES users (user_id),
    FOREIGN KEY (user_id_to) REFERENCES users (user_id)
);