import express from "express"
import { LoginController } from "../../../controllers/auth/login/login.controller"
import { validationAndTransform } from "../../../middleware/validation.middleware"
import { loginValidation } from "../../../validators/login/login.validators"

export class LoginRoute {
    router = express.Router()
    constructor() {
        this.init()
    }

    async init() {
        this.router.post("/login", validationAndTransform(loginValidation()), (req, res, next) => new LoginController({ req, res, next }).init())
    }

    get route() {
        return this.router
    }
}