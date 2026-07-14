const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Listar todos los contactos
app.get('/contactos', async (req, res) => {
    try {
        const respuesta = await axios.get(
            'http://www.raydelto.org/agenda.php'
        );

        res.json(respuesta.data);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los contactos',
            error: error.message
        });
    }
});

// Almacenar un contacto
app.post('/contactos', async (req, res) => {
    try {
        const { nombre, apellido, telefono } = req.body;

        const respuesta = await axios.post(
            'http://www.raydelto.org/agenda.php',
            {
                nombre,
                apellido,
                telefono
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json({
            mensaje: 'Contacto almacenado correctamente',
            respuesta: respuesta.data
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al guardar el contacto',
            error: error.message
        });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});