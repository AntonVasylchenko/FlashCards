import { StatusCodes } from "http-status-codes";
import { userService } from "../services/index.js";
import { createJWT } from "../utility/index.js";
const { syncUserData } = userService;

async function checkUser(req, res) {
    const response = await syncUserData(req.body);
    const { data: { id } } = response;
    const token = createJWT({ payload: { id } })
    res.status(StatusCodes.OK).json({ ...response, token });
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