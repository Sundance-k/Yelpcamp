var Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    app         = express(),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");


mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seed database
//seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "This can be any string and is used for scrambling the password",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
//====================================

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server is listening...");
});