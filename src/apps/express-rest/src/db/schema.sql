CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username varchar(120) UNIQUE NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  full_name varchar(255),
  bio varchar(255),
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  post_id serial PRIMARY KEY,
  author_id int REFERENCES users ON DELETE CASCADE,
  title varchar(255) NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers (
  follower_id int REFERENCES users ON DELETE CASCADE,
  followed_id int REFERENCES users ON DELETE CASCADE,
  PRIMARY KEY(follower_id, followed_id)
);