import Layout from "@/components/layout/Layout";
import ClubCreatePage from "@/pages/ClubCreatePage";
import ClubDetailPage from "@/pages/ClubDetailPage";
import ClubsPage from "@/pages/ClubsPage";
import FacilityDetailPage from "@/pages/FacilityDetailPage";
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
        path: "home",
        Component: HomePage
      },
      {
        path: "spots",
        Component: HomePage
      },
      {
        path: "spots/:id",
        Component: FacilityDetailPage
      },
      {
        path: "clubs",
        Component: ClubsPage
      },
      {
        path: "clubs/new",
        Component: ClubCreatePage
      },
      {
        path: "clubs/:id",
        Component: ClubDetailPage
      },
      {
        path: "clubs/:id/edit",
        Component: ClubCreatePage
      }
    ]
  }
]);
