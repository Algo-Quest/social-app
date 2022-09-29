import express from "express"
import { jwtTokenValidate } from "../../middleware/authorization.middleware"
import { PostController } from "../../controllers/post/post.controller";
import { validationAndTransform } from "../../middleware/validation.middleware";
import { commentValidation } from "../../validators/comment/comment";
import { CommentController } from "../../controllers/comment/comment.controller";
import { CommentModel } from "../../schemas/comment.schema";
import { HttpOk, Success } from "../../shared/http/exception-success";
// import { HttpOk, Success } from "../../shared/http/exception-success";

export class CommentRoute {
    router = express.Router()
    constructor() {
        this.init()
    }

    async init() {
        this.router.post("/comment/:postId/:commentId?", validationAndTransform(commentValidation()), jwtTokenValidate, (req, res, next) =>
            new CommentController({ req, res, next }).init()
        )

        this.router.get("/comment/:postId/:parentId?", validationAndTransform(commentValidation()), jwtTokenValidate, async (req, res, next) => {
            console.log(req.getParam('postId'), +req.getParam("parentId"))
            let result = await CommentModel.find({
                postId: +req.getParam('postId'),
                parentId: +req.getParam("parentId")
            })


            new HttpOk(res, new Success(result))

        }
        )
    }

    get route() {
        return this.router
    }
}