import React, { useEffect, useState } from 'react';
import type { TelegramWebApp, TelegramUser, ThemeParams } from "../types/index.ts";
import { GlobalStyles } from './components/index.ts';


declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

const App: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [themeParams, setThemeParams] = useState<ThemeParams | null>(null);

  async function checkUser(telegramUser: TelegramUser) {
    try {
      const response = await fetch("/api/v1/user/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...telegramUser })
      });
      const data = await response.json();
      return data

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) return;

    const telegram = window.Telegram.WebApp;

    telegram.expand();

    const userData = telegram.initDataUnsafe?.user;
    const params = telegram.themeParams;

    if (userData) {
      setUser(userData);
      (async () => {
        const user = await checkUser(userData);
        console.log(user,3);

      })();
    }

    if (params) {
      setThemeParams((prev) => ({ ...prev, ...params }));
    }

    const onThemeChange = () => {
      const updatedThemeParams = telegram.themeParams;
      if (updatedThemeParams) {
        setThemeParams((prev) => ({ ...prev, ...updatedThemeParams }));
      }
    };

    telegram.onEvent("themeChanged", onThemeChange);
    telegram.ready();

    return () => {
      telegram.offEvent("themeChanged", onThemeChange);
    };
  }, []);

  return (
    <>
      <GlobalStyles styles={themeParams} />
      <div
        style={{
          padding: 20,
          backgroundColor: themeParams?.bg_color || "#fff",
          color: themeParams?.text_color || "#000"
        }}
      >
        <h2>
          {user ? `Welcome ${user.first_name} ${user.last_name ?? ''}` : "Welcome!"}
        </h2>
        <div>Background color: {themeParams?.bg_color || "default"}</div>
        <div>132</div>

      </div>
    </>
  );
};

export default App;
