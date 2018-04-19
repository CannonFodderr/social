const express = require('express'),
        router = express.Router(),
        User = require('../models/user'),
        Post = require('../models/post'),
        app = express();

isLoggedIn = (req, res, next) => {
        if(!req.user){
                res.redirect('/');
        }
        else{
                next();
        }
}

router.get('/:id',isLoggedIn, (req, res) => {
                res.render('user/profile');  
});

router.get('/:id/edit',isLoggedIn, (req, res) =>{
        if(!req.user){
                res.redirect('/');                
        } else {
                res.render('user/editProfile'); 
        } 
});

router.put('/:id', (req, res) => {
        let userDetails = { 
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                company: req.body.user.company,
                location: req.body.user.city,
                bio: req.body.user.bio,
                bday: req.body.user.bday,
                gender: req.body.user.gender,
        }
        User.findByIdAndUpdate(req.params.id, userDetails, (err, updatedUser) => {
                if(err){
                        res.render('user/editProfile', {msg: err});
                } else {
                        res.redirect('/');
                }
        });
});

router.post('/:id/post',isLoggedIn, (req, res) => {
        let newPost = {
                author: req.user._id,
                content: req.body.post.content
        }
        Post.create(newPost, (err, createdPost) => {
                if(err){
                        console.log(err);
                        res.redirect('/');
                } else {
                        User.findById(req.user._id, (err, foundUser) => {
                                if(err){
                                        console.log(err);
                                        res.redirect('/');
                                } else {
                                        let ref = createdPost._id;
                                        foundUser.posts.push({ref});
                                        foundUser.save();
                                        res.redirect('/');
                                }
                        })
                }
        })
})

module.exports = router;