// Server
import path from "node:path"
import express from "express";
import { fileURLToPath } from 'url';
import "express-async-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { notFoundMiddleware, errorHandlerMiddleware } from "./middleware/index.js";
import appConfig from "./src/config.js";
import launchTelegramBot from "./src/telegram.js";
import { userRoutes, deskRoutes, cardRoutes } from "./routes/index.js";

const app = express();
const PORT = appConfig.port

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/desk", deskRoutes);
app.use("/api/v1/card", cardRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function launchWebApp() {
    try {
        app.listen(PORT, function () {
            console.log(`Server was started on ${PORT} Port`);
        });
    } catch (error) {
        console.log(error);
    }
}

launchTelegramBot()
launchWebApp();