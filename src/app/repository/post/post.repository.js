import { PostModel } from "../../schemas/post.schema";
import { LikeModel } from "../../schemas/like-post.schema";
import { BadRequestException } from "../../shared/http/exception-success";
class PostRepository {

    constructor() { }

    async savePost(document) {
        return await new PostModel(document).save();
    }

    async deletePost(id) {
        return await new PostModel.findOneAndDelete({ id });
    }
}

class LikePostRepository {
    user;
    param;
    constructor(likePostModel) {
        const { user, param } = likePostModel;
        this.user = user;
        this.param = param;
    }

    async savelikePost() {
        // console.log(+this.param.postId);

        let aggr = await PostModel.aggregate([
            {
                $match: {
                    postId: +this.param.postId
                }
            }
        ]);

        if (aggr.length > 0 && !aggr[0].userId) {
            return "user post does not exist";
        }

        return await LikeModel.create({ uploadPostBy: aggr[0].userId, likePostBy: this.user.userId, postId: +this.param.postId });
    }

    async checkLikePostExistsByUser() {
        return await LikeModel.findOne({ likePostBy: this.user.userId, postId: this.param.postId });
    }
    async isPostAvailable() {
        return await PostModel.findOne({ postId: this.param.postId });
    }
}


class DeletePostRepository {

    constructor() { }

    async deletePost(userId, postId) {
        return await PostModel.findOneAndDelete({ userId: userId, postId: postId });
    }
}

export function pagination(page, limit) {

    if (!page) {
        page = 1
    }

    if (!limit) {
        limit = 10
    }

    limit = +limit

    const p = (+page - 1) * +limit;

    return {
        p, limit,
    }
}

class GetAllPostRepository {
    user;
    constructor(getAllPostModel) {
        const { user, param, query } = getAllPostModel;


        this.userId = user.userId;
    }

    async getAllPost(p, limit) {
        let aggr = await PostModel.aggregate([
            [
                {
                    "$lookup": {
                        "from": "blocks",
                        let: {
                            idx: "$userId",

                        },
                        as: "result",
                        "pipeline": [
                            {
                                "$match": {
                                    $expr: {
                                        $or: [
                                            {
                                                $and: [
                                                    {
                                                        $eq: [
                                                            "$$idx",
                                                            "$blockedUser"
                                                        ]
                                                    },
                                                    {
                                                        $eq: [
                                                            1,
                                                            "$blockedBy"
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                $and: [
                                                    {
                                                        $eq: [
                                                            "$$idx",
                                                            "$blockedBy"
                                                        ]
                                                    },
                                                    {
                                                        $eq: [
                                                            "$blockedUser",
                                                            this.userId
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            },

                        ]
                    }
                },
                {
                    $match: {
                        "isPublic": true,
                        "result.blockedBy": {
                            $ne: this.userId
                        },
                        "result.blockedUser": {
                            $ne: this.userId
                        }
                    }
                },
                {
                    "$project": {
                        result: 0
                    }
                },
                {
                    $skip: p
                },
                {
                    $limit: limit
                }

            ]
        ]);

        return aggr;
    }

    async getCount() {
        return await PostModel.count()
    }
}

export { PostRepository, LikePostRepository, DeletePostRepository, GetAllPostRepository }
