DROP DATABASE IF EXISTS fsa_db_dev;
CREATE DATABASE fsa_db_dev;
USE fsa_db_dev;

CREATE TABLE cities (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    leader VARCHAR(255) NOT NULL,
    teacher VARCHAR(255) NOT NULL,
    administrator VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    county VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE members (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    city_id INT(11) NOT NULL,
    apprentice_xp_id INT(11),
    developer_exp_id INT(11),
    engineer_xp_id INT(11),
    movement_xp_id INT(11),
    leadership_exp_id INT(11),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    community_rank VARCHAR(255),
    technical_rank VARCHAR(255),
    github VARCHAR(255),
    mbriggs VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(city_id) REFERENCES cities(id),
    FOREIGN KEY(apprentice_xp_id) REFERENCES experience(id),
    FOREIGN KEY(developer_xp_id) REFERENCES experience(id),
    FOREIGN KEY(engineer_xp_id) REFERENCES experience(id),
    FOREIGN KEY(movement_xp_id) REFERENCES experience(id),
    FOREIGN KEY(leadership_xp_id) REFERENCES experience(id)
);

CREATE TABLE experience (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    user_id INT(11) NOT NULL,
    exp_name VARCHAR(255) NOT NULL,
    approved BOOLEAN NOT NULL,
    FOREIGN KEY(user_id) REFERENCES members(id),
    _1 BOOLEAN,
    _1_approved BOOLEAN,
    _2 BOOLEAN,
    _2_approved BOOLEAN,
    _3 BOOLEAN,
    _3_approved BOOLEAN,
    _4 BOOLEAN,
    _4_approved BOOLEAN,
    _5 BOOLEAN,
    _5_approved BOOLEAN,
    _6 BOOLEAN,
    _6_approved BOOLEAN,
    _7 BOOLEAN,
    _7_approved BOOLEAN,
    _8 BOOLEAN,
    _8_approved BOOLEAN,
    _9 BOOLEAN,
    _9_approved BOOLEAN,
    _10 BOOLEAN,
    _10_approved BOOLEAN,
    _11 BOOLEAN,
    _11_approved BOOLEAN,
    _12 BOOLEAN,
    _12_approved BOOLEAN,
    _13 BOOLEAN,
    _13_approved BOOLEAN,
    _14 BOOLEAN,
    _14_approved BOOLEAN,
    _15 BOOLEAN,
    _15_approved BOOLEAN,
    
)


INSERT INTO cities (name) VALUES ('Seattle');
INSERT INTO members (city_id, firstname, lastname) VALUES (1, 'Alan', 'Ndegwa');
INSERT INTO experience (user_id, exp_name, approved) VALUES (1, 'Apprentice', false)
