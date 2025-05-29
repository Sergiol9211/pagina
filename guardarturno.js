// Requiere el módulo 'fs' para manejar archivos
const fs = require('fs');

// Aquí defines los datos del turno que quieres guardar
const turno = {
    fecha: '2025-05-28',
    hora: '10:00 AM',
    cliente: 'María Fernanda',
    servicio: 'Maquillaje Social'
};

// Formato de texto como si fuera una notita en tu libreta
const textoTurno = `📅 Fecha: ${turno.fecha}\n🕐 Hora: ${turno.hora}\n👩 Cliente: ${turno.cliente}\n💄 Servicio: ${turno.servicio}\n--------------------------\n`;

// Guarda el turno en un archivo de texto llamado 'turnos.txt'
// Si no existe, lo crea; si ya existe, lo añade al final
fs.appendFileSync('turnos.txt', textoTurno);

console.log('✨ Turno guardado con éxito en turnos.txt');
