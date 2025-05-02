import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


function getDesks(userId) {
    return [
        {
            userId,
            title: "Food",
            description: "The Desk about food",
            cards: {
                create: [
                    {
                        userId,
                        question: "Milk",
                        answer: "Молока"
                    },
                    {
                        userId,
                        question: "Eggs",
                        answer: "Яйца"
                    },
                    {
                        userId,
                        question: "Cheese",
                        answer: "Сир"
                    }
                ],
            },
        }
    ];
}

async function seed() {
    await Promise.all(
        getDesks("680ef6a80c8fa16cee62adf4").map((desk) => {
            return db.deck.create({
                data: desk,
            });
        })
    );
}

seed();