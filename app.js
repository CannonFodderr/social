const express               = require('express'),
      mongoose              = require('mongoose'),
      path                  = require('path'),
      router                = express.Router(),
      passport              = require('passport'),
      methodOverride        = require('method-override'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      bodyParser            = require('body-parser'),
      User                  = require('./models/user');

const app = express(),
      dburl = process.env.DBURL || 'mongodb://localhost/socialNetwork';
      port = process.env.PORT || 8080;
//Import Routes
const indexRoutes = require('./routes/index'),
      userRoutes = require('./routes/user');
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
      next();
});

app.use(indexRoutes);
app.use('/user', userRoutes);

app.listen(port, (req, res) => console.log(`Server is running on port ${port}`));