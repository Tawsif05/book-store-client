import { TNavbarItem, TUserPath } from "../types";
import { NavLink } from "react-router-dom";

export const navbarItemsGenerator = (items: TUserPath[], role: string) => {
  const navbarItems = items.reduce((acc: TNavbarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: (
          <NavLink to={role === "guest" ? item.path : `/${role}/${item.path}`}>
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink
                  to={
                    role === "guest"
                      ? child.path
                      : `/${role}/${child.path}`
                  }
                >
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return navbarItems;
};
