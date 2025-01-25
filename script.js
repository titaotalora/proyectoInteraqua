// Para crear los productos

document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
        codigo: document.getElementById('cod').value,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        // activo: document.getElementById('activo').checked
    };

    try {
        const response = await fetch('/crear-producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (response.ok) {
            console.log('Producto creado correctamente');
        } else {
            console.error('Error al crear el producto');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Función para listar productos
document.addEventListener('DOMContentLoaded', function() {
    console.log('Evento DOMContentLoaded disparado');
    fetch('/lista-productos')
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.querySelector('#tabla-productos tbody');
            if (!tablaBody) {
                console.error('Elemento tabla-productos no encontrado en el DOM');
                return;
            }
            tablaBody.innerHTML = ''; // Limpiar cualquier contenido previo
            data.forEach(producto => {
                const fila = document.createElement('tr');

                const celdaCodigo = document.createElement('td');
                celdaCodigo.textContent = producto.codigo;
                fila.appendChild(celdaCodigo);

                const celdaNombre = document.createElement('td');
                celdaNombre.textContent = producto.nombre;
                fila.appendChild(celdaNombre);

                const celdaDescripcion = document.createElement('td');
                celdaDescripcion.textContent = producto.descripcion;
                fila.appendChild(celdaDescripcion);

                tablaBody.appendChild(fila);
            });
        })
        .catch(error => console.error('Error al obtener productos:', error));
});

