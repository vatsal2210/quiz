# quiz
Quiz:

node version : 4.9.1
npm version: 2.15.11

This is an application with Node JS, Express, EJS template and Sqlite3 database. User have to register to start a Quiz and then there are 10 questions coming from database with options. All the questions are bind with one correct options. After submitting test each questions will be check with its respective answer_id.

Download database viewer: http://sqlitebrowser.org/ to check Sqlite3 db in desktop.

--------------------------------------------------------------------------------------------------------
Database Structure:

1. mst_user:
CREATE TABLE "mst_user" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `email` TEXT NOT NULL, `score` INTEGER NOT NULL DEFAULT 0, `last_try` TEXT, `total_try` INTEGER DEFAULT 0, `created_at` TEXT )

2. mst_questions
CREATE TABLE "mst_questions" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `question` TEXT NOT NULL, `answer_id` INTEGER, `score` INTEGER NOT NULL )

3. question_options_mapping
CREATE TABLE "question_options_mapping" ( `question_id` INTEGER NOT NULL, `answer_id` INTEGER NOT NULL, `answer` TEXT )

--------------------------------------------------------------------------------------------------------
Start a code

To start in new machine

1. npm install (install all required modules mentioned in package.json)
2. node main.js
