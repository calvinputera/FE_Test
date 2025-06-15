import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login/Login.page";
// import axios from "axios";
// import { useContext, useEffect } from "react";
// import {
//   GlobalContext,
//   type GlobalContextType,
// } from "./contexts/global.context";
// import { DashboardPage } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const token = localStorage.getItem("access_token");
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
//   return children;
// };

const Router = () => {
  // const { setUser } = useContext(GlobalContext) as GlobalContextType;

  // useEffect(() => {
  //   axios.interceptors.response.use(
  //     (response) => {
  //       return response;
  //     },
  //     (error) => {
  //       if (error?.response?.data?.message === "jwt expired") {
  //         localStorage.removeItem("access_token");
  //         setUser(null);

  //         window.location.href = "/login";
  //       }

  //       return Promise.reject(error);
  //     }
  //   );
  // }, [setUser]);

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
