import { StatusCodes } from "http-status-codes";
import customError from "../errors/index.js";
import userModel from "../models/user.js";
import { isObjectEmpty, buildResponse } from "../utility/index.js";
const { check, create, update, getSingleUser, getListUser } = userModel;


const candidateFields = ["firstName", "lastName", "userName", "languageCode"];
const telegramFields = ["first_name", "last_name", "username", "language_code"];


async function syncUserData(body) {
    const telegramUser = body;    
    let responseData = {};

    const candidate = await check(telegramUser.id);

    if (!candidate) {
        const user = await create(telegramUser);
        responseData = buildResponse({
            data: user,
            success: true,
            error: null,
            message: "New user",
        });
    } else {
        const updatedFields = {};

        Array.from({ length: 4 }).forEach((_value, index) => {
            const candidateField = candidateFields[index];
            const telegramField = telegramFields[index];
            if (telegramUser[telegramField] !== candidate[candidateField] && telegramUser[telegramField]) {
                updatedFields[candidateField] = telegramUser[telegramField];
            }
        });


        if (!isObjectEmpty(updatedFields)) {
            const updatedUser = await update(candidate.id, updatedFields);
            responseData = buildResponse({
                data: updatedUser,
                success: true,
                error: null,
                message: "User updated",
            });
        } else {
            responseData = buildResponse({
                data: candidate,
                success: true,
                error: null,
                message: "No update needed"
            });
        }
    }

    return responseData;
}


const userService = {
    syncUserData
}

export default userService