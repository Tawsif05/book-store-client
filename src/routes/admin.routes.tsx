import About from "../pages/About";
import AllUsers from "../pages/admin/AllUsers";
import CreateBook from "../pages/admin/CreateBook";
import UpdateBook from "../pages/admin/UpdateBook";
import UpdateDelete from "../pages/admin/UpdateDelete";
import UpdateDeleteOrders from "../pages/admin/UpdateDeleteOrders";
import UpdateOrders from "../pages/admin/UpdateOrders";
import AllProducts from "../pages/AllProducts";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import OrderDetails from "../pages/Order";
import ProductDetails from "../pages/ProductDetails";
import ProfilePage from "../pages/ProfilePage";



export const adminPaths = [
  {
    name: "Home",
    path: "home",
    element: <Home/>,
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
    element: <ProductDetails/>,
  },
  {
    path: "profile",
    element: <ProfilePage/>,
  },
  {
    path: "all-users",
    element: <AllUsers/>,
  },
  {
    path: "create-book",
    element: <CreateBook/>,
  },
  {
    path: "update-delete",
    element: <UpdateDelete/>,
  },
  {
    path: "update/:productId",
    element: <UpdateBook/>,
  },
  {
    path: "orders",
    element: <OrderDetails/>,
  },
  {
    path: "orders/update-delete",
    element: <UpdateDeleteOrders/>,
  },
  {
    path: "update-order/:id",
    element: <UpdateOrders/>,
  },
  
];


