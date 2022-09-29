import { UserModel } from "../../schemas";
import { LikeModel } from "../../schemas";
import { FollowModel } from "../../schemas/follow.schema";

export class ProfileRepository {
    profileModel
    constructor(profileModel) {
        this.profileModel = profileModel;
    }

    async saveProfile() {
        let result = await ProfileModel.create({
            profileId: this.profileModel.user.userId,
            firstName: this.profileModel.body.firstName,
            lastName: this.profileModel.body.lastName,
            email: this.profileModel.body.email,
            mobileNumber: this.profileModel.body.mobileNumber
        });

        return result;
    }

    async checkProfileExists() {
        let result = await ProfileModel.findOne({ profileId: this.profileModel.user.userId });
        return result;
    }

}


export class GetProfileRepository {
    getProfileModel
    constructor(getProfileModel) {
        this.getProfileModel = getProfileModel;
    }

    async getProfile() {
        let result = await ProfileModel.findOne({
            profileId: this.getProfileModel.param.profileId
        });

        if (result) return result;
        return false;
    }
}

export class GetFollowersRepository {
    getFollowersModel
    constructor(getFollowersModel) {
        this.getFollowersModel = getFollowersModel;
    }

    async getFollowers() {
        let result = await FollowModel.aggregate
            ([
                {
                    $match: {
                        "followedBy": +this.getFollowersModel.param.profileId
                    }
                },
                {
                    $group: {
                        _id: "followedBy",
                        followersCount: {
                            $sum: 1
                        }
                    }
                }
            ]);

        if (result) return result;
        return false;
    }
}


export class GetUsersWhoLikedPostRepository {
    getUsersWhoLikedPostModel
    constructor(getUsersWhoLikedPostModel) {
        this.getUsersWhoLikedPostModel = getUsersWhoLikedPostModel;
    }

    async getWhoLikedPost() {
        let result = await LikeModel.aggregate([
            {
                $match: {
                    "uploadPostBy": +this.getUsersWhoLikedPostModel.param.userId
                }
            },
            {
                "$lookup": {
                    let: {
                        userIdX: "$likePostBy"
                    },
                    "from": "users",
                    "as": "docs",
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [
                                        "$$userIdX",
                                        "$userId"
                                    ]
                                }
                            }
                        },

                    ]
                }
            },
            {
                "$group": {
                    "_id": "$uploadPostBy",
                    likedUsers: {
                        $push: "$docs"
                    }
                }
            },
            {
                "$unwind": "$likedUsers"
            },
            {
                "$unwind": "$likedUsers"
            },
            {
                $group: {
                    _id: "$_id",
                    "likedUsers": {
                        "$addToSet": "$likedUsers"
                    }
                }
            }
        ]);

        if (result) return result;
        return false;
    }
}