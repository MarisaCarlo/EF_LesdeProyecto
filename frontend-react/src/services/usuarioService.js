import axios from 'axios';

const API = 'http://localhost:4000/api/usuarios';

export const obtenerUsuarios = () => axios.get(API);

export const crearUsuario = (data) => axios.post(API, data);