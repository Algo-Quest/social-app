
import { ControllerBase } from "../../shared/index";
import { BadRequestException, HttpError, HttpOk, Success } from "../../shared/http/exception-success";
import { ProfileService, GetProfileService, GetFollowersService, GetUsersWhoLikedPostService } from "../../services/profile/profile.service";

export class ProfileController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new ProfileService({
                user: this.req.getUser(),
                body: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (profileException) {
            console.log(profileException)
            return new HttpError(this.res, new BadRequestException(profileException))
        }

    }

}

export class GetProfileController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new GetProfileService({
                user: this.req.getUser(),
                body: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (profileException) {
            console.log(profileException)
            return new HttpError(this.res, new BadRequestException(profileException))
        }

    }

}

export class GetFollowersProfileController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new GetFollowersService({
                user: this.req.getUser(),
                body: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (getFollowerException) {
            console.log(getFollowerException)
            return new HttpError(this.res, new BadRequestException(getFollowerException))
        }

    }

}


export class GetUsersWhoLikedPostController extends ControllerBase {
    constructor(expressHandler) {
        super(expressHandler)
    }

    async init() {
        try {
            return new HttpOk(this.res, new Success(await new GetUsersWhoLikedPostService({
                user: this.req.getUser(),
                body: this.req.getBody(),
                param: this.req.getParam()
            }).init()))
        } catch (getUsersWhoLikedPostException) {
            console.log(getUsersWhoLikedPostException)
            return new HttpError(this.res, new BadRequestException(getUsersWhoLikedPostException))
        }

    }

} 