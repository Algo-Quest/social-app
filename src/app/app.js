import bodyParser from "body-parser";
import cors from 'cors'
import { databaseConnection } from "./shared";
import { Routes } from "./routes/route";
import "./schemas"

export class ApiServer {
    app;
    constructor(app) {
        this.app = app

        this.expressResource();
        this.thirdPartyResource()
    }

    async expressResource() {
        this.app.use(cors())


        this.app.use(bodyParser.urlencoded({ extended: true }))


        this.app.use(bodyParser.json())

        /**
         * Init routes
         */

        this.app.use("/api", new Routes().route)
    }

    async thirdPartyResource() {
        databaseConnection()
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log("Server is started on port:", port)
        })
    }
}
