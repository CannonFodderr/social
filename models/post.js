const   express = require('express'),
        mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');


let postSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    image: {
        type: String,
        default: "/images/defaultImage.jpg"
    },
    isPublic: {
        type: Boolean,
        default: true
    }
});



module.exports = mongoose.model("Post", postSchema);