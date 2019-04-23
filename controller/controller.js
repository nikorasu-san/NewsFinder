var axios = require("axios");
var cheerio = require("cheerio");
//var mongoose = require("mongoose");
// database requires all models in folder
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({}, function (err, data) {
            res.render("index", { result: data });
        })
    });

    app.get("/scrape", function (req, res) {
        // ping the archive page on Chicago Reader website
        axios.get("https://www.chicagoreader.com/chicago/ArticleArchives").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            $(".archiveListing").each(function (i, element) {
                // Save an empty result object
                var result = {};


                // Add the text, href, description, byline, and publish date of every article in archive
                result.headline = $(this).find(".headline").children("a").text();
                result.url = $(this).find(".headline").children("a").attr("href");
                result.description = $(this).find(".subhead").text().trim();
                result.byline = $(this).find(".byline").text().trim();
                result.pubDate = $(this).find(".date").text().trim();
                // result.link = $(this)
                // create articles
                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                        res.redirect("/");
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
        });

    });

    app.post("/save/:id", function (req, res) {
        let id = req.params.id
        // take id and query for document then make saved true
        db.Article.findByIdAndUpdate({ _id: id }, { saved: true }, { new: true })
            .then(function (article) {
                console.log(article);
                res.json({ message: "This is now a saved article" })
            }).catch(function (err) {
                console.log(err);
            });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true }, function (err, data) {
            res.render("saved", { result: data });
        })
    })

    app.post("/remove/:id", function (req, res) {
        let id = req.params.id;
        // take id and query for document then make saved true
        db.Article.findByIdAndUpdate({ _id: id }, { saved: false }, { new: true })
            .then(function (article) {
                console.log(article);
                res.json({ message: 'This article has been removed' })
            }).catch(function (err) {
                console.log(err);
            });
    })

    app.get("/article/:id", function (req, res) {
        let id = req.params.id;
        db.Article.findById(id).populate("note")
            .then(function (dbNote) {
                console.log(dbNote);

                res.json(dbNote)
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    app.post("/article/:id", function (req, res) {
        let id = req.params.id;
        db.Note.create(req.body).then(function (dbNote) {
            return db.Article.findByIdAndUpdate({ _id: id }, { note: dbNote._id }, { new: true })
        }).then(function (dbArticle) {
            console.log(dbArticle);
            res.json(dbArticle)
        })
            .catch(function (err) {
                console.log(err);
            });
    });

    app.get("/clear", function (req, res) {
        //let id = req.params.id;
        // take id and query for document then make saved true
        db.Article.remove({})
            .then(function (article) {
                console.log(article);
                // res.json({ message: 'This article has been removed' })
                res.redirect("/")
            }).catch(function (err) {
                console.log(err);
            });
    })

}