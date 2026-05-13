const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const conectarDB = require('./config/db');

dotenv.config();
conectarDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarioRoutes'));

module.exports = app;