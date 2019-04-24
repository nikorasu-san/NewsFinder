# NewsFinder
Objective: Create a web app that lets users view and leave comments on the latest news. Flex your Mongoose and Cheerio muscles to scrape news from another site.

## Overview
This web app gives users the ability to pull, save, and make notes for recent articles posted on the Chicago Reader website (https://www.chicagoreader.com/chicago/ArticleArchives). 

Live Link - https://shrouded-crag-80261.herokuapp.com/

## Instructions
* Press "Scrape Articles" to pull new articles for the homepage.
* Each new card will represent an article from the Chicago Reader site for you to interact with.
* Press "Save Article" to store an article for the "saved" view.
* Press "View Saved" to see all saved articles. The cards now have two new options.
* Press "Remove" to remove an article from the saved view.
* Press "Make Notes" for the ability to make or edit a note for the respective article.
* Press "Clear Articles" to clear out all the articles on the home page and saved view.
* Please note that clearing, saving, and notes are public for all visitors. 

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
