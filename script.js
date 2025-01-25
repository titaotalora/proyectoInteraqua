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
            mostrarModal('Producto creado correctamente');
        } else {
            mostrarModal('Error al crear el producto');
        }
    } catch (error) {
        mostrarModal('Error:', error);
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
        .catch(error => mostrarModal('Error al obtener productos:', error));
});

// Función para mostrar la ventana modal
function mostrarModal(mensaje) {
    const modal = document.getElementById("modal");
    const modalMensaje = document.getElementById("modal-mensaje");
    modalMensaje.textContent = mensaje;
    modal.style.display = "block";
}

// Función para cerrar la ventana modal
function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
