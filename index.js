var express = require("express")
var dotenv = require("dotenv");
dotenv.config();
var userRoute = require("./src/route/user.js")
var homeRoute = require("./src/route/home.js")
var authRoute = require("./src/route/auth.js")
var app = express()


var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//middleware contoh
var log = require("./src/middleware/log.js") 
app.use(log)

var jwt = require("./src/middleware/jwt.js") 
app.use(jwt.verifyToken)

//implementasi route
app.use('/auth',authRoute)
app.use('/users', userRoute)
app.use('/',homeRoute)

app.listen(process.env.PORT, () => {
    console.log("Example app listening on port", process.env.PORT );
  });