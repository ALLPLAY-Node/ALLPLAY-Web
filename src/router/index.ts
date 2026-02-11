import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import MyPage from "@/pages/MyPage";
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
        path: "/mypage",
        Component: MyPage
      }
    ]
  }
]);
