import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { LuLayoutDashboard, LuCastle, LuCar } from "react-icons/lu";

const SidebarContainer = styled.div`
  width: 250px;
  height: calc(100vh - 60px); /* Full height minus navbar height */
  background-color: white;
  color: #333;
  padding: 20px;
  position: sticky;
  top: 60px; /* Stick below the navbar */
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  z-index: 900;
  display: flex;
  flex-direction: column;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1; /* Allow menu list to take available space */
`;

const MenuItem = styled.li<{ active?: boolean }>`
  margin-bottom: 10px;
  padding: 12px 15px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? "#f5f5f5" : "transparent")};
  transition: all 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const MenuLink = styled(Link)`
  color: ${(props) =>
    props.className?.includes("active") ? "#1a73e8" : "#666"};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: ${(props) =>
    props.className?.includes("active") ? "500" : "400"};

  svg {
    font-size: 1.2rem;
    color: ${(props) =>
      props.className?.includes("active") ? "#1a73e8" : "#666"};
  }
`;

const Sidebar: FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LuLayoutDashboard /> },
    { path: "/gerbang", label: "Gerbang", icon: <LuCastle /> },
    { path: "/lalu-lintas", label: "Lalu Lintas", icon: <LuCar /> },
  ];

  return (
    <SidebarContainer>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.path} active={location.pathname === item.path}>
            <MenuLink
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              {item.icon}
              {item.label}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
