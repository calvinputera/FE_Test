import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { format } from "date-fns";
import type { LalinI } from "../../types/lalin";
import type { GerbangsI } from "../../types/gerbangs";
import DatePickerSection from "./components/DatePickerSection";
import PaymentMethodsChart from "./components/PaymentMethodsChart";
import GateTrafficChart from "./components/GateTrafficChart";
import ShiftDistributionChart from "./components/ShiftDistributionChart";
import BranchDistributionChart from "./components/BranchDistributionChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2023-11-01")
  );
  const [lalinData, setLalinData] = useState<LalinI[]>([]);
  const [gerbangData, setGerbangData] = useState<GerbangsI[]>([]);

  const fetchData = async () => {
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const [lalinResponse, gerbangResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/lalins?tanggal=${formattedDate}`),
        axios.get("http://localhost:8080/api/gerbangs"),
      ]);
      setLalinData(
        Array.isArray(lalinResponse.data.data.rows.rows)
          ? lalinResponse.data.data.rows.rows
          : []
      );
      setGerbangData(
        Array.isArray(gerbangResponse.data.data.rows.rows)
          ? gerbangResponse.data.data.rows.rows
          : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <DatePickerSection
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onSearch={fetchData}
      />

      <Stack spacing={3}>
        <PaymentMethodsChart lalinData={lalinData} />
        <GateTrafficChart lalinData={lalinData} gerbangData={gerbangData} />

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <ShiftDistributionChart lalinData={lalinData} />
          <BranchDistributionChart
            lalinData={lalinData}
            gerbangData={gerbangData}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
