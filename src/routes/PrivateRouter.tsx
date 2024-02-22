import { useRoutes } from "react-router-dom";
import Layout from "src/layout/Layout";
import generalRoutes from "./generalRoutes";

//pages
// import Home from "pages/home/Home";
import NotFound from "pages/NotFound";
import Test from "pages/test/Test";

export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        ...generalRoutes,
        // { element: <Home />, index: true },
        { element: <Test />, index: true },
        { path: "test", element: <Test /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}
