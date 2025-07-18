import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { MainLayout } from "./components/Layout/MainLayout";
import { Home } from "./pages/Home";
import { FetchOld } from "./pages/FetchOld";
import { FetchRQ } from "./pages/FetchRQ";
import { FetchIndv } from "./components/Layout/UI/FetchIndv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchIndv />,
      },
      // {
      //   path: "/infinite",
      //   element: <InfiniteScroll />,
      // },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
         <RouterProvider router={router}></RouterProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
  )
}

export default App
