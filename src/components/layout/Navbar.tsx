import { Menu } from "antd";
import { navbarItemsGenerator } from "../../utils/navbarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useLocation } from "react-router-dom";

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

 
  const selectedKey = navbarItems.find((item) =>
    item?.label?.props?.to === location.pathname
  )?.key;

  return (
    <>
      <div className="demo-logo" style={{ width: 140, height: 100 }}>
        <img
          src="../../../public/Book_store_Logo-removebg-preview.png"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt=""
        />
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={selectedKey ? [selectedKey] : []} 
        items={navbarItems}
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
