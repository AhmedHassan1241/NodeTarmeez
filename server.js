const express= require('express');
const mongoose = require('mongoose');
const Article = require('./Model/Article');
const {check,validateRequest, validationResult} = require('express-validator');

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
app.get('/hello',(req, res) => {
    let numbers=""
    for(let i=1; i<=100; i++){
        numbers+= i + "-";
    }
    // res.sendFile(__dirname + "/views/index.html");
    res.render('index.ejs',{
        name:"Hassan",
        numbers:numbers
    })
})

app.get('/findSummation/:num1/:num2',(req, res) => {
    const {num1,num2} = req.params;
    const summation = +(num1) + +(num2);
    res.send(`The Summation are: ${num1} / ${num2}`);
})

app.get('/findSummation2',(req, res) => {

    const {num1,num2} = req.query;
    const summation = parseInt(num1) + parseInt(num2);
    res.send(`The Summation is: ${summation}`);
})

////////////////////Articles////////////////

///////get all articles /// find()
app.get('/articles',async(req, res) => {
    const articles=await Article.find();
    res.send(articles);
})

//// get single article by id  ///////findById
app.get('/articles/:id',check("id").isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer")
,async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg});
    }
    const articleId = await Article.findById(req.params.id);
    if(!articleId) {
        return res.status(404).send('Article not found');
    }
    res.send(articleId);
})

//// create new article  /// new Article()
app.post('/articles',
    [
    check('title').isString().notEmpty().withMessage('Title is required'),
    check('body').isString().notEmpty().withMessage('Body is required'),
    check('numberOfLikes').isNumeric().notEmpty().withMessage('Number of likes is required')  
    ] 
,async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg});
    }
    const article = new Article(req.body);
    await article.save()
   res.json(article)
})

///// delete article       findByIdAndDelete()
app.delete('/articles/:id',check('id').isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer")
,async(req, res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()[0].msg});
    }
    const articleDeleted = await Article.findByIdAndDelete(req.params.id);
    if(!articleDeleted) {
        return res.status(404).send('Article not found');
    }
    res.send("Article Deleted")
})

//// update article   ///// findByIdAndUpdate()

app.put('/articles/:id', [
    check('id').isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer"),
    check('title').isString().notEmpty().withMessage('Title is required'),
    check('body').isString().notEmpty().withMessage('Body is required'),
    check('numberOfLikes').isNumeric().notEmpty().withMessage('Number of likes is required')  
    ],
    async(req, res) => {
        const error =validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors: error.array()[0].msg});
        }
        let article = await Article.findByIdAndUpdate(req.params.id);
        if(!article) {
            return res.status(404).send('Article not found');
        }
        article.title = req.body.title;
        article.body = req.body.body;
        article.numberOfLikes = req.body.numberOfLikes;
        
        article.save()
        res.send(article)
    })


    //////////////////////// show all articles////////////////
    app.get('/showArticles', async (req, res) =>{
        let articles = await Article.find();
        res.render('articles.ejs',{
        allArticle: articles
        });
    })