var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session=require("express-session");

/*app.use(session({
    secret:"PersonliazedRecipe",
    cookie:{maxAge:1000*60}
}))*/
app.use(express.static("public"));
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

var ingredientRouter = require("./router/ingredientRouter.js");
var userRouter = require("./router/userRouter.js");
/*app.all("/", function (req, res) {
   /* console.log("Hello")
    if(req.session.userID){
        console.log("Hello");
      //  res.sendFile(__dirname + "/public/index.html");
    }
    else{
        res.send("Hello");
        res.end();
    }

});*/
app.use("/ingredient", ingredientRouter);
app.use("/user", userRouter)

app.listen(3080,() => {
    console.log("server started ");
});
