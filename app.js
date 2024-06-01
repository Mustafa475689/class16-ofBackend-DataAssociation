const express = require('express');
const app = express();

const userModel = require("./models/user");
const postModel = require("./models/posts");
const user = require('./models/user');

app.get('/', (req, res) => {
    res.send("hey");
})

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: "khan",
        age: 25,
        email: "khan@gmail.com"
    });
    res.send(user);
});

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postdata: "kese hu",
        user: "665b8416d1c5044455fdadb3"
    });

    let user = await userModel.findOne({_id: "665b8416d1c5044455fdadb3"})
    user.posts.push(post._id);
    await user.save();

     res.send({ post, user })
});

app.listen(3000);