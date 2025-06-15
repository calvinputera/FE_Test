import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { StyledPaper, RightSection } from "./components/StyledComponents";
import LeftSection from "./components/LeftSection";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/login`,
        {
          username,
          password,
        }
      );
      login(response.data.token, username);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your username and password.");
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <StyledPaper elevation={0}>
      <LeftSection />
      <RightSection>
        <LoginForm onSubmit={handleLogin} />
      </RightSection>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </StyledPaper>
  );
};

export default Login;
