import { BlockModel } from "../../schemas/block.schema";
import { UserModel } from "../../schemas/user.schema";

export class BlockRepository {
    user;
    body;
    constructor(blockModel) {
        let { user, body } = blockModel;
        this.user = user;
        this.body = body;
    }

    async saveBlockUser() {
        return await BlockModel.create({ blockedBy: this.user.userId, blockedUser: this.body.blockedUser });
    }


    async checkBlockedOrNot() {
        return await BlockModel.findOne({ blockedBy: this.user.userId, blockedUser: this.body.blockedUser });
    }

    async checkUserExists() {
        return await UserModel.findOne({ userId: this.body.blockedUser });
    }

}
