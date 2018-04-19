const   express = require('express'),
        mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');


let userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    registerDate: {
        type: Date, 
        default: Date.now()
    },
    isAdmin: {
        type: Boolean, 
        default: false},
    firstName: String,
    lastName: String,
    gender: {
        type: String,
        default: "Female"
    },
    avatar: {
        type: String,
        default: "/images/defaultAvatar.png"
    },
    bday: {
        type: Date,
        default: Date.now
    },
    bio: String,
    company: String,
    posts: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    }],
    location: {
        type: String,
        default: 'tel-aviv'
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);