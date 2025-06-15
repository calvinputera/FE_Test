import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import type { LalinI } from "../../../types/lalin";

interface DetailTableProps {
  filteredData: LalinI[];
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DetailTable: React.FC<DetailTableProps> = ({
  filteredData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {format(new Date(item.Tanggal), "dd/MM/yyyy")}
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
  );
};

export default DetailTable;
