const   middlewareOBJ   = {},
        Post = require('../models/post'),
        User = require('../models/user');

middlewareOBJ.isLoggedIn = (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.redirect('back');
        }
    }

middlewareOBJ.checkPostOwnership = (req, res, next)=>{
    if(req.isAuthenticated()){
        Post.findById(req.params.postid, (err, foundPost)=>{
            if(foundPost.author._id.equals(req.user._id)){
                next();
            } else {
                res.redirect('back');
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports = middlewareOBJ;
