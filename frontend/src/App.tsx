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

async function getDesks() {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`/api/v1/desk`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
  }
}
async function handleOneDesk(id: string) {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`/api/v1/desk/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    console.log(data);
    return data
  } catch (error) {
    console.log(error)
  }
}

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

const App: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null)
  const [themeParams, setThemeParams] = useState<ThemeParams | null>(null);
  const [desks, setDesks] = useState<{}[]>([]);


  const handleGetDesks = async () => {
    const response = await getDesks();
    setDesks(response.data);
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
        const response = await checkUser(userData);
        sessionStorage.setItem('token', response.token);
        const userId = response.data.id;
        setUserId(userId)
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
        <button onClick={handleGetDesks}>Click</button>

        <div>userId:{userId}</div>


        {desks.map(desk => {

          return (
            <div key={desk.id}>
              <p>{desk.title}</p>
              <p>{desk.description}</p>
              <button onClick={() => handleOneDesk(desk.id)} >click</button>
            </div>
          )
        })}
      </div>
    </>
  );
};

export default App;
