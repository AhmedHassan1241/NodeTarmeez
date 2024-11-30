const express= require('express');
const mongoose = require('mongoose');
const Article = require('./Router/ArticleRouter');
const ArticleEjs = require('./Router/showEjs');

const app = express();
app.use(express.json()); // to convet **json** to **object** to allow for use req.body 
const PORT= 8001

mongoose.connect("mongodb+srv://ahmed124:1241999a_H@cluster0.esvcbxw.mongodb.net/Article?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connected to DB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port localhost:${PORT}`);
    });
}).catch((error)=>{
    console.log("Failed to connect to DB",error);
    
})

////////////////////Articles////////////////
app.use('/',(req, res) => {
    res.send("Hello Congratulation You");
  })

app.use('/articles',Article)


//////////////////////// show all articles////////////////
app.use('/showArticles',ArticleEjs)    