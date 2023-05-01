import express from 'express';
import { signup_POST, login_POST } from '../controller/user-controller.js';

const router = express.Router()

router.post('/signup', signup_POST)
router.post('/login', login_POST)

export default router;