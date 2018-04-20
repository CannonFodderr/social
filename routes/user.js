const   express = require('express'),
        router = express.Router(),
        User = require('../models/user'),
        Post = require('../models/post'),
        app = express(),
        middleware = require('../middleware/middleware');

router.get('/:id',middleware.isLoggedIn, (req, res) => {
        User.findById(req.user._id).populate('posts').exec((err, foundUser) => {
                if(err){
                        console.log(err),
                        res.redirect('back');
                } else {
                        res.render('user/profile', {posts: foundUser.posts});
                }
        })
                 
});

router.get('/:id/edit',middleware.isLoggedIn, (req, res) =>{
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

module.exports = router;