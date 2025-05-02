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
    const desk = await getById(deskId);
    return buildResponse({
        data: desk,
        success: true,
        error: null,
        message: "The desk has been received successfully"
    });
}
async function createNewDesk(userId, desk) {
    const newDesk = await createDesk(userId, desk);
    return buildResponse({
        data: newDesk,
        success: true,
        error: null,
        message: "The desk has been created successfully"
    });
}
async function updateExistingDesk(deskId, desk) {
    const updatedDesk = await updateDesk(deskId, desk);
    return buildResponse({
        data: updatedDesk,
        success: true,
        error: null,
        message: "The desk has been updated successfully"
    });
}
async function deleteExistingDesk(deskId) {
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