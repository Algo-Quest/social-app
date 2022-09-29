import mongoose from "mongoose";
import mongooseSeq from "mongoose-sequence";
import { CommonObject } from "./common.schema";

const { Schema } = mongoose;

let autoInc = mongooseSeq(mongoose);


const UserSchema = new Schema({
    userId: {
        type: Number,
        default: 0
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    password: {
        type: String
    },
    gender: {
        type: String,
    },
    mobileNumber: {
        type: Number,
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    ...CommonObject

});


UserSchema.plugin(autoInc, { inc_field: 'userId' });

export const UserModel = mongoose.model("user", UserSchema)

