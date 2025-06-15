import React from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import type { GerbangsI } from "../../../types/gerbangs";

interface GerbangFormProps {
  formData: GerbangsI;
  editingGerbang: GerbangsI | null;
  cabangOptions: { id: number; nama: string }[];
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCabangChange: (
    event: React.SyntheticEvent,
    newValue: { id: number; nama: string } | null
  ) => void;
}

const GerbangForm: React.FC<GerbangFormProps> = ({
  formData,
  editingGerbang,
  cabangOptions,
  onInputChange,
  onCabangChange,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
      <TextField
        name="id"
        label="ID"
        value={formData.id}
        onChange={onInputChange}
        disabled={!!editingGerbang}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        sx={{
          "& input[type=number]": { "-moz-appearance": "textfield" },
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
            { "-webkit-appearance": "none", margin: 0 },
        }}
      />
      <Autocomplete
        options={cabangOptions}
        getOptionLabel={(option) => `${option.id} - ${option.nama}`}
        value={
          cabangOptions.find((option) => option.id === formData.IdCabang) ||
          null
        }
        onChange={onCabangChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="ID Cabang"
            inputProps={{
              ...params.inputProps,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
          />
        )}
      />
      <TextField
        name="NamaGerbang"
        label="Nama Gerbang"
        value={formData.NamaGerbang}
        onChange={onInputChange}
      />
      <TextField
        name="NamaCabang"
        label="Nama Cabang"
        value={formData.NamaCabang}
        disabled
      />
    </Box>
  );
};

export default GerbangForm;
