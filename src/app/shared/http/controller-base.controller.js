export class ControllerBase {
    req;
    res;
    next
    constructor(expressHandler) {
        this.req = expressHandler.req;
        this.res = expressHandler.res
        this.next = expressHandler.next
    }
}