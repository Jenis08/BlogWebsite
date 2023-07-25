import mongoose from "mongoose";
const {Schema, model} = mongoose;

const PostScheme = new Schema({
    title : {type: String, required: true},
    summary : {type: String, required: true},
    content : {type: String, required: true},
    cover: String,
    author : {type : Schema.Types.ObjectId, ref: 'User'},
}, {
    timestamps: true,
});

export const Post = model('Post', PostScheme);
