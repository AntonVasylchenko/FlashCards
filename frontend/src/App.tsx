import React from "react";
import useTelegram from './hook/useTelegram.ts';
import { Loader } from "./components/index.ts"
import { Outlet } from "react-router";
import { LocalesContext } from "./main.tsx";
import useStore from "./store/index.ts";





const App: React.FC = () => {
  const [ready, setReady] = React.useState<boolean>(false)

  const { user, storage, theme } = useTelegram();
  const locales = React.useContext(LocalesContext);
  const { theme: themeStore } = useStore();

  React.useEffect(() => {
    if (user && storage) {
      let langLoaded = false;
      let themeLoaded = false;

      storage.getItem("lang", (error, value) => {
        if (error) console.error(error);
        if (value) locales?.changeLanguage(value);

        langLoaded = true;
        if (langLoaded && themeLoaded) setReady(true);
      })
      
      storage.getItem("theme", (error, value) => {
        if (error) {
          console.error(error);
          themeStore.handle(theme);
          return;
        }
        const currentTheme = value === "light" || value === "dark" ? value : theme;
        themeStore.handle(currentTheme);

        themeLoaded = true;
        if (langLoaded && themeLoaded) setReady(true);
      });
    }
  }, [user, storage])

  return (
    <>
      {
        ready === false
          ? <Loader />
          : <div className={themeStore.value}> <Outlet /></div>
      }
    </>
  )
};

export default App;