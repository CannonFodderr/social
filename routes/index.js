const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      request = require('request'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('../models/user'),
      Post = require('../models/post');
// set mongoose promises
mongoose.Promise = global.Promise;
// Connect to Yahoo weather api
getWeather = (city, cb) => {
      yahooWeatherUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%2C%20ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
      request(yahooWeatherUrl, (err, response, body) => {
            if(!err && response.statusCode !== 200){
                 return console.log(`Didn't get weather`); 
            } 
            let parseData = JSON.parse(body);
            cb(null, parseData.query.results.channel);
      });     
}

// Routes
router.get('/', (req, res) => {
      Post.find({isPublic: true})
      .exec()
      .then((posts) =>{
            if(req.user){
                  let weather = "";
                        getWeather(req.user.location, (err, body) => {
                        if(err){
                              console.log(err);
                        } else {
                              weather = body;                              
                              res.render('./index/index', {weather: weather, posts:posts});
                        }
                  });           
                  } else {
                        res.render('./index/index', {posts:posts});
                  }         
      })
      .catch((err) => {
            console.log(err);
      })
})
// Login Route
router.post('/login', passport.authenticate('local', {successRedirect: 'back', faliureRedirect: 'back'}));
// Registration Routes
router.get('/signup', (req, res) => res.render('./index/register', {msg: ''}));


router.post('/signup', (req, res) =>{
      User.register({username: req.body.user.email}, req.body.user.password)
      .then((user) => {
            let welcome = "Welcome to the website!";
            user.notifications.push({content: welcome});
            user.save();
            res.redirect('/');
      })
      .catch((err)=>{
            console.log(err);
            res.redirect('back');
      })
})

router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/')
});




module.exports = router;