import express from "express";
import { validationAndTransform } from '../../middleware/validation.middleware';
import { blockValidation } from "../../validators/block/block.validator";
import { jwtTokenValidate } from "../../middleware/authorization.middleware";
import { BlockController } from "../../controllers/block/block.controller";

export class BlockRoute {
    router = express.Router()
    constructor() {
        this.init()
    }

    async init() {
        this.router.post("/block", validationAndTransform(blockValidation()), jwtTokenValidate, (req, res, next) =>
            new BlockController({ req, res, next }).init()
        )
    }

    get route() {
        return this.router
    }
}