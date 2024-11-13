import axios from "axios";
import { Pastel } from "../interface/pasteles.interface";

const url = import.meta.env.VITE_API_URL;

export const obtenerPasteles = async (): Promise<Pastel[]> => {
  const endpoint = `${url}/api/Catalogo/Pastel/obtener-pasteles`;
  const response = await axios.get(endpoint);
  return response.data;
};

export const guardarPastel = async (pastel: Pastel) => {
  console.log("pastel:", pastel);
  const endpoint = `${url}/api/Catalogo/Pastel/guardar-pastel`;
  const response = await axios.post(endpoint, pastel);
  return response.data;
};

export const eliminarPastel = async (id: string) => {
  const endpoint = `${url}/api/Catalogo/Pastel/eliminar-pastel/${id}`;
  const response = await axios.delete(endpoint);
  return response.data;
};
