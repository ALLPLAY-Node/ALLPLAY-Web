import Layout from "@/components/layout/Layout";
import ClubDetailPage from "@/pages/ClubDetailPage";
import ClubsPage from "@/pages/ClubsPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "/clubs",
        Component: ClubsPage
      },
      {
        path: "/clubs/:id",
        Component: ClubDetailPage
      }
    ]
  }
]);
