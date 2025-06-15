import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  // Typography,
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import trafficLight from "../../assets/traffic-light.jpg";
import jasamargaLogo from "../../assets/jasamarga_cover.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const StyledPaper = styled(Paper)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  borderRadius: 0,
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

const LoginForm = styled(Box)(() => ({
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/login`,
        {
          username: formData.username,
          password: formData.password,
        }
      );
      login(response.data.token, formData.username);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your username and password.");
    }
    // Handle login logic here
    console.log("Login attempt:", formData);
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledPaper elevation={0}>
      <LeftSection>
        <Box
          component="img"
          src={trafficLight}
          alt="Traffic Light"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </LeftSection>
      <RightSection>
        <LoginForm>
          <Box
            component="img"
            src={jasamargaLogo}
            alt="Jasamarga Logo"
            sx={{
              maxWidth: 200,
              height: "auto",
              mb: 4,
            }}
          />
          {/* <Typography variant="h4" component="h1" gutterBottom color="primary">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Please sign in to continue
          </Typography> */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{
                        "&:focus": {
                          outline: "none",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Masuk
            </Button>
          </form>
        </LoginForm>
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
