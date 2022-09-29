import express from "express"
import { jwtTokenValidate } from "../../middleware/authorization.middleware"
import { PostController, LikePostController, DeletePostController } from "../../controllers/post/post.controller";
import { validationAndTransform } from "../../middleware/validation.middleware";
import { postValidation, deletePostValidation } from "../../validators/post/post.validator";
import { multerUpload } from "../../middleware/multer.middleware";
import { GetAllPostController } from "../../controllers/post/post.controller";
import { FollowController } from "../../controllers/follow/follow.controller";
import { ProfileController, GetProfileController, GetFollowersProfileController, GetUsersWhoLikedPostController } from "../../controllers/profile/profile.controller";

export class PostRoute {
    router = express.Router()
    constructor() {
        this.init();
    }

    async init() {
        this.router.post("/post", multerUpload('single', 'postFile'), validationAndTransform(postValidation()), jwtTokenValidate, (req, res, next) =>
            new PostController({ req, res, next }).init()
        )

        this.router.post("/post/like/:postId", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new LikePostController({ req, res, next }).init()
        )

        this.router.delete("/post/:id", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new DeletePostController({ req, res, next }).init()
        )

        this.router.get("/allpost", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new GetAllPostController({ req, res, next }).init()
        )

        this.router.post("/follow", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new FollowController({ req, res, next }).init()
        )

        // profile api
        this.router.post("/profile", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new ProfileController({ req, res, next }).init())

        this.router.get("/profile/:profileId", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new GetProfileController({ req, res, next }).init())

        this.router.get("/profile/followers/:profileId", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new GetFollowersProfileController({ req, res, next }).init())

        this.router.get("/profile/getUsersWhoLiked/:userId", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new GetUsersWhoLikedPostController({ req, res, next }).init())
        // this.router.get("/profile/followings", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
        //     new ProfileController({ req, res, next }).init())

        this.router.get("/profile/posts", validationAndTransform(deletePostValidation()), jwtTokenValidate, (req, res, next) =>
            new ProfileController({ req, res, next }).init())

    }

    get route() {
        return this.router
    }
}