const Article = require('../Model/Article')
const {check,validationResult} = require('express-validator')
const getAllArticles =async(req, res) => {
    const articles=await Article.find();
    res.send(articles);
}

const getArticleById = (check("id").isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer")
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

const createArticle =( async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    const article = new Article(req.body);
    await article.save()
   res.json(article)
})


const deleteArticle = (check('id').isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer")
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


const updateArticle = (
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


const showAtricles=async (req, res) =>{
    let articles = await Article.find();
    res.render('articles.ejs',{
    allArticle: articles
    });
}

const createValidation=[
    check('title').isString().notEmpty().withMessage('Title is required'),
    check('body').isString().notEmpty().withMessage('Body is required'),
    check('numberOfLikes').isNumeric().notEmpty().withMessage('Number of likes is required')  
];

const updateValidation=[
        check('id').isLength({min:24,max:24}).withMessage("ID: input must be a 24 character hex string, 12 byte Uint8Array, or an integer"),
        check('title').isString().notEmpty().withMessage('Title is required'),
        check('body').isString().notEmpty().withMessage('Body is required'),
        check('numberOfLikes').isNumeric().notEmpty().withMessage('Number of likes is required')   
];

module.exports = {
    getAllArticles, 
    getArticleById, 
    createArticle, 
    deleteArticle, 
    updateArticle, 
    showAtricles,
    createValidation,
    updateValidation,

}