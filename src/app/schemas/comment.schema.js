import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import { CommonObject } from "./common.schema";

const { Schema } = mongoose;

let autoInc = mongooseSeq(mongoose);


const CommentSchema = new Schema({
    postId: {
        type: Number,
        default: null
    },
    commentId: {
        type: Number,
        default: 0
    },

    parentId: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: null
    },
    userId: {
        type: Number,
        default: null,
        ref: "user"
    },
    ...CommonObject

});


CommentSchema.plugin(autoInc, { inc_field: 'commentId' });

export const CommentModel = mongoose.model("comment", CommentSchema);

