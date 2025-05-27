document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');

    const productos = [
        {
            nombre: "Epilación de Cejas",
            descripcion: "Realzamos tu mirada con una epilación precisa y personalizada.Técnica suave que respeta la forma natural de tus cejas para un acabado limpio y armónico.",
            precio: "$15.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Epilación de bozo",
            descripcion: "Recupera la fuerza, volumen y belleza natural de tus cejas y pestañas con un tratamiento diario que realmente funciona.",
            precio: "$7.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Epilacion de axilas",
            descripcion: "Recupera la fuerza, volumen y belleza natural de tus cejas y pestañas con un tratamiento diario que realmente funciona.",
            precio: "$30.000",
            categoria: "Epilacion"
        },
        
        // Puedes agregar más productos aquí
    ];

    // Manejo de clic en categorías
    document.querySelectorAll('[data-categoria]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.target.getAttribute('data-categoria');
            mostrarProductos(categoria);
        });
    });

    // Mostrar productos según categoría
    function mostrarProductos(categoriaSeleccionada) {
        productosContainer.innerHTML = '';

        const productosFiltrados = categoriaSeleccionada === 'Todos'
            ? productos
            : productos.filter(p => p.categoria === categoriaSeleccionada);

        if (productosFiltrados.length === 0) {
            productosContainer.innerHTML = "<p>No hay productos en esta categoría.</p>";
            return;
        }

        productosFiltrados.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">${producto.precio}</p>
                <button class="btn-carrito" data-nombre="${producto.nombre}">Reservar servicio</button>

            `;
            productosContainer.appendChild(div);
        });
    }

    // Mostrar todos los productos al cargar la página
    mostrarProductos('Todos');

    // Detectar clics en botones de "Agregar al carrito"
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-carrito")) {
            const nombreProducto = e.target.getAttribute("data-nombre");
            mostrarNotificacion(`"${nombreProducto}" fue agregado al carrito 🛍️`);

            // Aumentar contador del carrito
            const contador = document.querySelector(".carrito .cantidad");
            contador.textContent = parseInt(contador.textContent) + 1;
        }
    });

    // Mostrar notificación
    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion');
        notificacion.textContent = mensaje;
        notificacion.classList.add('mostrar');

        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }
});

