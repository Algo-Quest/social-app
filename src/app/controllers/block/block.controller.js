import { BlockService } from "../../services/block/block.service";
import { ControllerBase } from "../../shared/index";
import { HttpOk, HttpError, Success, BadRequestException } from "../../shared/http/exception-success";

export class BlockController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new BlockService(
                {
                    user: this.req.getUser(),
                    body: this.req.getBody(),
                }
            ).init()))
        } catch (blockException) {
            console.log(blockException);
            return new HttpError(this.res, new BadRequestException(blockException))
        }

    }

}
