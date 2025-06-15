import React from "react";
import {
  Stack,
  Paper,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LuDownload } from "react-icons/lu";

interface HeaderSectionProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  handleExport: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  selectedDate,
  setSelectedDate,
  searchTerm,
  handleSearch,
  handleReset,
  handleExport,
}) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <DatePicker
            format={"dd/MM/yyyy"}
            label="Tanggal"
            value={selectedDate}
            onChange={(newValue) => newValue && setSelectedDate(newValue)}
            views={["year", "month", "day"]}
            slotProps={{
              textField: {
                size: "small",
              },
              actionBar: {
                sx: {
                  "& .MuiButtonBase-root": {
                    "&:focus": {
                      outline: "none",
                      border: "none",
                    },
                    "&:active": {
                      border: "none",
                    },
                  },
                },
              },
            }}
          />
          <TextField
            label="Cari"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              "&:focus": {
                outline: "none",
                border: "none",
              },
              "&:active": {
                border: "none",
              },
            }}
          >
            Reset
          </Button>
        </Stack>
        <Tooltip title="Export to CSV">
          <IconButton onClick={handleExport} color="primary">
            <LuDownload />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default HeaderSection;
