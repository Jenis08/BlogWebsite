import {User} from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendCookie } from '../util/features.js';

const salt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        await User.create({ username, password: await bcrypt.hashSync(password, salt) });
    }
    catch (e) {
        res.status(400).json(e);
    }

};

export const login = async (req, res) => {

    const { username, password } = req.body;

    const UserDoc = await User.findOne({ username });

    const passOk = bcrypt.compareSync(password, UserDoc.password);


    if (passOk) {
        sendCookie(UserDoc, res, username);
    }
    else {
        res.status(400).json('wrong');
    }
};


export const profile = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
};

export const logout = (req, res) => {
    res.cookie('token', '').json('ok');
};
