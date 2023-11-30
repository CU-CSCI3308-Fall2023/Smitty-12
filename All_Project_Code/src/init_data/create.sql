CREATE TABLE IF NOT EXISTS users (
    user_id PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
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

CREATE TABLE IF NOT EXISTS matches (
    match_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id_from INT,
    user_id_to INT,
    FOREIGN KEY (user_id_from) REFERENCES Users(user_id),
    FOREIGN KEY (user_id_to) REFERENCES Users(user_id)
);