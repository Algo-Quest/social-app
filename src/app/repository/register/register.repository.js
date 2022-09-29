import { UserModel } from "../../schemas";

export class RegisterRepository {
    userModel = UserModel
    constructor() { }

    async findEmail(query) {
        return await this.userModel.findOne({ email: query.email }).lean({ virtuals: true })
    }

    async saveUser(document) {
        return await new this.userModel(document).save()
    }
}