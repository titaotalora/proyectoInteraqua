const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Configurar la carpeta para los archivos estáticos
app.use(express.static(path.join(__dirname)));

// Crear la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'interaqua2',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta GET para enviar el archivo HTML de formulario
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/productos.html'));
});

// Simulamos una base de datos en memoria
let users = [];

// Ruta POST para manejar el envío del formulario
app.post('/crear-producto', (req, res) => {
    const { codigo, nombre, descripcion} = req.body;
    console.log('Datos recibidos del formulario:', { codigo, nombre, descripcion });

    const sql = 'INSERT INTO productos (codigo, nombre, descripcion) VALUES (?, ?, ?)';
    db.query(sql, [codigo, nombre, descripcion], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            return res.status(500).send('Error al crear el producto');
        }
        console.log('Producto creado exitosamente:', result);
        res.send('Producto creado correctamente');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});