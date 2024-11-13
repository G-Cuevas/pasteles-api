import { useEffect, useState } from "react";
import "./App.css";
import { eliminarPastel, guardarPastel, obtenerPasteles } from "./api/pasteles";
import { Pastel } from "./interface/pasteles.interface";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState([] as Pastel[]);
  const [open, setOpen] = useState(false);

  const defaultPastel = {
    nombre: "",
    precioCompra: "",
    precioVenta: "",
    habilitado: true,
  };

  const [selected, setSelected] = useState<Pastel>(defaultPastel);

  const cargarPasteles = async (timeout: number = 0) => {
    setLoading(true);
    const response = await obtenerPasteles();
    setResponse(response);
    setTimeout(() => setLoading(false), timeout);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateClick = () => {
    setSelected(defaultPastel);
    setOpen(true);
  };

  const handleEditClick = (id: string | undefined) => {
    if (!id) throw new Error("Id es obligatorio");

    const pastel = response.find((p) => p.id === id);
    if (!pastel) throw new Error("Pastel no encontrado");

    setSelected(pastel);
    setOpen(true);
  };

  const handleDelete = async () => {
    const id = selected?.id;
    if (!id) throw new Error("Id es obligatorio");

    await eliminarPastel(id);
    cargarPasteles();
    setOpen(false);
  };

  const onSubmit = async () => {
    if (!selected) throw new Error("Pastel es obligatorio");
    await guardarPastel(selected);
    setOpen(false);
    cargarPasteles(500);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    cargarPasteles(1000);
  }, []);

  return (
    <>
      <Grid2>
        <h1>Pasteles</h1>
        <Dialog
          open={open}
          maxWidth="xs"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {selected?.id ? "Editar pastel" : "Crear pastel"}
              <Button onClick={handleClose}>
                <ClearIcon />
              </Button>
            </div>
          </DialogTitle>
          <DialogContent>
            <br />

            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={selected?.nombre}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Precio Compra"
                  name="precioCompra"
                  value={selected?.precioCompra}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Precio Venta"
                  name="precioVenta"
                  value={selected?.precioVenta}
                  onChange={handleChange}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={handleDelete}
                style={{
                  marginRight: "auto",
                  marginLeft: "20px",
                }}
              >
                Eliminar
              </Button>
              <Button
                variant="contained"
                onClick={onSubmit}
                style={{ marginRight: "20px" }}
              >
                {selected?.id ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Grid2 container>
            <Button
              fullWidth
              color="inherit"
              variant="contained"
              onClick={handleCreateClick}
              style={{ marginBottom: 20 }}
            >
              Crear
            </Button>

            <TableContainer component={Paper} elevation={5}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Precio Compra</TableCell>
                    <TableCell align="center">Precio Venta</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {response.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditClick(row.id)}
                    >
                      <TableCell component="th" scope="row">
                        {row.nombre}
                      </TableCell>
                      <TableCell align="center">{row.precioCompra}</TableCell>
                      <TableCell align="center">{row.precioVenta}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid2>
        )}
      </Grid2>
    </>
  );
}

export default App;
