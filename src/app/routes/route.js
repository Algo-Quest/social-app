import express from "express"
import { LoginRoute } from "./auth/login/login.route"
import { RegisterRoute } from "./auth/register/register.route"
import { CommentRoute } from "./comments/comment.route";
import { PostRoute } from "./post/post.route";
import { BlockRoute } from "./block/block.route";

export class Routes {
    router = express.Router()
    constructor() {
        this.init()
    }

    async init() {
        this.router.use("/auth", new LoginRoute().route)
        this.router.use("/auth", new RegisterRoute().route)
        this.router.use("/user", new PostRoute().route)
        this.router.use("/user", new CommentRoute().route)
        this.router.use("/user", new BlockRoute().route);
    }

    get route() {
        return this.router
    }
}
