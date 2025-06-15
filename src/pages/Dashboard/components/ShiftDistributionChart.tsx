import { Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import type { LalinI } from "../../../types/lalin";

interface ShiftDistributionChartProps {
  lalinData: LalinI[];
}

const ShiftDistributionChart = ({ lalinData }: ShiftDistributionChartProps) => {
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

  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Distribusi Lalin per Shift
      </Typography>
      <Doughnut data={shiftDistributionData} />
    </Paper>
  );
};

export default ShiftDistributionChart;
