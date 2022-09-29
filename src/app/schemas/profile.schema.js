import mongoose from 'mongoose';
const { Schema } = mongoose;


const ProfileSchema = new Schema({
    profileId: {
        type: Number,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobileNumber: {
        type: Number
    },
    email: {
        type: String
    },
});


export const ProfileModel = mongoose.model("profile", ProfileSchema)

