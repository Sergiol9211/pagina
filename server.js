const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/guardar-turno', (req, res) => {
    const { nombre, whatsapp, correo, fecha, hora, servicios } = req.body;
    const texto =
        `Nombre: ${nombre}
WhatsApp: ${whatsapp}
Correo: ${correo}
Fecha: ${fecha}
Hora: ${hora}
Servicios: ${servicios}
--------------------------
`;
    fs.appendFileSync('datos.txt', texto, 'utf8');
    res.json({ ok: true, mensaje: 'Turno guardado' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});