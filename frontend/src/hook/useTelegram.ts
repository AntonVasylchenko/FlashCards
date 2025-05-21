import React from "react";
import type { TelegramUser, CloudStorage } from "../../types/telegram.ts";
import { apiEndPoints, getSessionToken } from "../consts/index.ts";
import useStore from "../store/index.ts";
const {
  user: { check },
} = apiEndPoints();

async function validateTelegramUser(user: TelegramUser) {
  try {
    const apiResponse = await fetch(check(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await apiResponse.json();
    return responseData;
  } catch (err) {
    console.error("Error during user validation:", err);
  }
}

const useTelegram = () => {
  const [user, setUser] = React.useState<TelegramUser | null>(null);
  const [storage, setStorage] = React.useState<CloudStorage | null>(null);
  const [theme, setTheme] = React.useState<"dark" | "light">("light");
  const { language } = useStore();
  const hasToken = !!getSessionToken();

  React.useEffect(() => {
    console.count("render");
    if (!window.Telegram || !window.Telegram.WebApp) return;

    const telegram = window.Telegram.WebApp;
    telegram.expand();

    const userData = telegram.initDataUnsafe?.user;
    const cloudStorage = telegram.CloudStorage;
    const colorScheme = telegram.colorScheme;

    if (userData) {
      setUser(userData);
      (async () => {
        if (!hasToken) {
          const response = await validateTelegramUser(userData);
          sessionStorage.setItem("token", response.token);
        }
      })();
    }
    if (cloudStorage) {
      setStorage(cloudStorage);
      cloudStorage.getItem("lang", (_error, value) => {
        if (value) {
          language.handle(value);
        }
      });
    }

    if (colorScheme) {
      setTheme(colorScheme);
    }

    telegram.ready();
  }, []);

  return {
    user,
    storage,
    theme,
  };
};

export default useTelegram;
