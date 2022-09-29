import { PostModel } from "../../model/post/post.model";
import { param, body, check } from 'express-validator';
import { FileModel } from "../../model/files/files.model";
export function postValidation(text) {
    return {
        classInstance: {
            IBody: PostModel,
            IQuery: PostModel,
            IParam: PostModel,
            IFIles: FileModel,
        },
        validator: [
            text ? check('text').isString() : check('text').optional(),
        ]
    }
}


export function likePostValidation() {
    return {
        classInstance: {
            IBody: PostModel,
            IQuery: PostModel,
            IParam: PostModel,
            IFIles: FileModel,
        },
        validator: [
            param('id'),
        ]
    }
}

export function deletePostValidation() {
    return {
        classInstance: {
            IBody: PostModel,
            IQuery: PostModel,
            IParam: PostModel,
            IFIles: FileModel,
        },
        validator: [
            param('id'),
        ]
    }
}