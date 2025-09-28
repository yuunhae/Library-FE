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

// MSW 초기화
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  // MSW 워커 시작 로그 추가
  console.log('MSW 워커를 시작합니다...')
  await worker.start({
    onUnhandledRequest: 'warn'
  })
  console.log('MSW 워커가 성공적으로 시작되었습니다!')
}

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
  {
    path: "*",
    element: <div>잘못된 접근입니다.</div>,
  },
]);

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
});
