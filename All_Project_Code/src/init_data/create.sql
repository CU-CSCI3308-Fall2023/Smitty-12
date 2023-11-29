CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password VArCHAR(60) NOT NULL,
    bio VARCHAR(50) NOT NULL,
    location VARCHAR(60) NOT NULL,
    age INTEGER NOT NULL,
    photo_id INTEGER FOREIGN KEY,
    preference_id INTEGER FOREIGN KEY
);

CREATE TABLE IF NOT EXISTS photos {
    photo_id INTEGER PRIMARY KEY,
    photo_1 NOT NULL,
    photo_2 NOT NULL,
    photo_3 NOT NULL,
    photo_4 NOT NULL,
    photo_5 NOT NULL
};

CREATE TABLE IF NOT EXISTS preferences {
    preference_id INTEGER PRIMARY KEY,
    age_range INTEGER,
    sex VARCHAR(50),
    pets INTEGER,
    budget INTEGER
};

