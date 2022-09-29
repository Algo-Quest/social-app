import { BlockRepository } from "../../repository/block/block.repository";
import { BadRequestException, ConflictException, UnExceptedServerException } from "../../shared/http/exception-success"


export class BlockService {
    blockModel
    blockRepository
    constructor(blockModel) {
        if (!blockModel) {
            throw new BadRequestException("Provide blockModel credential")
        }
        this.blockModel = blockModel;

        this.blockRepository = new BlockRepository(this.blockModel);
    }

    async init() {


        if (!await this.blockRepository.checkUserExists()) {
            return `userId : ${this.blockModel.body.blockedUser} does not exists`
        }

        if (await this.userCantBlockHimself() === true) {
            return `userId : ${this.blockModel.user.userId} cannot blocked himself (userId : ${this.blockModel.body.blockedUser})`;
        }

        const checkBlockOrNot = await this.blockRepository.checkBlockedOrNot();
        if (checkBlockOrNot) {
            return `userId : ${this.blockModel.user.userId} already blocked userId : ${this.blockModel.body.blockedUser}`;
        }
        return await this.blockRepository.saveBlockUser();
    }

    async userCantBlockHimself() {
        if (this.blockModel.user.userId === this.blockModel.body.blockedUser) {
            return true;
        }
        return false;
    }

}