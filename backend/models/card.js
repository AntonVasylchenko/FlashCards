import db from "../src/db.js";

async function getCards(deskId) {
    return db.card.findMany({
        where: {
            deskId
        }
    })
}

async function getCard(cardId) {
    return db.card.findUnique({
        where: {
            id: cardId
        }
    })
}

async function createCard(userId, card) {
    return db.card.create({
        data: {
            ...card,
            userId
        }
    })
}

async function updateCard(cardId, card) {
    return db.card.update({
        where: {
            id: cardId,
        },
        data: {
            ...card,
        },
    });
}

async function deleteCard(cardId) {    
    return db.card.delete({
        where: {
            id: cardId,
        },
    });
}


const cardModel = {
    getCards,
    getCard,
    createCard,
    updateCard,
    deleteCard
}

export default cardModel