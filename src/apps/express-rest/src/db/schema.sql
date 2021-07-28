CREATE TABLE "Users" (
  "userId" serial PRIMARY KEY,
  "username" varchar(120) UNIQUE NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "fullName" varchar(255),
  "bio" varchar(255),
  "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Posts" (
  "postId" serial PRIMARY KEY,
  "authorId" int REFERENCES "Users" ON DELETE CASCADE,
  "title" varchar(255) NOT NULL,
  "content" text NOT NULL,
  "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Followers" (
  "followerId" int REFERENCES "Users" ON DELETE CASCADE,
  "followedId" int REFERENCES "Users" ON DELETE CASCADE,
  PRIMARY KEY("followerId", "followedId")
);