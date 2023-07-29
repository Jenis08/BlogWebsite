
import {Post} from '../models/Post.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import util from 'util';

export const createPost = async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const PostDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        });
        res.json(PostDoc);
    });

};


export const seePost = async (req, res) => {
    res.json(await Post.find().populate('author', ['username']));
};

export const getPost = async (req, res) => {
    const {id} = req.params;
    const PostDoc = await Post.findById(id).populate('author', ['username']);
    res.json(PostDoc);
};

export const editPost =  async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
        if (err) throw err;
        const id = req.params.id;
        const { title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        
        const updateData = { title };
        if (summary) updateData.summary = summary;
        if (content) updateData.content = content;
        if (newPath) updateData.cover = newPath;

        const updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });

        res.json(updatedPost);
    });

};

// const jwtVerify = util.promisify(jwt.verify);

// export const editPost = async (req, res) => {
//     try {
//         // ... (existing code)

//         const decodedToken = await jwtVerify(req.cookies.token, process.env.JWT_SECRET);
//         const { id, title, summary, content } = req.body;
//         const postDoc = await Post.findById(id);

//         const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decodedToken.id);
//         if (!isAuthor) {
//             return res.status(400).json('You are not the author');
//         }

//         const updateData = { title };
//         if (summary) updateData.summary = summary;
//         if (content) updateData.content = content;
//         if (newPath) updateData.cover = newPath;

//         const updatedPost = await Post.updateOne({ _id: id }, { $set: updateData });

//         res.json(updatedPost);
//     } catch (error) {
//         console.error("Error updating post:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };