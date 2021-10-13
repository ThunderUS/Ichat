create TABLE users(
  id SERIAL PRIMARY KEY ,
  name VARCHAR(255),
  surname VARCHAR(255),
  login VARCHAR(255)
);

create TABLE aups(
  id SERIAL PRIMARY KEY ,
  aups VARCHAR(255),
  user_ID INTEGER,
  FOREIGN KEY (user_ID) REFERENCES users(id)
);

create TABLE  rooms(
    id SERIAL PRIMARY KEY ,
    users VARCHAR(255)
);

create TABLE  tokens(
   id SERIAL PRIMARY KEY ,
   tokens VARCHAR(255)
);
create TABLE  chats(
    id SERIAL PRIMARY KEY ,
    room_ID INTEGER,
    FOREIGN KEY (room_ID) REFERENCES rooms(id),
    user_ID INTEGER,
    foreign key (user_ID) REFERENCES users(id),
    message VARCHAR(255)
);
