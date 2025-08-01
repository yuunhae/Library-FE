import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/page/main/Main.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookDetail from "./components/page/bookDetail/BookDetail.tsx";
import BookRecommendation from "./components/page/bookRecommendation/BookRecommendation.tsx";
import SupportPage from "./components/page/support/SupportPage.tsx";
import ResourcesPage from "./components/page/resources/ResourcesPage";
import StartupResourceDetail from "./components/page/startupResourceDetail/StartupResourceDetail.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "/bookdetail/:isbn",
    element: <BookDetail />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "/book-recommendation",
    element: <BookRecommendation />,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "/support",
    element: <SupportPage />,
  },
  {
    path: "/resources",
    element: <ResourcesPage />,
  },
  {
    path: "/startup-resource/:id",
    element: <StartupResourceDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
