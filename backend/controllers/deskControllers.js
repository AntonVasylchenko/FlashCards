import { StatusCodes } from "http-status-codes";
import { deskService } from "../services/index.js";

const { getAllDesks, getDeskById, createNewDesk, updateExistingDesk, deleteExistingDesk } = deskService;

async function getDesks(req, res) {
    const { id } = req.user;
    const response = await getAllDesks(id);
    res.status(StatusCodes.OK).json(response);
}
async function createDesk(req, res) {
    const { id } = req.user;
    const response = await createNewDesk(id, req.body)
    res.status(StatusCodes.OK).json(response);
}
async function getDesk(req, res) {
    const { id } = req.params;
    const response = await getDeskById(id);
    res.status(StatusCodes.OK).json(response);
}
async function deleteDesk(req, res) {
    const { id } = req.params;
    const response = await deleteExistingDesk(id);
    res.status(StatusCodes.OK).json(response);
}
async function updateDesk(req, res) {
    const { id } = req.params;
    const response = await updateExistingDesk(id, req.body);
    res.status(StatusCodes.OK).json(response);
}


const deskControllers = {
    getDesks,
    getDesk,
    createDesk,
    deleteDesk,
    updateDesk
}

export default deskControllers