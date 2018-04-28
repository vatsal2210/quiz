# quiz
Quiz:

node version : 4.9.1
npm version: 2.15.11

This is an application with Node JS, Express, EJS template and Sqlite3 database. User have to register to start a Quiz and then there are 10 questions coming from database with options. All the questions are bind with one correct options. After submitting test each questions will be check with its respective answer_id.

Download database viewer: http://sqlitebrowser.org/ to check Sqlite3 db in desktop.

--------------------------------------------------------------------------------------------------------
Database Structure:

All the querys are mentioned in this file : quiz/util/constants.js

1. mst_user:
	Create Table : 
		CREATE TABLE "mst_user" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT NOT NULL, `email` TEXT NOT NULL, `score` INTEGER NOT NULL DEFAULT 0, `last_try` TEXT, `total_try` INTEGER DEFAULT 0, `created_at` TEXT )
	
	Insert Data:
		SAVE_USER_INFO: "INSERT INTO mst_user(name, email, created_at) VALUES (?,?,?)",
	
2. mst_questions
	Create Table : 
		CREATE TABLE "mst_questions" ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `question` TEXT NOT NULL, `answer_id` INTEGER, `score` INTEGER NOT NULL )

3. question_options_mapping
	CREATE TABLE "question_options_mapping" ( `question_id` INTEGER NOT NULL, `answer_id` INTEGER NOT NULL, `answer` TEXT )

--------------------------------------------------------------------------------------------------------
Setup program

1. Download program in a folder
2. Go to folder
3. Type npm install (install all required modules mentioned in package.json)
4. Once Install is done start node main.js
5. Open browser and open a page localhost:80 (Server is running on port 80)

--------------------------------------------------------------------------------------------------------
Deploy code on AWS

1.	Create an EC2 Instance(Linux System)
2.	Login with SSH with Instance IP
3.	Upload a Node JS folder and install Node Module and sqlite3 (npm install sqlite3)
4. 	Start with node main.js
5.  Open EC2 Instance URL in Browser : ip:80
