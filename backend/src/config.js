import "dotenv/config";

const appConfig = {
    token: process.env.TOKEN,
    url: process.env.WEB_APP_URL,
    env: process.env.NODE_ENV,
    port: process.env.PORT || 3000
}

export default appConfig