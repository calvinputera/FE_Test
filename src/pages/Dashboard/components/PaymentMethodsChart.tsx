import { Paper, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import type { LalinI } from "../../../types/lalin";

interface PaymentMethodsChartProps {
  lalinData: LalinI[];
}

const PaymentMethodsChart = ({ lalinData }: PaymentMethodsChartProps) => {
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

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Jumlah Lalin per Metode Pembayaran
      </Typography>
      <Bar data={paymentMethodsData} />
    </Paper>
  );
};

export default PaymentMethodsChart;
