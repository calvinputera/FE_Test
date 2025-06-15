import { Box, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
// import { Date } from "../../../types/common";

interface DatePickerSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onSearch: () => void;
}

const DatePickerSection = ({
  selectedDate,
  onDateChange,
  onSearch,
}: DatePickerSectionProps) => {
  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
      <DatePicker
        format={"dd/MM/yyyy"}
        views={["day", "month", "year"]}
        label="Pilih Tanggal"
        value={selectedDate}
        onChange={(newValue) => newValue && onDateChange(newValue)}
      />
      <Button variant="contained" onClick={onSearch} sx={{ height: "56px" }}>
        Cari Data
      </Button>
    </Box>
  );
};

export default DatePickerSection;
