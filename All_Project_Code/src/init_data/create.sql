CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) PRIMARY KEY,
    password CHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS matches (
    match_id SERIAL PRIMARY KEY,
    user_id_from INT,
    user_id_to INT,
    FOREIGN KEY (user_id_from) REFERENCES users (user_id),
    FOREIGN KEY (user_id_to) REFERENCES users (user_id)
);

insert into users (username, password) values ('JohnDoe', '123');
