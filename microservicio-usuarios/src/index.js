const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();



const app = express();



// Middlewares

app.use(cors());

app.use(express.json());



// MongoDB

mongoose.connect(process.env.MONGO_URI)

    .then(() => console.log('MongoDB conectado'))

    .catch((error) => console.log(error));



// Rutas

app.use('/api/usuarios', require('./routes/usuarioRoutes'));



// Exportar app para Vercel

module.exports = app;