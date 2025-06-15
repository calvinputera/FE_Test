import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LoginForm as StyledLoginForm } from "./StyledComponents";
import jasamargaLogo from "../../../assets/jasamarga_cover.webp";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData.username, formData.password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledLoginForm>
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
    </StyledLoginForm>
  );
};

export default LoginForm;
