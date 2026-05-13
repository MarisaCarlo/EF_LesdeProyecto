const express = require('express');

const cors = require('cors');

const dotenv = require('dotenv');

const conectarDB = require('./config/db');

dotenv.config();

conectarDB();

const app = express();

app.use(cors());

app.use(express.json());


// RUTAS

app.use('/api/tareas', require('./routes/tareaRoutes'));

module.exports = app;