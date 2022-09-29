
import { ControllerBase } from "../../shared/index";
import { BadRequestException, HttpError, HttpOk, Success } from "../../shared/http/exception-success";
import { CommentService } from "../../services/comment/comment.service";

export class CommentController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new CommentService({
                user: this.req.getUser(),
                comment: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (commentException) {
            return new HttpError(this.res, new BadRequestException(commentException))
        }

    }

} 