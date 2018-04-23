const express               = require('express'),
      app                   = express(),
      dotenv                = require('dotenv').config();
      mongoose              = require('mongoose'),
      path                  = require('path'),
      router                = express.Router(),
      passport              = require('passport'),
      methodOverride        = require('method-override'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user');
      

const dburl = process.env.DBURL;
      port = process.env.PORT;

//Import Routes
const indexRoutes = require('./routes/index'),
      userRoutes = require('./routes/user'),
      postRoutes = require('./routes/posts');
// Mongo Config
mongoose.connect(dburl);
// APP Config
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
// Config Auth
app.use(require('express-session')({
      secret: "You can never guess this secret",
      saveUninitialized: false,
      resave: false
}));

app.use(passport.initialize()); 
app.use(passport.session());
//Config passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      if(req.user !== undefined){
            res.locals.notifications = req.user.notifications;
      } 
      next();
});
mongoose.Promise = global.Promise;
app.use(indexRoutes);
app.use('/user', userRoutes);
app.use('/user/:id/', postRoutes);

app.listen(port, (req, res) => console.log(`Server is running on port ${port}`));