import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";

import { store, StoreContext } from "./app/store/store.ts";
import { router } from "./app/router/Routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </StrictMode>
);
