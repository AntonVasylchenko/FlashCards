import db from "../src/db.js";

async function getAll(userId) {
    return db.deck.findMany({
        where: {
            userId,
        },
    });
}

async function getById(deskId) {
    return db.deck.findUnique({
        where: {
            id: deskId,
        },
    });
}

async function createDesk(userId, desk) {
    return db.deck.create({
        data: {
            ...desk,
            userId,
        },
    });
}

async function updateDesk(deskId, desk) {
    return db.deck.update({
        where: {
            id: deskId,
        },
        data: {
            ...desk,
        },
    });
}

async function deleteDesk(deskId) {
    return db.deck.delete({
        where: {
            id: deskId,
        },
    });
}

const deskModel = {
    getAll,
    getById,
    createDesk,
    updateDesk,
    deleteDesk
}

export default deskModel