const pool = require('../config/db');

const crearUsuario = async (nombre, email, passwordHasheada, rol = 'vendedor') => {
    // Usamos '?' para evitar inyección SQL (Buenas prácticas de seguridad)
    const [resultado] = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
        [nombre, email, passwordHasheada, rol]
    );
    return resultado;
};

const buscarUsuarioPorEmail = async (email) => {
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return filas[0]; // Retorna el usuario si existe, o undefined si no.
};

module.exports = {
    crearUsuario,
    buscarUsuarioPorEmail
};