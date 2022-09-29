
import { LoginService } from "../../../services/login/login.service";
import { ControllerBase } from "../../../shared";
import { BadRequestException, HttpError, HttpOk, Success } from "../../../shared/http/exception-success";

export class LoginController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new LoginService(this.req.getBody()).init()))
        } catch (loginException) {
            return new HttpError(this.res, new BadRequestException(loginException))
        }

    }

} 