import type { ApiEndpoints,ButtonType } from "../../types/index.ts";

export const apiEndPoints = (): ApiEndpoints => {
  const mainPath = "https://816f-193-194-127-199.ngrok-free.app/api/v1";

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
      all: (): string => `${mainPath}/card`,
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


export const getStyleButton = (type:ButtonType ) : string => {
  const styles = {
    blue: "text-sm bg-blue-500 dark:bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition",
    red: "text-sm bg-red-500 dark:bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition",
    green: "text-sm bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition"
  }
  return styles[type]
}
