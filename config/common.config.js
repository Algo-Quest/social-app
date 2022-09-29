import { join, resolve } from "path"


export const commonConfig = {
    rootPath: join(resolve()),
    dotEnvPath: function () {
        return join(this.rootPath, ".env")
    }
}
