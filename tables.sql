DROP TABLE accounts;
CREATE TABLE accounts (
    email VARCHAR(250) NOT NULL,
    hashedPassword VARCHAR(250) NOT NULL,
    PRIMARY KEY (email)
);
