import { FollowRepository } from "../../repository/follow/follow.repository";


export class FollowService {
    followModel = null;
    followRepository
    constructor(followModel) {
        if (!followModel) {
            throw new BadRequestException("Provide likePost credential")
        }
        this.followModel = followModel;
        this.followRepository = new FollowRepository(this.followModel);
    }

    async init() {
        // postId -> param
        // emitEvents()
        let follow = await this.followUser();
        return follow;
    }

    async followUser() {

        if (await this.checkFollowedUserNotSelfFollowed()) {
            return {
                status: 401,
                msg: "you can not follow yourself"
            };
        }

        if (!await this.checkAlreadyFollowed()) {
            return "you have already followed this user"
        }
        let followResult = await this.followRepository.saveFollow();

        if (followResult) {
            return followResult;
        }

        return "internal error occured";

    }

    async checkFollowedUserNotSelfFollowed() {
        if (this.followModel.body.followedUserId == this.followModel.user.userId) {
            return true;
        }

        return false;
    }

    async checkAlreadyFollowed() {
        let check = await this.followRepository.findFollowedUser();
        if (check) {
            return false;
        }
        return true;
    }
}