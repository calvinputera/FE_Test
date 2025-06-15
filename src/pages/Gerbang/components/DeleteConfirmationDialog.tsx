import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Konfirmasi Hapus</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>Apakah Anda yakin ingin menghapus gerbang ini?</Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          Batal
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
