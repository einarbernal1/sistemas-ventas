const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        
        // 1. Verificar si el email ya está en uso
        const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // 2. Encriptar la contraseña con bcrypt
        const salt = await bcrypt.genSalt(10);
        const passwordHasheada = await bcrypt.hash(password, salt);

        // 3. Guardar en base de datos
        await usuarioModel.crearUsuario(nombre, email, passwordHasheada, rol);
        
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor al registrar usuario' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar que el usuario exista
        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // 2. Comparar la contraseña enviada con la encriptada en la DB
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // 3. Si todo es correcto, generar el Token JWT
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, // Payload (datos dentro del token)
            process.env.JWT_SECRET,               // Firma secreta
            { expiresIn: '8h' }                   // Expiración
        );

        res.json({
            mensaje: 'Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
};

module.exports = { registrar, login };