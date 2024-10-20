const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
uuidv4(); 
 

app.use(express.urlencoded({extended: true})); //Middleware used to purse the path coming from the client side. 
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [              //It is let not const so that it can be deleted when required.
{
    id: uuidv4(),
    username: "Pushpanjali",
    Content: "Hey! I'm pushpanjali, I am pursuing btech in Ajay Kumar garg engineering college. My branch is CSE(DS)."
},

{
    id: uuidv4(),
     username: "Anjali",
    Content: "Hey! I'm anjali, I am puring btech in chitkara university. My branch is CSE and i love to code!"
},

{
    id: uuidv4(),
    username: "Shweta",
   Content: "Hey! I'm Shweta, I am puring btech in lpu university. My branch is CSE and i love to watch web series."
},

{
    id: uuidv4(),
    username: "Kirti",
   Content: "Hey! I'm kirti, I am puring btech in chandigarh university. My branch is CSE and i love travelling."
},

]

app.get("/posts", (req,res)=> {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=> {
    res.render("new.ejs");
});

app.post("/posts", (req,res)=> {
    let id = uuidv4();
    let {username, Content} = req.body;
    posts.push({id, username, Content});
    // console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id", (req,res) => {
    let {id} =req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res) => {
    let {id} =req.params;
    let newContent = req.body.Content;
    let post = posts.find((p) => id === p.id);
    post.Content = newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) => {
    let {id} =req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res) => {
    let {id} =req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
    // res.send("delete success");
});


app.listen(port, ()=> {
    console.log("listening on the port: 8080");
});
