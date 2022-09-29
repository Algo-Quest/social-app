export class RegisterModel {
    userId
    firstName
    lastName
    email
    password
    rePassword

    constructor(object) {
        Object.assign(this, object)
    }
}