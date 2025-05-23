import customError from "../errors/index.js";
import { cardModel } from "../models/index.js"
import { buildResponse } from "../utility/index.js";
const { getCards, getCard, createCard, updateCard, deleteCard } = cardModel;

async function getAllCards(deskId) {    
    if (!deskId) {
        throw new customError.BadRequestError(`Missing required parameter: 'deskId'. Please provide a valid desk ID to retrieve the desk.`);
    }
    const desks = await getCards(deskId);

    if (!desks) {
        throw new customError.BadRequestError("No desks found for the given query or ID.");
    }
    return buildResponse({
        data: desks,
        success: true,
        error: null,
        message: "The cards have been received successfully"
    });
}

async function getOneCard(cardId) {
    if (!cardId) {
        throw new customError.BadRequestError(`Missing required parameter: 'cardId'. Please provide a valid card ID to retrieve the desk.`);
    }
    const card = await getCard(cardId);

    return buildResponse({
        data: card,
        success: true,
        error: null,
        message: "The card has been received successfully"
    });
}

async function deleteOneCard(cardId) {
    if (!cardId) {
        throw new customError.BadRequestError(`Missing required parameter: 'cardId'. Please provide a valid card ID to retrieve the desk.`);
    }
    const card = await deleteCard(cardId);

    return buildResponse({
        data: card,
        success: true,
        error: null,
        message: "The card has been deleted successfully"
    });
}

async function createNewCard(userId, card) {
    if (!card.deskId) {
        throw new customError.BadRequestError(`Missing required parameter: 'deskId'. Please provide a valid desk ID to retrieve the desk.`);
    }
    if (!card.question) {
        throw new customError.BadRequestError("Missing required field: 'question'. Please provide a question for the desk.");
    }
    if (!card.answer) {
        throw new customError.BadRequestError("Missing required field: 'answer'. Please provide an answer for the desk.");
    }
    const newCard = await createCard(userId, card);
    return buildResponse({
        data: newCard,
        success: true,
        error: null,
        message: "The card has been created successfully"
    });
}

async function updateOneCard(cardId, card) {
    if (!card.question) {
        throw new customError.BadRequestError("Missing required field: 'question'. Please provide a question for the desk.");
    }
    if (!card.answer) {
        throw new customError.BadRequestError("Missing required field: 'answer'. Please provide an answer for the desk.");
    }
    const updatedCard = await updateCard(cardId, card);
    return buildResponse({
        data: updatedCard,
        success: true,
        error: null,
        message: "The card has been updated successfully"
    });
}

const cardService = {
    getAllCards,
    createNewCard,
    getOneCard,
    deleteOneCard,
    updateOneCard
}

export default cardService;