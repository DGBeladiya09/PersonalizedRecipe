var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var request=require("request")
var base64=require("base64-img")
app.use(session({
    secret: "PersonliazedRecipe",
    cookie: { maxAge: 1000 * 60 },
    resave: false,
    saveUninitialized: false
}))
app.use(express.static("public"));
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

var ingredientRouter = require("./router/ingredientRouter.js");
var userRouter = require("./router/userRouter.js");
var recipeRouter = require("./router/recipeRouter.js");
var apiRouterV1=require("./router/apiRouterV1.js")
var importRouter=require("./router/recipeImportRouter.js")
app.use("/api/v1",apiRouterV1)
app.all("/", function (req, res) {

    if (req.session.userId) {
        res.sendFile(__dirname + "/public/Dashboard.html");
    }
    else {
       
        res.sendFile(__dirname + "/public/pages/uitility/sign-in.html");
    }
});
app.use("/ingredient", ingredientRouter);
app.use("/user", userRouter);
app.use("/recipe",recipeRouter);
app.use("/import/recipe",importRouter)
app.listen(8080, () => {
    console.log("server started ");
});
