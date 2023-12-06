INSERT INTO photos (photo_id, photo_1, photo_2, photo_3, photo_4, photo_5) VALUES (0, 'photo1_path', 'photo2_path', 'photo3_path', 'photo4_path', 'photo5_path');

INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (0, 22, 'male', 1, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (1, 23, 'female', 1, 900);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (2, 20, 'male', 0, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (3, 22, 'female', 2, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (4, 25, 'male', 1, 800);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (5, 21, 'nopref', 0, 1500);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (6, 24, 'female', 3, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (7, 23, 'male', 1, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (8, 27, 'female', 0, 1300);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (9, 26, 'male', 2, 900);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (10, 22, 'nopref', 1, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (11, 30, 'male', 0, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (12, 28, 'female', 2, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (13, 29, 'nopref', 1, 1400);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (14, 26, 'male', 0, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (15, 24, 'female', 2, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (16, 31, 'nopref', 1, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (17, 27, 'male', 3, 1300);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (18, 23, 'female', 1, 900);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (19, 28, 'male', 0, 1400);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (20, 25, 'female', 2, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (21, 32, 'nopref', 1, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (22, 30, 'male', 2, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (23, 29, 'female', 0, 1300);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (24, 27, 'male', 1, 900);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (25, 24, 'female', 2, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (26, 31, 'nopref', 0, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (27, 28, 'male', 2, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (28, 26, 'female', 1, 1300);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (29, 23, 'male', 0, 1200);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (30, 29, 'female', 2, 1100);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (31, 27, 'nopref', 1, 1000);
INSERT INTO preferences (preferences_id, age_range, sex, pets, budget) VALUES (32, 25, 'male', 3, 1200);


INSERT INTO users (user_id, username, password, first_name, last_name, bio, location, age, photo_id, preferences_id) VALUES (0,'JohnDoe', '123','John', 'Doe',  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Texas', 20, 0, 0);
INSERT INTO users (user_id, username, password, first_name, last_name, bio, location, age, photo_id, preferences_id) VALUES (1,'JaneDoe', '1234','Jane', 'Doe',  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Texas', 20, 0, 1);
INSERT INTO users (user_id, username, password, first_name, last_name, bio, location, age, photo_id, preferences_id) VALUES (2,'JustinDoe', '12345','Justin', 'Doe',  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Texas', 20, 0, 2);
INSERT INTO users (user_id, username, password, first_name, last_name, bio, location, age, photo_id, preferences_id)
VALUES 
(3, 'AliceSmith', 'p@ssw0rd', 'Alice', 'Smith', 'Passionate about art and literature, always seeking inspiration in the beauty of life. Currently residing in the vibrant city of New York.', 'New York', 25, 0, 3),
(4, 'BobJohnson', 'secure123', 'Bob', 'Johnson', 'Tech enthusiast and avid traveler. Exploring the wonders of California while coding the next big thing.', 'California', 30, 0, 4),
(5, 'EmilyDavis', 'pass123', 'Emily', 'Davis', 'Fitness freak and nature lover. Enjoying the sunny days in Florida, balancing work and outdoor adventures.', 'Florida', 22, 0, 5),
(6, 'ChrisMartin', 'chrispass', 'Chris', 'Martin', 'Musician and dreamer. Creating melodies in the heart of Texas and living the cillum dolore life.', 'Texas', 28, 0, 6),
(7, 'OliviaBrown', 'olivia123', 'Olivia', 'Brown', 'Fashionista and trendsetter. Unleashing style in California, making every moment picture-perfect.', 'California', 35, 0, 7),
(8, 'DanielWhite', 'danielpass', 'Daniel', 'White', 'Tech geek and coffee enthusiast. Coding through the nights in the Lone Star State, fueled by caffeine.', 'Texas', 26, 0, 8),
(9, 'SophiaClark', 'sophia123', 'Sophia', 'Clark', 'Bookworm and aspiring writer. Lost in the literary world of New York, crafting tales of imagination.', 'New York', 32, 0, 9),
(10, 'MatthewTaylor', 'mattypass', 'Matthew', 'Taylor', 'Adventure seeker and adrenaline junkie. Conquering the thrill rides of Florida by day, coding by night.', 'Florida', 29, 0, 10),
(11, 'IsabellaJones', 'isabella123', 'Isabella', 'Jones', 'Photography enthusiast capturing the essence of life in California. In love with sunsets and city lights.', 'California', 31, 0, 11),
(12, 'AndrewWang', 'andrewwang', 'Andrew', 'Wang', 'Entrepreneur in the making. Building dreams in the heart of Texas, one startup at a time.', 'Texas', 27, 0, 12),
(13, 'GabriellaLee', 'gabriella123', 'Gabriella', 'Lee', 'Artistic soul with a flair for design. Bringing creativity to life in the hustle and bustle of New York City.', 'New York', 33, 0, 13),
(14, 'ChristopherKim', 'chris123', 'Christopher', 'Kim', 'Tech enthusiast by day, gamer by night. Navigating the virtual world in the sunny state of Florida.', 'Florida', 28, 0, 14),
(15, 'VictoriaNguyen', 'victoria123', 'Victoria', 'Nguyen', 'Foodie and culinary adventurer. Exploring diverse flavors in the heart of Texas, creating taste sensations.', 'Texas', 25, 0, 15),
(16, 'AlexanderLiu', 'alexander123', 'Alexander', 'Liu', 'Fitness fanatic and health advocate. Sculpting the body and mind amidst the palm trees of California.', 'California', 29, 0, 16),
(17, 'MiaRodriguez', 'mia123', 'Mia', 'Rodriguez', 'Dance enthusiast with a passion for rhythm. Grooving to the beats of life in the energetic streets of New York.', 'New York', 26, 0, 17),
(18, 'EthanSmith', 'ethan123', 'Ethan', 'Smith', 'Outdoor explorer and nature lover. Chasing sunsets and hiking trails in the picturesque landscapes of Florida.', 'Florida', 30, 0, 18),
(19, 'AvaJohnson', 'ava123', 'Ava', 'Johnson', 'Fashionista with an eye for elegance. Strutting through the fashion-forward scene of California, making a statement.', 'California', 27, 0, 19),
(20, 'LiamChen', 'liam123', 'Liam', 'Chen', 'Aspiring musician with a love for all genres. Crafting melodies and harmonies in the eclectic vibe of Texas.', 'Texas', 24, 0, 20),
(21, 'NatalieWu', 'natalie123', 'Natalie', 'Wu', 'Explorer of cultures and traditions. Embracing diversity in the melting pot of New York City.', 'New York', 31, 0, 21),
(22, 'HenryGomez', 'henry123', 'Henry', 'Gomez', 'Tech wizard building the future. Contributing to innovation in the tech hub of California.', 'California', 28, 0, 22),
(23, 'SophieHall', 'sophie456', 'Sophie', 'Hall', 'Nature lover and eco-warrior. Advocating for a green lifestyle in the sunny state of Florida.', 'Florida', 26, 0, 23),
(24, 'CalebMartinez', 'caleb789', 'Caleb', 'Martinez', 'Sports enthusiast and fitness trainer. Inspiring a healthy lifestyle in the energetic atmosphere of Texas.', 'Texas', 29, 0, 24),
(25, 'HannahLiu', 'hannah567', 'Hannah', 'Liu', 'Book lover lost in the literary wonders of New York. Exploring new worlds between the pages of every book.', 'New York', 27, 0, 25),
(26, 'MaximusBrown', 'maximus101', 'Maximus', 'Brown', 'Aspiring actor and theater enthusiast. Chasing dreams on the stages of California, bringing stories to life.', 'California', 32, 0, 26),
(27, 'AriaGonzalez', 'aria2022', 'Aria', 'Gonzalez', 'Passionate about music and poetry. Creating soulful rhythms in the artistic vibe of Texas.', 'Texas', 28, 0, 27),
(28, 'LeoCarter', 'leo123', 'Leo', 'Carter', 'Gamer and tech guru. Mastering virtual worlds in the heart of California, pushing the boundaries of technology.', 'California', 31, 0, 28),
(29, 'SamanthaWang', 'sam456', 'Samantha', 'Wang', 'Fashionista with a keen eye for trends. Setting style standards in the fashion-forward streets of New York.', 'New York', 25, 0, 29),
(30, 'NathanGomez', 'nathan789', 'Nathan', 'Gomez', 'Adventure seeker and thrill chaser. Conquering the adrenaline rush in the scenic landscapes of Florida.', 'Florida', 30, 0, 30),
(31, 'LilyChen', 'lily567', 'Lily', 'Chen', 'Art lover and aspiring painter. Creating visual masterpieces in the vibrant art scene of Texas.', 'Texas', 29, 0, 31),
(32, 'OwenJohnson', 'owen2022', 'Owen', 'Johnson', 'Tech enthusiast exploring the digital frontier. Coding the future in the tech hub of California.', 'California', 26, 0, 32);

INSERT INTO matches (liked_user_id, liker_user_id) VALUES (0, 1);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (0, 2);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (3, 4);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (5, 6);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (7, 8);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (9, 10);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (11, 12);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (13, 14);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (15, 16);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (17, 18);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (19, 20);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (21, 22);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (23, 24);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (25, 26);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (27, 28);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (29, 30);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (31, 32);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (3, 5);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (7, 9);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (11, 13);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (15, 17);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (19, 21);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (23, 25);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (27, 29);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (31, 3);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (4, 6);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (8, 10);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (12, 14);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (16, 18);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (20, 22);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (24, 26);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (28, 30);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (32, 3);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (4, 7);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (9, 12);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (14, 17);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (19, 22);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (24, 27);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (29, 32);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (3, 6);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (8, 11);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (13, 16);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (18, 21);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (23, 26);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (28, 31);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (4, 8);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (9, 13);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (14, 18);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (19, 24);
INSERT INTO matches (liked_user_id, liker_user_id) VALUES (29, 32);
