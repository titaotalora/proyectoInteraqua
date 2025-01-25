const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Configurar la carpeta para los archivos estáticos
app.use(express.static(path.join(__dirname)));

// Servir script.js con el tipo MIME correcto
app.get('/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Ruta GET para enviar el archivo HTML de listaProductos
app.get('/listaProductos', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/listaProductos.html'));
});


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

// Ruta GET para enviar el archivo HTML de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// Ruta GET para enviar el archivo HTML de productos
app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/productos.html'));
});

// Ruta explícita para servir script.js con el tipo MIME correcto
app.get('/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
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

// Ruta GET para enviar el archivo HTML de listaProductos
app.get('/listaProductos', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/listaProductos.html'));
});

app.get('/lista-productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send('Error al obtener productos');
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});