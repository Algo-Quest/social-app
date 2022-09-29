
import { RegisterService } from "../../../services/register/register.service";
import { ControllerBase } from "../../../shared";
import { BadRequestException, HttpError, HttpOk, Success } from "../../../shared/http/exception-success";

export class RegisterController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new RegisterService(this.req.getBody()).init()))
        } catch (registerException) {
            return new HttpError(this.res, new BadRequestException(registerException))
        }
    }

} 