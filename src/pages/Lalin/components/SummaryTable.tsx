import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface SummaryTableProps {
  totals: {
    tunai: number;
    eToll: number;
    flo: number;
    ktp: number;
    total: number;
  };
}

const SummaryTable: React.FC<SummaryTableProps> = ({ totals }) => {
  return (
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
              <TableCell>{totals.tunai + totals.eToll + totals.flo}</TableCell>
              <TableCell>{totals.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SummaryTable;
