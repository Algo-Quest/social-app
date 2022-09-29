
import { PostService, LikePostService, DeletePostService, GetAllPostService } from "../../services/post/post.service";
import { ControllerBase } from "../../shared/index";
import { BadRequestException, HttpError, HttpOk, Success } from "../../shared/http/exception-success";

export class PostController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new GetAllPostService({
                user: this.req.getUser(),
                post: this.req.getBody()
            }).init()))
        } catch (loginException) {
            console.log(loginException)
            return new HttpError(this.res, new BadRequestException(loginException))
        }

    }

}

export class DeletePostController extends ControllerBase {

    constructor(expressHandler) {
        super(expressHandler)
    }
    async init() {
        try {
            return new HttpOk(this.res, new Success(await new DeletePostService({
                user: this.req.getUser(),
                param: this.req.getParam()
            }).init()))
        } catch (deletePostException) {
            return new HttpError(this.res, new BadRequestException(deletePostException))
        }

    }

}

export class LikePostController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }
    async init() {
        try {
            return new HttpOk(this.res, new Success(await new LikePostService({
                user: this.req.getUser(),
                param: this.req.getParam()
            }).init()))
        } catch (likePostException) {
            console.log(likePostException)
            return new HttpError(this.res, new BadRequestException(likePostException))
        }

    }

}

export class GetAllPostController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }
    async init() {
        try {
            return new HttpOk(this.res, new Success(await new GetAllPostService({
                user: this.req.getUser(),
                param: this.req.getParam(),
                query: this.req.getQuery(),
            }).init()))
        } catch (likePostException) {
            console.log(likePostException)
            return new HttpError(this.res, new BadRequestException(likePostException))
        }

    }

}