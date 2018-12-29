DROP DATABASE IF EXISTS fsa_db_dev;
CREATE DATABASE fsa_db_dev;
USE fsa_db_dev;

CREATE TABLE cities (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    city_id INT(11) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(city_id) REFERENCES cities(id)
);

CREATE TABLE projects (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE features (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    project_id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    due_date DATE NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(project_id) REFERENCES projects(id)
);


INSERT INTO cities (name) VALUES ('Seattle');
INSERT INTO users (city_id, firstname, lastname) VALUES (1, 'Alan', 'Ndegwa');
INSERT INTO projects (user_id, name, description) VALUES (1, 'FSA Hub',
  'Hub for the FSA Community');
INSERT INTO features (project_id, name, description, due_date, url) VALUES (1,
  'FSA HUb DB', 'Database for the FSA Hub', '2018-12-09',
  'https://github.com/fsapprenticeship/fsa-hub');
