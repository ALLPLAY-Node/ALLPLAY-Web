import Layout from "@/components/layout/Layout";
import LoginSuccessPage from "@/pages/auth/LoginSuccessPage";
import FindSpotPage from "@/pages/FindSpotPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SpotDetailPage from "@/pages/SpotDetailPage";
import ClubCreatePage from "@/pages/ClubCreatePage";
import ClubDetailPage from "@/pages/ClubDetailPage";
import ClubsPage from "@/pages/ClubsPage";
// import MyPage from "@/pages/MyPage";

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
        path: "login",
        Component: LoginPage
      },
      {
        path: "login/success",
        Component: LoginSuccessPage
      },
      {
        path: "spots",
        Component: FindSpotPage
      },
      {
        path: "spots/:id",
        Component: SpotDetailPage
      },
      {
        path: "spots",
        Component: HomePage
      },
      // {
      //   path: "spots/:id",
      //   Component: FacilityDetailPage
      // },
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
