import { useRoutes } from "react-router-dom";
import Layout from "src/layout/Layout";
import generalRoutes from "./generalRoutes";

//pages
import Home from "pages/home/Home";
import NotFound from "pages/NotFound";


export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        ...generalRoutes,
        { element: <Home />, index: true },
        { path: "*", element: <NotFound /> },
      ],
    }
  ]);

  return routes;
}
