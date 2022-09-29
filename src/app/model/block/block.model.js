export class BlockModel {
    blockedUser
    blockedBy
    constructor(object) {
        Object.assign(this, object)
    }
}