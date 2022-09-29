export const jwtConfig = () => ({
    expiresIn: process.env.JWT_EXPIRES_IN,
    secret: process.env.JWT_SECRET_KEY,
})