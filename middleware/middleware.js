const   middlewareOBJ   = {},
        Post = require('../models/post');

 middlewareOBJ.isLoggedIn = (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        }
        else{
            res.redirect('back');
        }
    }

module.exports = middlewareOBJ;
