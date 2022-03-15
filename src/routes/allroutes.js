import express from 'express'

import {Authorrize} from './auth.route.js'
import {Articles} from './article.route.js'
import { Comments } from './comments.js';
import { Skills } from './skills.js';
import {Newsletter} from './newsletter.js'
import { upload } from '../config/upload.js';
import { Contacts } from './contacts.js';
import { verifyToken} from '../config/verify.js';
import { Projects } from './projects.js';


const router =express.Router();
//login and signin
router.post('/api/auth/sign',Authorrize.register)
router.post('/api/auth/login',Authorrize.login)

//aricle
router.get('/api/articles/view', Articles.getArticles)
router.post('/api/articles/add', verifyToken, upload.single('article_image'), Articles.createArticle)
router.post('/api/articles/update', verifyToken, upload.single('article_image'), Articles.updateArticle)
router.post('/api/articles/delete', verifyToken, Articles.deleteArticle)
console.log('>>>>>>>>>>')
//coments
router.get('/api/comments/view', Comments.getComments)
router.post('/api/comments/add', Comments.createComment)
router.post('/api/comments/delete', verifyToken,Comments.deleteComment)

//skills
router.get('/api/skills/view', Skills.getSkills)
router.post('/api/skills/add', verifyToken, upload.single('skill_image'), Skills.createSkills)
//Projects
router.get('/api/projects/view', Projects.getProject)
router.post('/api/projects/add', verifyToken, upload.single('project_image'), Projects.createProject)

// Contacts
router.get('/api/contacts/view', Contacts.getContacts)
router.post('/api/contacts/add', verifyToken, Contacts.createContact)
router.post('/api/contacts/delete',verifyToken, Contacts.deleteContact)

//Newsletter
router.get('/api/newsletter/view', Newsletter.getNews)
router.post('/api/newsletter/add', verifyToken, Newsletter.createNewsletter)
router.post('/api/newsletter/delete', verifyToken, Newsletter.deleteNewsletter)








export default router