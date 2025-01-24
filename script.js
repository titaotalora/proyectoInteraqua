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
