import jwt from "jsonwebtoken";

export const sendCookie = (UserDoc, res, username, statusCode = 200) => {
    jwt.sign({ username, id: UserDoc._id }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
            id: UserDoc._id,
            username,
        });
    });

};