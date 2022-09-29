import { check } from 'express-validator';
import { LoginModel } from '../../model/login/login';
export function loginValidation() {
    return {
        classInstance: {
            IBody: LoginModel,
            IQuery: LoginModel,
            IParam: LoginModel
        },
        validator: [
            check('email').isEmail(),
            check('password').isString(),
        ]
    }
} 