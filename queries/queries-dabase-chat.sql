create database chat;

USE chat;

CREATE TABLE user(
    idUser VARCHAR(50) PRIMARY KEY NOT NULL,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    aboutMe VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL UNIQUE,
    idImage VARCHAR(50) NOT NULL,
    urlImage VARCHAR(100) NOT NULL,
		idWallpaper VARCHAR(50) NOT NULL,
		urlWallpaper VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    createDate DATE NOT NULL,
    role VARCHAR(20) NOT NULL,
		active BOOLEAN NOT NULL,
);

CREATE TABLE myFriends(
    idMyFriends VARCHAR(50) PRIMARY KEY NOT NULL,
    idUser VARCHAR(50) NOT NULL,
    idFriend VARCHAR(50) NOT NULL,
    createDate DATE NOT NULL,
    CONSTRAINT fk_user_myfriend_idUser FOREIGN KEY (idUser) REFERENCES user(idUser),
    CONSTRAINT fk_user_myfriend_idFriend FOREIGN KEY (idFriend) REFERENCES user(idUser)
);

CREATE TABLE message(
    idMessage VARCHAR(50) PRIMARY KEY NOT NULL,
    idUser VARCHAR(50) NOT NULL,
    body VARCHAR(200) NOT NULL,
		idConversation VARCHAR(50) NOT NULL,
    createDate DATETIME NOT NULL,
		active BOOLEAN NOT NULL,
    CONSTRAINT fk_user_message_idUser FOREIGN KEY (idUser) REFERENCES user(idUser),
    CONSTRAINT fk_user_message_idConversation FOREIGN KEY (idConversation) REFERENCES conversation(idConversation)
);


CREATE TABLE conversation(
    idConversation VARCHAR(50) PRIMARY KEY NOT NULL,
    idUserOne VARCHAR(50) NOT NULL,
    idUserTwo VARCHAR(50) NOT NULL,
    createDate DATETIME NOT NULL,
    CONSTRAINT fk_user_conversation_idUserOne FOREIGN KEY (idUserOne) REFERENCES user(idUser),
    CONSTRAINT fk_user_conversation_idUserTwo FOREIGN KEY (idUserTwo) REFERENCES user(idUser)
);