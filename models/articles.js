var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
    // `title` is required and of type String
    headline: {
        type: String,
        required: true
    },
    // `link` is required and of type String
    url: {
        type: String,
        required: true
    },
    description: String,
    byline: String,
    pubDate: {
        type: String
    },
    // `note` is an object that stores a Note id
    // The ref property links the ObjectId to the Note model
    // This allows us to populate the Article with an associated Note
    saved: {
        type: Boolean,
        default: false,
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "notes"
    }
});

ArticleSchema.methods.saveArticle = function () {
    // Make the "isCool" property of the current user equal to the boolean "true"
    this.saved = true;
    // Return the new boolean value
    return this.saved;
}

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("articles", ArticleSchema);

// Export the Article model
module.exports = Article;