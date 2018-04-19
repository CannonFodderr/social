const   express = require('express'),
        mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');


let postSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    image: String
});



module.exports = mongoose.model("Post", postSchema);