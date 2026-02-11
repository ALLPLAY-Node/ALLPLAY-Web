import Layout from "@/components/layout/Layout";
import LoginSuccessPage from "@/pages/auth/LoginSuccessPage";
import FindSpotPage from "@/pages/FindSpotPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SpotDetailPage from "@/pages/SpotDetailPage";
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
      }
    ]
  }
]);
