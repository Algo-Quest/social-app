import jwt from "jsonwebtoken"
import { jwtConfig } from "../../../../config/jwt.config"

export class Jwt {
    jwtConfig
    constructor() {
        this.jwtConfig = jwtConfig()
    }


    async sign(payload) {
        return jwt.sign(payload, this.jwtConfig.secret, {
            expiresIn: this.jwtConfig.expiresIn
        })
    }

    verify(token) {
        return jwt.verify(token, this.jwtConfig.secret)
    }
}