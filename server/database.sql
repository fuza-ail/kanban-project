CREATE DATABASE kanban;

CREATE TABLE "users" (
  "id" INT SERIAL PRIMARY KEY,
  "email" varchar(100) UNIQUE NOT NULL,
  "password" varchar(250) NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "boards" (
  "id" int SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "owner_id" int NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "members" (
  "id" int SERIAL PRIMARY KEY,
  "user_id" int,
  "board_id" int,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "groups" (
  "id" int SERIAL PRIMARY KEY,
  "board_id" int,
  "status_name" varchar(100),
  "color" varchar(50),
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "tasks" (
  "id" int SERIAL PRIMARY KEY,
  "group_id" int,
  "user_id" int,
  "title" varchar(100),
  "description" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "members" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "members" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");

ALTER TABLE "groups" ADD FOREIGN KEY ("board_id") REFERENCES "boards" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
