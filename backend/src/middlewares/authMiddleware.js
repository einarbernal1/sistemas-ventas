const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Formato: Bearer <token>
    if (!token) return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado; // Inyectamos los datos del token en la request
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};