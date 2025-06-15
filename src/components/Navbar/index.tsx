import type { FC } from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../contexts/AuthContext";
import { Modal, Box, Typography, Button } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/jasamarga_cover.webp";

const NavbarContainer = styled.div`
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LogoContainer = styled.div`
  text-align: center;
  padding: 10px 0;
`;

const LogoImage = styled.img`
  height: 40px;
  object-fit: contain;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ff4444;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #fff5f5;
    color: #ff0000;
  }
`;

const Navbar: FC = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <LogoImage src={logo} alt="TOL Lalin Logo" />
        </LogoContainer>
        <UserSection>
          <UserName>{username || "Guest"}</UserName>
          <LogoutButton onClick={() => setShowLogoutModal(true)}>
            <FiLogOut size={18} />
            {/* <span>Logout</span> */}
          </LogoutButton>
        </UserSection>
      </NavbarContainer>

      <Modal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        aria-labelledby="logout-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="logout-modal-title"
            variant="h6"
            component="h3"
            color="text.primary"
            sx={{ mb: 2 }}
          >
            Konfirmasi Logout
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Apakah Anda yakin ingin keluar dari sistem?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowLogoutModal(false)}
            >
              Batal
            </Button>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Keluar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
