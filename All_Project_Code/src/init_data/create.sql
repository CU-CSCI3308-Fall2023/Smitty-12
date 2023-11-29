CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    bio VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    age INTEGER NOT NULL,
    photo_id INTEGER NOT NULL,
    preferences_id INTEGER NOT NULL

);

CREATE TABLE IF NOT EXISTS preferences{
    preferences_id INTEGER PRIMARY KEY,
    age_range INTEGER NOT NULL,
    sex VARCHAR NOT NULL,
    pets INTEGER NOT NULL,
    budget INTEGER NOT NULL,
};

CREATE TABLE IF NOT EXISTS photos{
    photo_id INTEGER PRIMARY KEY,
    photo_1 NOT NULL,
    photo_2 NOT NULL,
    photo_3 NOT NULL,
    photo_4 NOT NULL,
    photo_5 NOT NULL
};

