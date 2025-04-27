import { StatusCodes } from "http-status-codes";
import customError from "../errors/index.js";
import userModel from "../models/user.js";
import { isObjectEmpty } from "../utility/index.js";
const { check, create, update, getSingleUser, getListUser } = userModel;



const candidateFields = ["firstName", "lastName", "userName", "languageCode"];
const telegramFields = ["first_name", "last_name", "username", "language_code"];

async function checkUser(req, res) {
    const responseData = {}
    const telegramUser = req.body;

    const candidate = await check(telegramUser.id);
    const isCreated = !!candidate

    if (!isCreated) {
        const user = await create(telegramUser);
        responseData.user = user;
        responseData.type = "new";
        responseData.message = "New user";
    } else {
        const updatedCandidate = {};

        Array.from({ length: 4 }).forEach((_value, index) => {
            const candidateField = candidateFields[index];
            const telegramField = telegramFields[index];
            if (telegramUser[telegramField] !== candidate[candidateField] && telegramUser[telegramField]) {
                updatedCandidate[candidateField] = telegramUser[telegramField];
            }
        });

        const isEmpty = isObjectEmpty(updatedCandidate);
        
        if (!isEmpty) {
            const updatedCandidate = await update(candidate.id, updatedCandidate);
            responseData.user = updatedCandidate;
            responseData.type = "update";
            responseData.message = "User updated";
        }
    }

    if (responseData.type) {

    }

    const user = await getSingleUser(telegramUser.id);
    const users = await getListUser();

    console.log(users);
    res.status(StatusCodes.OK).json({ "msg": "get" });
}
async function getUser(req, res) {
    res.status(StatusCodes.OK).json({ "msg": "get" });
}
async function updateUser(req, res) {
    res.status(StatusCodes.OK).json({ "msg": "update" });
}

const userControllers = {
    checkUser,
    getUser,
    updateUser
}

export default userControllers