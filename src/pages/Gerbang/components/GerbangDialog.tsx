import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { GerbangsI } from "../../../types/gerbangs";
import GerbangForm from "./GerbangForm";

interface GerbangDialogProps {
  open: boolean;
  editingGerbang: GerbangsI | null;
  formData: GerbangsI;
  cabangOptions: { id: number; nama: string }[];
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCabangChange: (
    event: React.SyntheticEvent,
    newValue: { id: number; nama: string } | null
  ) => void;
}

const GerbangDialog: React.FC<GerbangDialogProps> = ({
  open,
  editingGerbang,
  formData,
  cabangOptions,
  onClose,
  onSubmit,
  onInputChange,
  onCabangChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingGerbang ? "Edit Gerbang" : "Tambah Gerbang"}
      </DialogTitle>
      <DialogContent>
        <GerbangForm
          formData={formData}
          editingGerbang={editingGerbang}
          cabangOptions={cabangOptions}
          onInputChange={onInputChange}
          onCabangChange={onCabangChange}
        />
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
          onClick={onSubmit}
          variant="contained"
          sx={{
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GerbangDialog;
