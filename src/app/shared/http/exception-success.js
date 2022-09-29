export class HttpOk {
    res
    responseClass
    constructor(res, responseClass) {
        this.res = res
        this.responseClass = responseClass

        this.send()
    }

    send() {
        this.res.status(this.responseClass.statusCode).send({
            statusCode: this.responseClass.statusCode,
            status: this.responseClass.status,
            data: this.responseClass.data
        })
    }
}

export class HttpError {
    res
    responseClass
    constructor(res, responseClass) {
        this.res = res
        this.responseClass = responseClass

        this.send()
    }

    send() {
        this.res.status(this.responseClass.statusCode).send({
            statusCode: this.responseClass.statusCode,
            status: this.responseClass.status,
            error: !this.responseClass.data?.data ? this.responseClass.data : this.responseClass.data?.data
        })
    }
}

export class Success {
    statusCode = 200
    status = true
    data = null
    constructor(data) {
        this.data = data
    }
}

export class NotFoundException {
    statusCode = 404
    status = false
    data = null
    constructor(data) {
        this.data = data
    }
}

export class BadRequestException {
    statusCode = 400
    status = false
    data = null
    constructor(data) {
        this.data = data
    }
}
export class ConflictException {
    statusCode = 409
    status = true
    data = null
    constructor(data) {
        this.data = data
    }
}

export class UnExceptedServerException {
    statusCode = 503
    status = true
    data = null
    constructor(data) {
        this.data = data
    }
}
export class UnAuthorizedException {
    statusCode = 403
    status = true
    data = null
    constructor(data) {
        this.data = data
    }
}