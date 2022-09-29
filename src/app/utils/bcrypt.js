import bcrypt from "bcrypt"

export async function hashPassword(plaintextPassword) {
    return await bcrypt.hash(plaintextPassword, +process.env.SALT_ROUNDS)
}



export async function comparePassword(plaintextPassword, hashedPassword) {
    return await bcrypt.compare(plaintextPassword, hashedPassword)
}