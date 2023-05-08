import express from 'express';
import { signup_POST, login_POST } from '../controller/user-controller.js';
import {fileUpload_POST, getImage} from '../controller/File-Controller.js'
import upload from '../utils/upload.js';
import {createPost, getPosts} from '../controller/post-controller.js'
import { authenticateToken } from '../controller/jwt-controller.js';

import multer from 'multer';

const upload_ = multer();

const router = express.Router()

router.post('/signup', upload.any(), signup_POST)
router.post('/login', upload.any() , login_POST)
router.post('/file/upload', upload.array('files'), fileUpload_POST)
router.get('/file/:filename', getImage)
router.post('/create', authenticateToken, upload.any(), createPost)
router.post('/posts', upload.any(), authenticateToken, getPosts)

export default router;