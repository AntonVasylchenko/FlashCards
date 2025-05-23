import TelegramBot from "node-telegram-bot-api";
import appConfig from "./config.js";

const bot = new TelegramBot(appConfig.token, { polling: true });

export function launchTelegramBot() {
    bot.on("polling_error", (error) => {
        console.error("Polling error:", error.code, error.message);
    });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const firstName = msg.from.first_name || "anonymous";
        const lang = msg.from.language_code || 'en';

        const textUk = `Привіт, *${firstName}*! 👋
Ласкаво просимо до твого нового помічника у вивченні іноземної мови — *Flashcard Mini App*!

Тут ти зможеш:  
📚 Вчити нові слова щодня  
💾 Зберігати улюблені слова для повторення  

Просто починай додавати слова, які хочеш вивчити, і додаток допоможе тобі запам’ятати їх легко та зручно!  

Готовий до першого слова? Поїхали! 🚀`;

        const textEn = `Hi, *${firstName}*! 👋
Welcome to your new helper for learning foreign languages — *Flashcard Mini App*!

Here you can:  
📚 Learn 10 new words daily  
💾 Save your favorite words for review  

Just start adding words you want to learn, and the app will help you memorize them easily and conveniently!  

Ready for the first word? Let's go! 🚀`;

        const text = lang.startsWith('uk') ? textUk : textEn;

        bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    });

}

export default launchTelegramBot