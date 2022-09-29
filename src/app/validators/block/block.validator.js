import { check } from 'express-validator';
import { BlockModel } from '../../model/block/block.model';

export function blockValidation() {
    return {
        classInstance: {
            IBody: BlockModel,
            IQuery: BlockModel,
            IParam: BlockModel
        },
        validator: [
            check('blockedUser').isNumeric().toInt(),
            check('blockedBy').optional().isNumeric().toInt(),
            // check('userId').isNumeric(),
        ]
    }
} 