import db from "../src/db.js";

async function checkUser(id) {
    return db.user.findUnique({
        where: {
            telegramId: id,
        },
    });
}

async function createUser(user) {
    const { id, first_name, last_name, language_code, username } = user;

    return db.user.create({
        data: {
            telegramId: id,
            firstName: first_name,
            lastName: last_name,
            userName: username,
            languageCode: language_code
        }
    });
}

async function updateUser(id, updateValues = {}) {
    return db.user.update({
        where: {
            id,
        },
        data: updateValues
    })
}

async function getSingleUser(id) {
    console.log(id, 1);

    return db.user.findUnique({
        where: {
            telegramId: id
        }
    })
}

async function getListUser() {
    return db.user.findMany()
}

const userModel = {
    check: checkUser,
    create: createUser,
    update: updateUser,
    getSingleUser: getSingleUser,
    getListUser: getListUser
}

export default userModel