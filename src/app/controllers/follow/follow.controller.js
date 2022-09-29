
import { ControllerBase } from "../../shared/index";
import { BadRequestException, HttpError, HttpOk, Success } from "../../shared/http/exception-success";
import { FollowService } from "../../services/follow/follow.service";

export class FollowController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new FollowService({
                user: this.req.getUser(),
                body: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (followException) {
            console.log(followException)
            return new HttpError(this.res, new BadRequestException(followException))
        }

    }

} 