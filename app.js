var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose = require("mongoose"),
express = require("express"),
port = 3000,
app = express();

// App Config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes

app.get("/", function(req, res){
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
  Blog.find({}, function  (err, blogs){
      if(err){
        console.log("ERROR!")
      } else {
        res.render("index", {blogs: blogs});
      }
  });
});

app.post("/blogs", function(req, res){
  //create blog
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      render.res("new");
    } else {
      res.redirect("/blogs");
    }
  });
  //redirect
});

app.get("/blogs/new", function(req, res){
  res.render("new");
});

app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: foundBlog})
    }
  })
});

// Update Route
app.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err) {
      res.redirect("/blogs")
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  })
});

app.listen(port, () => console.log('Gator app listening on port 3000!'));