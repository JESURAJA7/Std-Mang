const express = require("express");
//express app
const app = express();

const port = 3000;
const mongoose = require('mongoose'); //to connect to mongodb

//connect to mongodb and listen to requests
mongoose.connect("mongodb://localhost:27017/result_mang", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

//register view engine
app.set('view engine', 'ejs');
//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});