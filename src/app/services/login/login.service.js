import { LoginRepository } from "../../repository";
import { BadRequestException, UnAuthorizedException } from "../../shared/http/exception-success";
import { Jwt } from "../../shared/jwt/jwt";
import { comparePassword } from "../../utils/bcrypt";

export class LoginService {
    loginRepository = new LoginRepository()
    loginModel = null
    constructor(loginModel) {
        if (!loginModel) {
            throw new BadRequestException("Provide login credential")
        }
        this.loginModel = loginModel
    }

    async init() {
        const user = await this.getRegisteredUser(this.loginModel)

        await this.matchPassword(user, this.loginModel)

        const token = await this.signJwtToken(user);

        return this.response(user, token)
    }

    async getRegisteredUser(loginModel) {
        try {
            const user = await this.loginRepository.findEmail(loginModel)

            if (!user) {
                throw new Error("User not exists")
            }

            return user
        } catch (loginException) {
            throw new ConflictException("User Not exists please register")
        }
    }


    async matchPassword(user, loginModel) {
        try {
            await comparePassword(user.password, loginModel.password)
        } catch (matchPasswordException) {
            throw new UnAuthorizedException("Password not Matched")
        }
    }

    async signJwtToken(user) {
        try {
            const jwt = new Jwt()

            return await jwt.sign({
                userId: user.userId
            })
        } catch (jwtException) {
            throw new BadRequestException("Error in jwt token")
        }
    }

    response(user, token) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token
        }
    }


}