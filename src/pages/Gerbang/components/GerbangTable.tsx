import React from "react";
import {
  // Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { GerbangsI } from "../../../types/gerbangs";

interface GerbangTableProps {
  gerbangs: GerbangsI[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (gerbang: GerbangsI) => void;
  onDelete: (id: number, IdCabang: number) => void;
}

const GerbangTable: React.FC<GerbangTableProps> = ({
  gerbangs,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ID Cabang</TableCell>
            <TableCell>Nama Gerbang</TableCell>
            <TableCell>Nama Cabang</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gerbangs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((gerbang, index: number) => (
              <TableRow key={index}>
                <TableCell>{gerbang.id}</TableCell>
                <TableCell>{gerbang.IdCabang}</TableCell>
                <TableCell>{gerbang.NamaGerbang}</TableCell>
                <TableCell>{gerbang.NamaCabang}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => onEdit(gerbang)}
                    sx={{
                      "&:focus": {
                        outline: "none",
                        border: "none",
                      },
                    }}
                  >
                    <LuPencil style={{ color: "#1976d2" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(gerbang.id, gerbang.IdCabang)}
                    sx={{
                      "&:focus": {
                        outline: "none",
                        border: "none",
                      },
                    }}
                  >
                    <LuTrash2 style={{ color: "#d32f2f" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={gerbangs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default GerbangTable;
