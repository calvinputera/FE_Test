import { Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import type { LalinI } from "../../../types/lalin";
import type { GerbangsI } from "../../../types/gerbangs";

interface BranchDistributionChartProps {
  lalinData: LalinI[];
  gerbangData: GerbangsI[];
}

const BranchDistributionChart = ({
  lalinData,
  gerbangData,
}: BranchDistributionChartProps) => {
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
    <Paper sx={{ p: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>
        Distribusi Lalin per Cabang
      </Typography>
      <Doughnut data={branchDistributionData} />
    </Paper>
  );
};

export default BranchDistributionChart;
