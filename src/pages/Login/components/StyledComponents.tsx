import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "row",
  borderRadius: 0,
}));

export const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  background: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
}));

export const LoginForm = styled(Box)(() => ({
  width: "100%",
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
