import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utils/routesGenerator";
import { userPaths } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AllProducts from "../pages/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import VerifyOrder from "../pages/VerifyOrder";
import OrderDetails from "../pages/Order";
import CheckoutPage from "../pages/CheckoutPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "all-product",
        element: <AllProducts />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: ":productId",
        element: <ProductDetails />,
      },
      {
        path: "orders/verify",
        element: <VerifyOrder />,
      },
      {
        path: "orders",
        element: <OrderDetails />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role={undefined}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role={undefined}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths.USER),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
