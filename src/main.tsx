import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/index.ts";
import Gerbang from "./pages/Gerbang/Gerbang.page.tsx";
import { LalinPage } from "./pages/Lalin/index.ts";
import { AuthProvider, useAuth } from "./contexts/AuthContext.tsx";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { username } = useAuth();
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { username } = useAuth();
  if (username) {
    return <Navigate to="/" replace />;
  }
  return children;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<PublicRoute children={<LoginPage />} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gerbang"
            element={
              <ProtectedRoute>
                <Gerbang />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lalu-lintas"
            element={
              <ProtectedRoute>
                <LalinPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
