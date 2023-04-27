DROP TABLE accounts;
CREATE TABLE accounts (
    email VARCHAR(250) NOT NULL,
    hashedPassword VARCHAR(250) NOT NULL,
    id VARCHAR(250) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email)
);
DROP TABLE follow_list;
CREATE TABLE follow_list (
    id INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(250) NOT NULL,
    followingUserId VARCHAR(250) NOT NULL,
    PRIMARY KEY (id)
);
