const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Parsea el body como JSON

// Aquí importarías tus rutas, por ejemplo:
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/productos', require('./routes/productoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});