import type { ApiEndpoints, ButtonType } from "../../types/index.ts";

export const apiEndPoints = (): ApiEndpoints => {
  const mainPath = "https://flashcards-isvz.onrender.com/api/v1";

  console.log("API URL:", mainPath);

  return {
    user: {
      check: (): string => `${mainPath}/user/check`,
    },

    desk: {
      all: (): string => `${mainPath}/desk`,
      create: (): string => `${mainPath}/desk`,
      one: (deskId: string): string => `${mainPath}/desk/${deskId}`,
      update: (deskId: string): string => `${mainPath}/desk/${deskId}`,
      delete: (deskId: string): string => `${mainPath}/desk/${deskId}`,
    },

    card: {
      all: (deskId: string): string => `${mainPath}/card?deskId=${deskId}`,
      create: (): string => `${mainPath}/card`,
      one: (cardId: string): string => `${mainPath}/card/${cardId}`,
      update: (cardId: string): string => `${mainPath}/card/${cardId}`,
      delete: (cardId: string): string => `${mainPath}/card/${cardId}`,
    },
  };
};

export const getSessionToken = (): string | null => {
  return sessionStorage.getItem("token");
};

export const getStyleButton = (type: ButtonType): string => {
  const styles = {
    primary: "w-full block bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition",
    secondary: "w-full block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition",
    blue: "text-sm bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition",
    red: "text-sm bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition",
    green:
      "text-sm bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition",
  };
  return styles[type];
};

export const getRandomItems = <T>(array: T[] = [], count = 10): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

export const getTodayItems = <T>(array: T[] = [], key: keyof T): T[] => {
  const today = new Date().getTime();
  return array.filter(item => {
    const value = item[key] as string
    return value && new Date(value).getTime() <= today;
  });
};