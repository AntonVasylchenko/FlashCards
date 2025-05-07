import customError from "../errors/index.js";
import { deskModel } from "../models/index.js"
import { buildResponse } from "../utility/index.js";
const { getAll, getById, createDesk, updateDesk, deleteDesk } = deskModel;


async function getAllDesks(userId) {
    const desks = await getAll(userId);
    return buildResponse({
        data: desks,
        success: true,
        error: null,
        message: "The desks have been received successfully"
    });

}
async function getDeskById(deskId) {
    if (!deskId) {
        throw new customError.BadRequestError(`Missing required parameter: 'deskId'. Please provide a valid desk ID to retrieve the desk.`);
    }
    const desk = await getById(deskId);
    return buildResponse({
        data: desk,
        success: true,
        error: null,
        message: "The desk has been received successfully"
    });
}
async function createNewDesk(userId, desk) {
    if (!desk.title) {
        throw new customError.BadRequestError("Missing required field: 'title'. Please provide a title for the desk.");
    }
    const newDesk = await createDesk(userId, desk);
    return buildResponse({
        data: newDesk,
        success: true,
        error: null,
        message: "The desk has been created successfully"
    });
}
async function updateExistingDesk(deskId, desk) {
    if (!deskId) {
        throw new customError.BadRequestError("Missing required parameter: 'deskId'. Please provide a valid desk ID to retrieve the desk.");
    }
    if (desk.title == "") {
        throw new customError.BadRequestError("Desk title cannot be empty.");
    }
    const updatedDesk = await updateDesk(deskId, desk);
    return buildResponse({
        data: updatedDesk,
        success: true,
        error: null,
        message: "The desk has been updated successfully"
    });
}
async function deleteExistingDesk(deskId) {
    if (!deskId) {
        throw new customError.BadRequestError(`Missing required parameter: 'deskId'. Please provide a valid desk ID to retrieve the desk.`);
    }
    const deletedDesk = await deleteDesk(deskId);
    return buildResponse({
        data: deletedDesk,
        success: true,
        error: null,
        message: "The desk has been deleted successfully"
    });
}

const deskService = {
    getAllDesks,
    getDeskById,
    createNewDesk,
    updateExistingDesk,
    deleteExistingDesk
}

export default deskService;