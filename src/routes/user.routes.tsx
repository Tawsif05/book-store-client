import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import OrdersPage from "../pages/OrdersPage";
import ProductDetails from "../pages/ProductDetails";
import ProfilePage from "../pages/ProfilePage";
import ChangePassword from "../pages/user/ChangePassword";



export const userPaths = {
  USER: [
    {
      name: "Home",
      path: "home",
      element: <Home />,
    },
    {
      name: "All Product",
      path: "all-product",
      element: <AllProducts />,
    },
    {
      name: "About Us",
      path: "about-us",
      element: <About />,
    },
    {
      name: "Contact Us",
      path: "contact-us",
      element: <Contact />,
    },
    {
      path: ":productId",
      element: <ProductDetails />,
    },
    {
      path: "orders/:userId",
      element: <OrdersPage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "update-password",
      element: <ChangePassword />,
    },
  ],
  GUEST: [
    {
      name: "Home",
      path: "/",
      element: <Home />,
    },
    {
      name: "All Products",
      path: "/all-product",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
    {
      name: "About Us",
      path: "/about-us",
      element: <Home />,
    },
  ],
};
