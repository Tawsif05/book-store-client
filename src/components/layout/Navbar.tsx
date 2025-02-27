import { Menu } from "antd";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useLocation } from "react-router-dom";
import React,{ ReactElement } from "react";
import type { MenuProps } from "antd";

const userRole = {
  ADMIN: "admin",
  USER: "user",
  GUEST: "guest"
};

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  let navbarItems;
  switch (user?.role) {
    case userRole.ADMIN:
      navbarItems = navbarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.USER:
      navbarItems = navbarItemsGenerator(userPaths.USER, userRole.USER); 
      break;
    default:
      navbarItems = navbarItemsGenerator(userPaths.GUEST, userRole.GUEST);
      break;
  }

  
  const selectedKey = navbarItems.find((item) => {
    if (item && React.isValidElement(item.label)) {
      const labelElement = item.label as ReactElement<{ to: string }>;
      return labelElement.props.to === location.pathname;
    }
    return false;
  })?.key;

  return (
    <>
      <div className="demo-logo" style={{ width: 140, height: 100 }}>
        <img
          src="/Book_store_Logo-removebg-preview.png"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt=""
        />
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKey ? [selectedKey] : []}
        items={navbarItems as MenuProps["items"]}
        style={{
          flex: 1,
          justifyContent: "center",
          minWidth: 0,
          background: "transparent",
          color: "black",
          fontWeight: "bold",
        }}
      />
    </>
  );
};

export default Navbar;
