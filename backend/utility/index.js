import jwt from "jsonwebtoken"
import appConfig from "../src/config.js";

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

export const buildResponse = ({ data = {}, success = true, error, message = "" }) => {
    return {
        data,
        success,
        error,
        message
    }
}

export const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, appConfig.jwt_secret, {
        expiresIn: appConfig.jwt_lifetime,
    });
    return token;
};

export const isTokenValid = (token) => {
    if (!token || typeof token !== "string") false
    return jwt.verify(token, appConfig.jwt_secret)
};