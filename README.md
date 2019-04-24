# NewsFinder
Objective: Create a web app that lets users view and leave comments on the latest news. Flex your Mongoose and Cheerio muscles to scrape news from another site.

## Overview
This web app gives users the ability to pull, save, and make notes for recent articles posted on the Chicago Reader website. 

Live Link - https://shrouded-crag-80261.herokuapp.com/

## Tech Used
**Front End:** 
* Javascript
* Jquery
* Handlebars

**Back End:**
* Node.js
* Express.js
* Mongoose (ORM)

**Database:**
* MongoDB

**Deployment:**
* Heroku

## Future Development
* The sorting logic to show the most recent article first may not be reliable due to the date formatting used in the database & Reader site. Moment JS may be needed to convert those dates into a format that works best with MongoDB's native sort function.