import { CommentRepository } from "../../repository/comment/comment.repository"
import { BadRequestException } from "../../shared/http/exception-success"

export class CommentService {
    commentModel
    commentRepository = new CommentRepository()
    constructor(commentModel) {
        if (!commentModel) {
            throw new BadRequestException("Please Provide comment")
        }

        this.commentModel = commentModel
    }

    async init() {
        const { comment, param, user } = this.commentModel
        return await this.createComment(comment, param, user)
    }

    async createComment(comment, param, user) {
        try {
            const commentContent = await this.commentRepository.saveComment({
                userId: user.userId,
                postId: param.postId,
                content: comment.content,
                parentId: comment.parentId
            })

            return {
                commentId: commentContent.commentId
            }
        } catch (createCommentException) {
            throw new BadRequestException("Error in creating comment")
        }
    }
}