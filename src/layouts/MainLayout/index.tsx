import type { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 80px 20px 20px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <div
        style={{
          flex: 1,
          width: "calc(100% - 250px)",
        }}
      >
        <Navbar />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutContainer>
  );
};

export default MainLayout;
