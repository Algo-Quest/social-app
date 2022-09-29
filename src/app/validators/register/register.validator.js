import { RegisterModel } from "../../model/register/register.model";
import { body, check } from 'express-validator';
export function registerValidation() {
    return {
        classInstance: {
            IBody: RegisterModel,
            IQuery: RegisterModel,
            IParam: RegisterModel
        },
        validator: [
            body('email').isEmail(),
            body('firstName').isString(),
            body('lastName').isString(),
            body('password').isLength({ min: 8, max: 16 }),
            body('rePassword').isLength({ min: 8, max: 16 }),
        ]
    }
}