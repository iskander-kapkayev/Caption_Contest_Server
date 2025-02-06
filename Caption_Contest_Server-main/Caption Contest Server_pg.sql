CREATE TABLE users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    registeredAt TIMESTAMP NOT NULL,
    lastLogin TIMESTAMP
);

CREATE TABLE images (
    imageID SERIAL PRIMARY KEY,
    imageURL VARCHAR(100) NOT NULL
);

CREATE TABLE captions (
	captionID SERIAL PRIMARY KEY,
    captionText TEXT,
    captionApproval BOOLEAN,
    userID INTEGER NOT NULL REFERENCES users(userID),
    imageID INTEGER NOT NULL REFERENCES images(imageID),
    upvotes INTEGER DEFAULT 0
);

INSERT INTO users
VALUES (1, 'iskanderkay', 'password', 'iskander.kapkayev@gmail.com', '2025-01-08', '2025-01-08');

INSERT INTO images
VALUES 
	(1, '\images\fire_alarm_deserted_island.jpg'),
	(2, '\images\fun_shirt_island.jpg'),
	(3, '\images\visiting_to_island.jpg'),
	(4, '\images\anime_1.jpg'),
	(5, '\images\anime_2.jpg'),
	(6, '\images\anime_3.jpg');




