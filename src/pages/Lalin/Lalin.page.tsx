import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LuDownload } from "react-icons/lu";
import axios from "axios";
import { format } from "date-fns";
import type { LalinI } from "../../types/lalin";

const Lalin = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2023-11-01"));
  const [lalinData, setLalinData] = useState<LalinI[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await axios.get(
        `http://localhost:8080/api/lalins?tanggal=${formattedDate}`
      );
      setLalinData(
        Array.isArray(response.data.data.rows.rows)
          ? response.data.data.rows.rows
          : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleReset = () => {
    setSearchTerm("");
    setPage(0);
  };

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Tanggal: format(new Date(item.Tanggal), "yyyy-MM-dd HH:mm:ss"),
      Shift: item.Shift,
      Tunai: item.Tunai,
      E_Toll: item.eMandiri + item.eBri + item.eBni + item.eBca + item.eDKI,
      Flo: item.eFlo,
      KTP: item.DinasKary,
      Total_Keseluruhan:
        item.Tunai +
        item.eMandiri +
        item.eBri +
        item.eBni +
        item.eBca +
        item.eDKI +
        item.eFlo +
        item.DinasKary,
    }));

    if (data.length === 0) {
      alert("No data to export.");
      return;
    }

    const header = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = "\ufeff" + header + "\n" + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      "download",
      `lalin_report_${format(selectedDate, "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const filteredData = lalinData.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      format(new Date(item.Tanggal), "yyyy-MM-dd").includes(searchLower) ||
      item.Shift.toString().includes(searchLower)
    );
  });

  const calculateTotals = () => {
    return filteredData.reduce(
      (acc, item) => ({
        tunai: acc.tunai + item.Tunai,
        eToll:
          acc.eToll +
          item.eMandiri +
          item.eBri +
          item.eBni +
          item.eBca +
          item.eDKI,
        flo: acc.flo + item.eFlo,
        ktp: acc.ktp + item.DinasKary,
        total:
          acc.total +
          item.Tunai +
          item.eMandiri +
          item.eBri +
          item.eBni +
          item.eBca +
          item.eDKI +
          item.eFlo +
          item.DinasKary,
      }),
      { tunai: 0, eToll: 0, flo: 0, ktp: 0, total: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ p: 3 }}>
          <Stack spacing={3}>
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
                    onChange={(newValue) =>
                      newValue && setSelectedDate(newValue)
                    }
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

            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Ringkasan Pembayaran
                  </Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Total Tunai</TableCell>
                          <TableCell>Total E-Toll</TableCell>
                          <TableCell>Total Flo</TableCell>
                          <TableCell>Total KTP</TableCell>
                          <TableCell>Total E-Toll+Tunai+Flo</TableCell>
                          <TableCell>Total Keseluruhan</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{totals.tunai}</TableCell>
                          <TableCell>{totals.eToll}</TableCell>
                          <TableCell>{totals.flo}</TableCell>
                          <TableCell>{totals.ktp}</TableCell>
                          <TableCell>
                            {totals.tunai + totals.eToll + totals.flo}
                          </TableCell>
                          <TableCell>{totals.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>

                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Detail Laporan
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tanggal</TableCell>
                          <TableCell>Shift</TableCell>
                          <TableCell>Tunai</TableCell>
                          <TableCell>E-Toll</TableCell>
                          <TableCell>Flo</TableCell>
                          <TableCell>KTP</TableCell>
                          <TableCell>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {format(item.Tanggal, "dd/MM/yyyy")}
                              </TableCell>
                              <TableCell>{item.Shift}</TableCell>
                              <TableCell>{item.Tunai}</TableCell>
                              <TableCell>
                                {item.eMandiri +
                                  item.eBri +
                                  item.eBni +
                                  item.eBca +
                                  item.eDKI}
                              </TableCell>
                              <TableCell>{item.eFlo}</TableCell>
                              <TableCell>{item.DinasKary}</TableCell>
                              <TableCell>
                                {item.Tunai +
                                  item.eMandiri +
                                  item.eBri +
                                  item.eBni +
                                  item.eBca +
                                  item.eDKI +
                                  item.eFlo +
                                  item.DinasKary}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </>
            )}
          </Stack>
        </Box>
      </LocalizationProvider>
    </MainLayout>
  );
};

export default Lalin;
