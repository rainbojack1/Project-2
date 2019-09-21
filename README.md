#Suddy Buddy - Project # 2 
Colaborator: Seth Randell, Jesselyn Jackson  and Ryan Sims

Techknowlagies:
* JavaScript
* jQuery
* mySQL
* Node.js
* Handlebars
* Sequelize ORM
* Matirelize


#About Us
StudyBuddy was created because we saw how hard it was to find a study buddy especially for those already out of school.
We sought out to create a platform where users can find other buddies to help further their understanding and learning.
In the future, we want StudyBuddy to help connect students of all subjects and include in-house learning content.
StudyBuddy was created using HTML, CSS, Javascript, jQuery, Handlebars, MySQl, Materialize and Node.

Installing and setting up the App:
1) First create an account and choose a few interests to get started!
``` git clone https://github.com/rainbojack1/Project-2.git```
2) Creat a .env file in your main directory
```touch .env```
3) Add your mySQL password to the .env file
```MYSQL_KEY="Your password" (no quotes)```
4) Install NPM packages no need to install them mauall since we have a package.json file
```npm insall```
5) Created the database and add your seed data you may have to add the creatAT and updated at files if you getting an error imorting the seed files.
```mysq -u root -p
   source schema.sql
   souce seed.sql
```
7) Once that is done just run the app
```node server.js```


