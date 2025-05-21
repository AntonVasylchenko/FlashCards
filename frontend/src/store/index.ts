import { create } from "zustand";

type Store = {
  language: {
    value: string;
    handle: (code: string) => void;
  };
  theme: {
    value: string;
    handle: (theme: "light" | "dark") => void;
  };
  notification: {
    value: string;
    handle: (notification: string) => void;
  };
};

const useStore = create<Store>((set) => ({
  language: {
    value: "",
    handle: (code) =>
      set((state) => ({
        language: {
          ...state.language,
          value: code,
        },
      })),
  },
  theme: {
    value: "",
    handle: (theme: "light" | "dark") =>
      set((state) => ({
        theme: {
          ...state.theme,
          value: theme,
        },
      })),
  },
  notification: {
    value: "",
    handle: (notification) =>
      set((state) => ({
        notification: {
          ...state.notification,
          value: notification,
        },
      })),
  },

}));

export default useStore;
