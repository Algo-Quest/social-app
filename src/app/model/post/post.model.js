export class PostModel {
    id
    text
    page
    limit
    constructor(object) {
        Object.assign(this, object);
    }
}