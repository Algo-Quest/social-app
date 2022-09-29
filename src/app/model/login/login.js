export class LoginModel {
    email
    password

    constructor(object) {
        Object.assign(this, object)
    }
}
