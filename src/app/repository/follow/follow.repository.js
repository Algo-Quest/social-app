import { FollowModel } from "../../schemas";

export class FollowRepository {
    followModel
    constructor(followModel) {
        this.followModel = followModel;
    }

    async saveFollow() {
        let result = await FollowModel.create({
            followedBy: this.followModel.user.userId,
            followedUser: this.followModel.body.followedUserId
        })
        return result;
    }

    async findFollowedUser() {
        let result = await FollowModel.findOne({
            followedBy: this.followModel.user.userId,
            followedUser: this.followModel.body.followedUserId
        })

        return result;
    }

}