import { HttpError, UnAuthorizedException } from "../shared/http/exception-success";
import { Jwt } from "../shared/jwt/jwt";

export async function jwtTokenValidate(req, res, next) {
    try {
        const bearerToken = req.headers['authorization'] || ""

        const token = (bearerToken.split("Bearer ")[1] || "").trim()

        const jwt = new Jwt()

        const payload = await jwt.verify(token)

        /**
         * 
         * @returns Write here form db of user cred
         */

        req.getUser = () => {
            return payload
        }

        next()
    } catch (jwtTokenException) {
        return new HttpError(res, new UnAuthorizedException("Un Authorized"))
    }
}