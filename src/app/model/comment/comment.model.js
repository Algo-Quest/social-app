export class CommentModel {
    postId
    commentId
    parentId
    content
    userId

    constructor(object) {
        Object.assign(this, object)
    }
}