import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const UserScheme = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true},
});

export const User = model('User', UserScheme);

