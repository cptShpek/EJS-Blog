const express = require("express");
const bodyParser = require("body-parser");
var _ = require('lodash');
const ejs = require("ejs");
const {homeStartingContent, aboutContent, contactContent} = require(__dirname + '/modules/text.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Variables
const posts = []

//


app.get('/', function(req, res) {
  res.render('home', {homeStartingContent, posts})
})


app.get('/about', function(req, res) {
  res.render('about', {aboutContent})
})


app.get('/contact', function(req, res) {
  res.render('contact', {contactContent})
})


app.get('/compose', function(req, res) {
  res.render('compose')
})

app.post('/compose', function(req, res) {
  posts.push({
    title: req.body.postTitle,
    content: req.body.postBody,
  })
  console.log(posts)
  res.redirect('/')
})

app.get('/posts/:postName', function(req, res) {
  let post = posts.find(post => _.lowerCase(post.title) === _.lowerCase(req.params.postName))
  res.render('post', {post})
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
