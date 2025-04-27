import TelegramBot from "node-telegram-bot-api";
import appConfig from "./config.js";

const bot = new TelegramBot(appConfig.token, { polling: true });

export function launchTelegramBot() {
    bot.on("polling_error", (error) => {
        console.error("Polling error:", error.code, error.message);
    });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        const firstName = msg.from.first_name || "користувачу";
        bot.sendMessage(chatId, `Привіт, ${firstName}! 👋
            Я твій бот для вивчення англійської мови. Щодня я надсилатиму тобі 10 нових слів для запам’ятовування. Готовий розпочати? 😎`);
    });
}

export default launchTelegramBot