const express = require('express'),
        router = express.Router(),
        User = require('../models/user'),
        Post = require('../models/post'),
        middleware = require('../middleware'),
        app = express();

router.post('/post',middleware.isLoggedIn, (req, res) => {
        let isPublicValue;
        if(req.body.post.isPublic == undefined){
                isPublicValue = false;
        } else {
                isPublicValue = true;
        }
    let newPost = {
            author: req.user._id,
            content: req.body.post.content,
            isPublic: isPublicValue
    }
    Post.create(newPost, (err, createdPost) => {
            if(err){
                    console.log(err);
                    res.redirect('back');
            } else {
                    User.findById(req.user._id, (err, foundUser) => {
                            if(err){
                                    console.log(err);
                                    res.redirect('/');
                            } else {
                                    let ref = createdPost._id;
                                    foundUser.posts.push(ref);
                                    foundUser.save();
                                    res.redirect('back');
                            }
                    });
            }
    });
});

router.delete('/post/:postid',middleware.checkPostOwnership, (req, res) => {
    Post.findById(req.params.postid, (err, foundPost) => {
            if(err){
                    console.log(err);
                    res.redirect('back');
            } else {
                    if(foundPost.author == req.user.id){
                            User.findById(req.user._id, (err, foundUser)=>{
                                    if(err){
                                            console.log(err);
                                            res.redirect('/');
                                    } else {
                                            //Delete Reference
                                            let toPull = foundPost.id;
                                            foundUser.posts.pull({_id: toPull});
                                            foundUser.save();
                                            // Delete Post
                                            foundPost.remove();
                                            res.redirect('back');
                                    }
                            });

                    }
            }
    });
});
router.get('/post/:postid/edit',middleware.checkPostOwnership, (req, res)=>{
        res.render('post/edit');
});

module.exports = router;