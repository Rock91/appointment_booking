const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require("body-parser");
const sequelize = require('sequelize')
const passport = require("passport");
const strategy = require("./utils/jwtOptions");
const Routes = require("./routes");
const Models = require('./models')
const Contollers = require('./controllers')
const port = 3000

const app = express()
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({extends:false}))
// use the strategy
passport.use("strategy" , strategy);

const { resolve } = require('path')

app.use(Routes)

app.get('/', (req, res) => res.send('Hello World!'))

// sequelize.sync().then(()=>{
    app.listen(port, () => console.log(`Shopping app listening on port ${port}!`))
// }).catch(err =>{
//     console.log("error====",err)
// })