import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import axios, { AxiosError } from "axios";
import type { GerbangsI } from "../../types/gerbangs";

const Gerbang = () => {
  const [gerbangs, setGerbangs] = useState<GerbangsI[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    id: number;
    IdCabang: number;
  } | null>(null);
  const [editingGerbang, setEditingGerbang] = useState<GerbangsI | null>(null);
  const [formData, setFormData] = useState<GerbangsI>({
    id: 0,
    IdCabang: 0,
    NamaGerbang: "",
    NamaCabang: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Get unique cabang options
  const cabangOptions = React.useMemo(() => {
    const uniqueCabangs = new Map();
    gerbangs.forEach((gerbang) => {
      if (!uniqueCabangs.has(gerbang.IdCabang)) {
        uniqueCabangs.set(gerbang.IdCabang, {
          id: gerbang.IdCabang,
          nama: gerbang.NamaCabang,
        });
      }
    });
    return Array.from(uniqueCabangs.values());
  }, [gerbangs]);

  const fetchGerbangs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/gerbangs");
      const sortedGerbangs = (response.data.data.rows.rows || []).sort(
        (a: GerbangsI, b: GerbangsI) => b.id - a.id
      );
      setGerbangs(sortedGerbangs);
    } catch (error) {
      console.error("Error fetching gerbangs:", error);
    }
  };

  useEffect(() => {
    fetchGerbangs();
  }, []);

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

  const handleOpenDialog = (gerbang?: GerbangsI) => {
    if (gerbang) {
      setEditingGerbang(gerbang);
      setFormData(gerbang);
    } else {
      setEditingGerbang(null);
      setFormData({
        id: 0,
        IdCabang: 0,
        NamaGerbang: "",
        NamaCabang: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingGerbang(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "id" || name === "IdCabang") {
      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCabangChange = (
    event: React.SyntheticEvent,
    newValue: { id: number; nama: string } | null
  ) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        IdCabang: newValue.id,
        NamaCabang: newValue.nama,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        id: parseInt(formData.id.toString()),
        IdCabang: parseInt(formData.IdCabang.toString()),
      };

      if (editingGerbang) {
        await axios.put("http://localhost:8080/api/gerbangs", submitData);
        setSnackbar({
          open: true,
          message: "Gerbang berhasil diperbarui",
          severity: "success",
        });
      } else {
        await axios.post("http://localhost:8080/api/gerbangs", submitData);
        setSnackbar({
          open: true,
          message: "Gerbang berhasil ditambahkan",
          severity: "success",
        });
      }
      fetchGerbangs();
      handleCloseDialog();
    } catch (error: AxiosError) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan gerbang",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number, IdCabang: number) => {
    setDeleteItem({ id, IdCabang });
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteItem) {
      try {
        await axios.delete("http://localhost:8080/api/gerbangs", {
          data: deleteItem,
        });
        setSnackbar({
          open: true,
          message: "Gerbang berhasil dihapus",
          severity: "success",
        });
        fetchGerbangs();
        setOpenDeleteDialog(false);
        setDeleteItem(null);
      } catch (error: AxiosError) {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            "Terjadi kesalahan saat menghapus gerbang",
          severity: "error",
        });
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteItem(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const filteredGerbangs = gerbangs.filter(
    (gerbang) =>
      gerbang.NamaGerbang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gerbang.NamaCabang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            label="Cari Gerbang"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: 300 }}
          />
          <Button
            variant="contained"
            onClick={() => handleOpenDialog()}
            sx={{
              "&:focus": {
                outline: "none",
                border: "none",
              },
            }}
          >
            Tambah Gerbang
          </Button>
        </Box>

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
              {filteredGerbangs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gerbang, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{gerbang.id}</TableCell>
                    <TableCell>{gerbang.IdCabang}</TableCell>
                    <TableCell>{gerbang.NamaGerbang}</TableCell>
                    <TableCell>{gerbang.NamaCabang}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog(gerbang)}
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
                        onClick={() =>
                          handleDelete(gerbang.id, gerbang.IdCabang)
                        }
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
            count={filteredGerbangs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          // maxWidth="sm"
          // fullWidth
        >
          <DialogTitle id="delete-dialog-title">Konfirmasi Hapus</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              Apakah Anda yakin ingin menghapus gerbang ini?
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDeleteDialog}
              sx={{
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              sx={{
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingGerbang ? "Edit Gerbang" : "Tambah Gerbang"}
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
            >
              <TextField
                name="id"
                label="ID"
                value={formData.id}
                onChange={handleInputChange}
                disabled={!!editingGerbang}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                sx={{
                  "& input[type=number]": { "-moz-appearance": "textfield" },
                  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                    { "-webkit-appearance": "none", margin: 0 },
                }}
              />
              <Autocomplete
                options={cabangOptions}
                getOptionLabel={(option) => `${option.id} - ${option.nama}`}
                value={
                  cabangOptions.find(
                    (option) => option.id === formData.IdCabang
                  ) || null
                }
                onChange={handleCabangChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ID Cabang"
                    inputProps={{
                      ...params.inputProps,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                  />
                )}
              />
              <TextField
                name="NamaGerbang"
                label="Nama Gerbang"
                value={formData.NamaGerbang}
                onChange={handleInputChange}
              />
              <TextField
                name="NamaCabang"
                label="Nama Cabang"
                value={formData.NamaCabang}
                disabled
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                "&:focus": {
                  outline: "none",
                  border: "none",
                },
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default Gerbang;
