import express from 'express'
import { upload } from '../../upload.js';

import getblogs from '../controlers/getblogs.controler.js'
import posts from '../controlers/blog.controler.js'

const router =express.Router();

router.get('/getAllblogs',getblogs)
router.post('/creatblog',upload.single('article_image'),posts)

export {router as default}
