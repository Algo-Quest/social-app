import { validationResult } from 'express-validator';
import { BadRequestException, HttpError } from '../shared/http/exception-success';

function validationCheck(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return new HttpError(res, new BadRequestException(errors.array()))
    }

    next()
}

function transform(transformObject) {
    // transformObject comes from validators/post/post.validator.js which holds { IBody, IQuery, IParam } in json object
    const { IBody, IQuery, IParam } = transformObject;


    return (req, res, next) => {

        if (req.body) {
            const body = new IBody(req.body)
            req.getBody = (keyName) => {
                if (keyName) {
                    return body[keyName]
                }
                return body
            }
        }
        if (req.query) {
            const query = new IQuery(req.query);
            req.getQuery = (keyName) => {
                if (keyName) {
                    return query[keyName]
                }
                return query
            }
        }
        if (req.params) {
            // call new IParam from model/post.model.js then pass the entity of req.params 
            const param = new IParam(req.params)

            req.getParam = (keyName) => {
                if (keyName) {
                    return param[keyName]
                }
                return param
            }
        }

        if (req.files) {
            // call new IParam from model/post.model.js then pass the entity of req.params 
            const files = req.files

            req.getFiles = () => {

                return files
            }
        }
        if (req.file) {
            // call new IParam from model/post.model.js then pass the entity of req.params 
            const file = req.file

            req.getFile = () => {

                return file
            }
        }

        next()
    }
}

export function validationAndTransform(validationRules) {
    // it gets embedded in middleware as it returns array of middlewares
    return [
        validationRules.validator,
        validationCheck,
        transform(validationRules.classInstance)
    ]
}