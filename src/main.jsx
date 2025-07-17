import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AuthDataProvider from "./Context/AuthDataProvider";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthDataProvider>
        <RouterProvider router={router} />
      </AuthDataProvider>
    </QueryClientProvider>
  </StrictMode>
);
