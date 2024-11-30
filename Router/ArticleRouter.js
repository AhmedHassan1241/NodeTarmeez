const express= require('express');
const router = express.Router();
const ArticleController = require('../Controller/ArticleController')



router.route('/')
.get(ArticleController.getAllArticles)
.post(ArticleController.createValidation,ArticleController.createArticle)


router.route('/:id')
.get(ArticleController.getArticleById)
.delete(ArticleController.deleteArticle)
.put(ArticleController.updateValidation,ArticleController.updateArticle)





module.exports = router;


