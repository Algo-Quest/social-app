import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import { CommonObject } from "./common.schema";

const { Schema, model } = mongoose;

let autoInc = mongooseSeq(mongoose);


const CommentSchema = new Schema({
    likeId: {
        type: Number,
    },
    postId: {
        type: Number,
        default: null
    },
    uploadPostBy: {
        type: Number,
    },
    likePostBy: {
        type: Number,
        default: 0
    },
    ...CommonObject

});


CommentSchema.plugin(autoInc, { inc_field: 'likeId' });

export const LikeModel = model("like-post", CommentSchema);

