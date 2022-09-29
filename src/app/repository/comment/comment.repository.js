import { CommentModel } from "../../schemas/comment.schema";

export class CommentRepository {
    constructor() { }

    async saveComment(document) {
        return await new CommentModel(document).save()
    }
}