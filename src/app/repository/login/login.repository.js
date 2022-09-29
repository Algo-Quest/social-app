import { UserModel } from "../../schemas";

export class LoginRepository {
    userModel = UserModel
    constructor() { }

    async findEmail(query) {
        return await this.userModel.findOne({ email: query.email }).lean({ virtuals: true })
    }

}