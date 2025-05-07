import { StatusCodes } from "http-status-codes";
import { cardService } from "../services/index.js";

const { getAllCards, createNewCard, getOneCard, deleteOneCard, updateOneCard } = cardService;

async function getCards(req, res) {
    const { deskId } = req.body;
    const response = await getAllCards(deskId);
    res.status(StatusCodes.OK).json(response);
}
async function getCard(req, res) {
    const { id } = req.params;
    const response = await getOneCard(id);
    res.status(StatusCodes.OK).json(response);
}
async function updateCard(req, res) {
    const { id } = req.params;
    const response = await updateOneCard(id, req.body);
    res.status(StatusCodes.OK).json(response);
}
async function createCard(req, res) {
    const { id } = req.user;
    const response = await createNewCard(id, req.body);
    res.status(StatusCodes.OK).json(response);
}

async function deleteCard(req, res) {
    const { id } = req.params;
    const response = await deleteOneCard(id);
    res.status(StatusCodes.OK).json(response);
}

const cardControllers = {
    getCards,
    getCard,
    createCard,
    deleteCard,
    updateCard
}

export default cardControllers