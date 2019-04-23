var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//This is the INDEX route (show all campgrounds)
router.get("/", function(req,res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});  
        }
    });
});

//This  is our CREATE route (add new campground to DB)
router.post("/", middleware.isLoggedIn, function (req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username,
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};
    //create a new campground and save back to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");         
        }
    });
});

//This is our NEW route (shows new form to create campgrounds)
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//This is our SHOW route (shows more info about one campg)
router.get("/:id", function(req, res) {
    //find campg with ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "campground not found");
            res.redirect("back");
            console.log(err);
        } else {
            //render show template with that page
            res.render("campgrounds/show", {campground:foundCampground});           
        }
    });

});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct CG
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;