import mongoose from "mongoose";
import { CommonObject } from "./common.schema";

const { Schema } = mongoose;


const BlockSchema = new Schema({
    blockedUser: {
        type: Number,
    },
    blockedBy: {
        type: Number,
    },
    ...CommonObject

});


export const BlockModel = mongoose.model("block", BlockSchema);

