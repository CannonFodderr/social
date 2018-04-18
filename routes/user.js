const express = require('express'),
        router = express.Router(),
        User = require('../models/user'),
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
        console.log(req.body);
        let userDetails = { 
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                company: req.body.user.company,
                bio: req.body.user.bio,
                age: req.body.user.age,
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