import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import { CommonObject } from "./common.schema";

const { Schema } = mongoose;

let autoInc = mongooseSeq(mongoose);


const PostSchema = new Schema({
    postId: {
        type: Number,
        default: 0
    },

    text: {
        type: String,
        default: null
    },

    friendTag: {
        type: [String],
        default: []
    },

    hashTag: {
        type: [String],
        default: []
    },

    file: {
        type: Object,
        default: {}
    },
    userId: {
        ref: "user",
        type: Number
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    ...CommonObject

});


PostSchema.plugin(autoInc, { inc_field: 'postId' });

export const PostModel = mongoose.model("post", PostSchema);

