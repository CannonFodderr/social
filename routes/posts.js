const express = require('express'),
        router = express.Router(),
        User = require('../models/user'),
        Post = require('../models/post'),
        middleware = require('../middleware/middleware'),
        app = express();

router.post('/post',middleware.isLoggedIn, (req, res) => {
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
                                    foundUser.posts.push(ref);
                                    foundUser.save();
                                    res.redirect('/');
                            }
                    });
            }
    });
});

router.delete('/post/:postid', (req, res) => {
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
                            })

                    }
            }
    })
})

module.exports = router;