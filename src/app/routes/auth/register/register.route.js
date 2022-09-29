import express from "express"
import { RegisterController } from "../../../controllers/auth/register/register.controller"
import { validationAndTransform } from "../../../middleware/validation.middleware"
import { registerValidation } from "../../../validators/register/register.validator"

export class RegisterRoute {
    router = express.Router()
    constructor() {
        this.init()
    }

    async init() {
        this.router.post("/register", validationAndTransform(registerValidation()), (req, res, next) => new RegisterController({ req, res, next }).init())
    }

    get route() {
        return this.router
    }
}