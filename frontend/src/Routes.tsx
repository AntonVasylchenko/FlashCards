import { createBrowserRouter } from "react-router";
import App from "./App";
import { HomePage, NotFound, ListDesks, About, Desk, CreateDeck, Settings } from "./layouts/index.ts";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: HomePage },
      {
        path: "create",
        Component: CreateDeck
      },
      {
        path: "list", Component: ListDesks
      },
      { path: "list/:id", Component: Desk },
      { path: "about", Component: About },
      { path: "settings", Component: Settings }
    ],
    errorElement: <NotFound />
  },
  {
    path: "*",
    errorElement: <NotFound />
  }
]);

export default router;
