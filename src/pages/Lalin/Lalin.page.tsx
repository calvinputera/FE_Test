import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, Stack, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { format } from "date-fns";
import type { LalinI } from "../../types/lalin";
import HeaderSection from "./components/HeaderSection";
import SummaryTable from "./components/SummaryTable";
import DetailTable from "./components/DetailTable";

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
            <HeaderSection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              handleReset={handleReset}
              handleExport={handleExport}
            />

            {loading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <SummaryTable totals={totals} />
                <DetailTable
                  filteredData={filteredData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </>
            )}
          </Stack>
        </Box>
      </LocalizationProvider>
    </MainLayout>
  );
};

export default Lalin;
