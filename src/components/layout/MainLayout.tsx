import { Button, Layout, Badge, Avatar } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AppFooter from "../ui/AppFooter";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { openCart } from "../../redux/features/cart/cartSlice";
import CartDrawer from "../../pages/CartDrawer";
import { useEffect, useState } from "react";
import AvatarModal from "../../pages/AvatarModal"; 
import { useGetMeQuery } from "../../redux/features/auth/authApi";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  
  const { data: userData } = useGetMeQuery(undefined, {
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (userData?.data?.status === "Blocked") {
      dispatch(logout()); 
      navigate("/login"); 
    }
  }, [userData, dispatch, navigate]);
  const cartItems = useAppSelector((state) => state.cart?.items || []);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#FFFFFF",
          height: "70px",
          lineHeight: "70px",
          padding: "0 20px",
        }}
      >
        <Navbar />

        <div className="flex items-center gap-4 mr-9">
          {user === null ? (
            <>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </>
          ) : (
            <>
              {/* Cart Button */}
              <Badge count={cartItems.length} showZero>
                <Button icon={<ShoppingCartOutlined />} onClick={() => dispatch(openCart())} />
              </Badge>

              
              {user && (
                <>
                  <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    className="cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                  <AvatarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </>
              )}
            </>
          )}
        </div>
      </Header>

      <Content style={{ margin: "0px 0px 0px" }}>
        <div style={{ padding: 0, minHeight: "100vh" }}>
          <Outlet />
        </div>
      </Content>

      <AppFooter />

      {/* Cart Drawer */}
      <CartDrawer />
    </Layout>
  );
};

export default MainLayout;
