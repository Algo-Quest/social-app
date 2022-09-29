import { PostRepository, LikePostRepository, DeletePostRepository, GetAllPostRepository, pagination } from "../../repository/post/post.repository";
import { BadRequestException, UnAuthorizedException } from "../../shared/http/exception-success";
class PostService {
    postRepository = new PostRepository()
    postModel = null
    constructor(postModel) {
        if (!postModel) {
            throw new BadRequestException("Provide post credential")
        }
        this.postModel = postModel;
    }

    async init() {
        const { user, file, post } = this.postModel;
        const { hashTag, friendTag } = this.getTags(post.text);
        // emitEvents()
        return await this.createPostOfUser(user, file, post, hashTag, friendTag);

    }


    // extracting @ and # from text
    getTags(text) {
        return {
            hashTag: (text || "").match(/[#][a-z]*/gm),
            friendTag: (text || "").match(/[@][a-z]*/gm)
        }
    }

    async createPostOfUser(user, file, post, hashTag, friendTag) {
        try {
            const postContent = await this.postRepository.savePost({
                userId: user.userId,
                file,
                text: post.text,
                hashTag,
                friendTag
            })

            return {
                postId: postContent.postId
            }
        } catch (createPostException) {
            throw new BadRequestException("Error in creating posts")
        }
    }

}


class LikePostService {
    likePostModel = null;
    likePostRepository
    constructor(likePostModel) {
        if (!likePostModel) {
            throw new BadRequestException("Provide likePost credential")
        }
        this.likePostModel = likePostModel;
        this.likePostRepository = new LikePostRepository(this.likePostModel);
    }

    async init() {
        // postId -> param
        // emitEvents()
        let likePost = await this.likePost();

        if (likePost == 2) {
            return `postId : ${this.likePostModel.param.postId} was no longer available`;
        }

        if (!likePost) {
            return `userId : ${this.likePostModel.user.userId} already liked this post`;
        }

        return likePost;
    }

    async likePost() {

        if (!await this.likePostRepository.isPostAvailable()) {
            return 2;
        }

        if (await this.likePostRepository.checkLikePostExistsByUser()) {
            return false;
        }

        return await this.likePostRepository.savelikePost();
    }
}


class DeletePostService {
    deletePostRepository = new DeletePostRepository();
    deletePostModel = null;
    constructor(deletePostModel) {
        if (!deletePostModel) {
            throw new BadRequestException("Provide post credential")
        }
        this.deletePostModel = deletePostModel;
    }

    async init() {
        const { user, param } = this.deletePostModel;
        // emitEvents()
        return await this.deletePostOfUser(user.userId, param.id);
    }

    async deletePostOfUser(userId, paramId) {
        let deletedPost = await this.deletePostRepository.deletePost(userId, +paramId);

        if (!deletedPost) {
            return false;
        }

        return {
            deletedPost
        }
    }
}

class GetAllPostService {

    getAllPostModel = null;
    constructor(getAllPostModel) {
        if (!getAllPostModel) {
            throw new BadRequestException("Provide get allPost credential")
        }
        this.getAllPostModel = getAllPostModel;
        this.getAllPostRepository = new GetAllPostRepository(this.getAllPostModel);
    }

    async init() {
        const { p, limit } = pagination(this.getAllPostModel?.query?.page, this.getAllPostModel?.query?.limit)
        let result = await this.getAllPostRepository.getAllPost(p, limit);
        let totalCount = await this.getAllPostRepository.getCount()
        return {
            count: totalCount,
            data: result
        }
        // emitEvents()
    }

}

export { PostService, LikePostService, DeletePostService, GetAllPostService }