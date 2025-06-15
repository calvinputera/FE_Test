import { useState, useEffect } from "react";
import { Box, Paper, Typography, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Bar, Doughnut } from "react-chartjs-2";
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
  }, []); // Empty dependency array means this runs once on mount

  console.log("LALIN DATAAA", lalinData);
  console.log("GERBANG DATAAA", gerbangData);

  const paymentMethodsData = {
    labels: ["BCA", "BRI", "BNI", "DKI", "Mandiri", "Flo", "KTP"],
    datasets: [
      {
        label: "Jumlah Lalin per Metode Pembayaran",
        data: [
          (lalinData || []).reduce((sum, item) => sum + item.eBca, 0),
          (lalinData || []).reduce((sum, item) => sum + item.eBri, 0),
          (lalinData || []).reduce((sum, item) => sum + item.eBni, 0),
          (lalinData || []).reduce((sum, item) => sum + item.eDKI, 0),
          (lalinData || []).reduce((sum, item) => sum + item.eMandiri, 0),
          (lalinData || []).reduce((sum, item) => sum + item.eFlo, 0),
          (lalinData || []).reduce((sum, item) => sum + item.DinasKary, 0),
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
        ],
      },
    ],
  };

  const gateTrafficData = {
    labels: (gerbangData || []).map((gate) => gate.NamaGerbang),
    datasets: [
      {
        label: "Jumlah Lalin per Gerbang",
        data: (gerbangData || []).map((gate) =>
          (lalinData || [])
            .filter((item) => item.IdGerbang === gate.id)
            .reduce((sum, item) => sum + item.Tunai, 0)
        ),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const shiftDistributionData = {
    labels: ["Shift 1", "Shift 2", "Shift 3"],
    datasets: [
      {
        data: [
          (lalinData || []).filter((item) => item.Shift === 1).length,
          (lalinData || []).filter((item) => item.Shift === 2).length,
          (lalinData || []).filter((item) => item.Shift === 3).length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const branchDistributionData = {
    labels: [...new Set((gerbangData || []).map((gate) => gate.NamaCabang))],
    datasets: [
      {
        data: [
          ...new Set((gerbangData || []).map((gate) => gate.NamaCabang)),
        ].map(
          (branch) =>
            (lalinData || []).filter(
              (item) =>
                (gerbangData || []).find((gate) => gate.id === item.IdGerbang)
                  ?.NamaCabang === branch
            ).length
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <DatePicker
          format={"dd/MM/yyyy"}
          views={["day", "month", "year"]}
          label="Pilih Tanggal"
          value={selectedDate}
          onChange={(newValue) => newValue && setSelectedDate(newValue)}
        />
        <Button variant="contained" onClick={fetchData} sx={{ height: "56px" }}>
          Cari Data
        </Button>
      </Box>

      <Stack spacing={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Jumlah Lalin per Metode Pembayaran
          </Typography>
          <Bar data={paymentMethodsData} />
        </Paper>

        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Jumlah Lalin per Gerbang
          </Typography>
          <Bar data={gateTrafficData} />
        </Paper>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Distribusi Lalin per Shift
            </Typography>
            <Doughnut data={shiftDistributionData} />
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Distribusi Lalin per Cabang
            </Typography>
            <Doughnut data={branchDistributionData} />
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
