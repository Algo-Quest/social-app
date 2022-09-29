import { check } from 'express-validator';
import { CommentModel } from '../../model/comment/comment.model';

export function commentValidation() {
    return {
        classInstance: {
            IBody: CommentModel,
            IQuery: CommentModel,
            IParam: CommentModel
        },
        validator: [
            check('postId').isNumeric().toInt(),
            check('commentId').optional().isNumeric().toInt(),
            check('parentId').isNumeric(),
            check('content').optional().isString(),
            // check('userId').isNumeric(),
        ]
    }
} 