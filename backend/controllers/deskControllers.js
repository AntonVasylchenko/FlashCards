import { StatusCodes } from "http-status-codes";
import deskService from "../services/deskService.js";

const { getAllDesks, getDeskById, createNewDesk, updateExistingDesk, deleteExistingDesk } = deskService;

async function getDesks(req, res) {
    const { id } = req.user;
    const response = await getAllDesks(id);
    res.status(StatusCodes.OK).json(response);
}

async function getDesk(req, res) {
    const { id } = req.params;
    const response = await getDeskById(id);
    res.status(StatusCodes.OK).json(response);

}

const deskControllers = {
    getDesks,
    getDesk
}

export default deskControllers