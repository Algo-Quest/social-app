import { RegisterRepository } from "../../repository"
import { BadRequestException, ConflictException, UnExceptedServerException } from "../../shared/http/exception-success"
import { Jwt } from "../../shared/jwt/jwt"
import { hashPassword } from "../../utils/bcrypt"

export class RegisterService {
    registerRepository = new RegisterRepository()
    registerModel = null

    constructor(registerModel) {
        if (!registerModel) {
            throw new BadRequestException("Provide register credential")
        }
        this.registerModel = registerModel
    }

    async init() {

        this.matchPassword(this.registerModel);

        await this.getRegisteredUser(this.registerModel);

        const password = await this.hashPasswordRegister(this.registerModel)

        const user = await this.registerUser(this.registerModel, password);

        const token = await this.signJwtToken(user);

        return this.response(user, token)

    }

    matchPassword(registerModel) {
        if (registerModel.password !== registerModel.rePassword) {
            throw new BadRequestException("Error in matching password")
        }
    }

    async getRegisteredUser(registerModel) {
        try {
            const user = await this.registerRepository.findEmail(registerModel)

            if (user) {
                throw new Error("User already exists")
            }

            return user
        } catch (registerException) {
            throw new ConflictException("User already exists login to continue")
        }
    }

    async hashPasswordRegister(registerModel) {
        try {
            const password = await hashPassword(registerModel.password)

            return password
        } catch (hashException) {
            throw new BadRequestException("Error in hashing password")
        }
    }


    async registerUser(registerModel, password) {
        try {
            registerModel.password = password
            return await this.registerRepository.saveUser(registerModel);
        } catch (createUserException) {
            throw new UnExceptedServerException("Error in creating user")
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