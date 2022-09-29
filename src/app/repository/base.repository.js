export class BaseRepository {
    model
    constructor(model) {
        this.model = model
    }

    findOne() { }

    aggregate() {

    }

    find(query, projection) {
        return
    }

    findById(id) {
        return this.model.findById(id);
    }

    delete(query) {
        return this.model.delete(query)
    }

    update(query, document, option) {
        return this.model.update(query, document, option)
    }


}