const express= require('express');
const router = express.Router();
const ArticleRouter = require('../Controller/ArticleController')


router.get('/',ArticleRouter.showAtricles)

module.exports =router;