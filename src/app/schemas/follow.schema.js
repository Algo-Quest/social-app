import mongoose from "mongoose";
import { CommonObject } from "./common.schema";

const { Schema } = mongoose;


const FollowSchema = new Schema({
    followedUser: {
        type: Number,
    },
    followedBy: {
        type: Number,
    },
    ...CommonObject

});


export const FollowModel = mongoose.model("follow", FollowSchema);

