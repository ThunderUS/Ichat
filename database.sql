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

