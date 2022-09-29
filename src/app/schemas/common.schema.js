
export const CommonObject = {
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: new Date().toISOString()
    },

    modifiedDate: {
        type: Date,
        default: new Date().toISOString()
    }
}