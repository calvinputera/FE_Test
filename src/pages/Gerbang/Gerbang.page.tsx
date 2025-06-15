import React, { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import type { GerbangsI } from "../../types/gerbangs";
import GerbangTable from "./components/GerbangTable";
import GerbangDialog from "./components/GerbangDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";

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
    } catch (error: unknown) {
      console.error("Error submitting gerbang:", error);
      setSnackbar({
        open: true,
        message: "Terjadi kesalahan saat menyimpan gerbang",
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
      } catch (error: unknown) {
        console.error("Error deleting gerbang:", error);
        setSnackbar({
          open: true,
          message: "Terjadi kesalahan saat menghapus gerbang",
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

        <GerbangTable
          gerbangs={filteredGerbangs}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
        />

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

        <DeleteConfirmationDialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />

        <GerbangDialog
          open={openDialog}
          editingGerbang={editingGerbang}
          formData={formData}
          cabangOptions={cabangOptions}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onCabangChange={handleCabangChange}
        />
      </Box>
    </MainLayout>
  );
};

export default Gerbang;
