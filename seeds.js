var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Lake Tahoe",
        image:  "https://www.campsitephotos.com/photo/camp/49966/Little_Grass_Valley_Reservoir_2.jpg",
        description: "Cras pulvinar mattis nunc sed blandit libero volutpat sed. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Turpis massa sed elementum tempus. Morbi tristique senectus et netus et malesuada fames ac. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Scelerisque purus semper eget duis at tellus at urna. Eu scelerisque felis imperdiet proin fermentum leo vel. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Magna etiam tempor orci eu lobortis elementum nibh tellus. Proin gravida hendrerit lectus a. In aliquam sem fringilla ut morbi. Sit amet nisl purus in mollis nunc sed. Pharetra pharetra massa massa ultricies mi. Volutpat est velit egestas dui id. Habitasse platea dictumst quisque sagittis purus sit amet. Porta nibh venenatis cras sed felis eget velit aliquet. Tristique et egestas quis ipsum." 
    },
    {
        name: "Camp Granada",
        image:  "https://www.campsitephotos.com/photo/camp/41089/Camp_Shelly_018.jpg",
        description: "Consequat ac felis donec et odio pellentesque diam. Rhoncus dolor purus non enim. Et tortor consequat id porta. Odio aenean sed adipiscing diam donec adipiscing. Pharetra et ultrices neque ornare aenean euismod. Et tortor at risus viverra adipiscing at in. Neque gravida in fermentum et. Quam elementum pulvinar etiam non. Ornare arcu dui vivamus arcu felis bibendum ut. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tortor at risus viverra adipiscing at in tellus. Fames ac turpis egestas sed. Eget lorem dolor sed viverra ipsum nunc. Platea dictumst quisque sagittis purus sit. Ut morbi tincidunt augue interdum velit euismod in pellentesque. Eu facilisis sed odio morbi quis commodo. Lacus sed turpis tincidunt id aliquet risus feugiat. Sed lectus vestibulum mattis ullamcorper. Leo urna molestie at elementum. Amet justo donec enim diam."         
    },
    {
        name: "Camp Sleep Tent",
        image:  "https://www.campsitephotos.com/photo/camp/35472/Kartchner_Caverns_State_Park_View.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque ornare aenean euismod elementum nisi quis eleifend quam. Adipiscing diam donec adipiscing tristique risus nec feugiat in fermentum. Massa ultricies mi quis hendrerit. Convallis posuere morbi leo urna molestie. Cras pulvinar mattis nunc sed blandit. Consectetur lorem donec massa sapien. Diam sollicitudin tempor id eu nisl nunc. A erat nam at lectus urna. Et netus et malesuada fames ac turpis egestas integer eget. Convallis convallis tellus id interdum velit laoreet id donec. Consequat ac felis donec et." 
    }
];

function seedDB() {
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function (err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        }, function (err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
