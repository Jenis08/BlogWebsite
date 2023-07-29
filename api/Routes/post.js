import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer";
const uploadMiddleware = multer({ dest: 'uploads/' });
import { isAuthenticated } from '../middlewares/auth.js';
import { createPost, editPost, getPost, seePost } from '../Controllers/post.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const router = express.Router();
router.use('/uploads', express.static(path.join(__dirname ,'uploads')));

router.post('/post', isAuthenticated, uploadMiddleware.single('file'), createPost);

router.get('/post', seePost);

router.get('/post/:id', getPost);

router.put('/post/:id', isAuthenticated, uploadMiddleware.single('file'), editPost);

export default router;