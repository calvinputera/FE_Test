import { Paper, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import type { LalinI } from "../../../types/lalin";
import type { GerbangsI } from "../../../types/gerbangs";

interface GateTrafficChartProps {
  lalinData: LalinI[];
  gerbangData: GerbangsI[];
}

const GateTrafficChart = ({
  lalinData,
  gerbangData,
}: GateTrafficChartProps) => {
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

  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Jumlah Lalin per Gerbang
      </Typography>
      <Bar data={gateTrafficData} />
    </Paper>
  );
};

export default GateTrafficChart;
