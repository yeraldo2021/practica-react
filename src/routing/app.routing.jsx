import { createBrowserRouter } from "react-router-dom";
import LoginPage, { LoaderLogin } from "../components/pages/login.page";
import Error404 from "../components/pages/error404";
import IndexAdverts, { LoaderAdverts } from "../components/pages/index-adverts";
import NewAdverPage from "../components/pages/new-advert.page";
import AdvertsPage from "../components/pages/adverts.page";
import AdvertPage from "../components/pages/advert.page";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
    loader: LoaderLogin,
  },
  {
    path: "login",
    element: <LoginPage />,
    loader: LoaderLogin,
  },
  {
    path: "*",
    element: Error404,
  },
  {
    path: "adverts",
    element: <IndexAdverts />,
    loader: LoaderAdverts,
    children: [
      {
        path: "",
        element: <AdvertsPage />,
      },
      {
        path: ":id",
        element: <AdvertPage />,
      },
      {
        path: "new",
        element: <NewAdverPage />,
      },
    ],
  },
]);
