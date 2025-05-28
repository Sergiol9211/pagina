// Esperamos que el DOM esté completamente cargado antes de ejecutar cualquier código
document.addEventListener('DOMContentLoaded', () => {

    // Obtenemos el contenedor donde se mostrarán los productos
    const productosContainer = document.getElementById('productos-container');

    // Definimos el array con todos los productos/servicios disponibles
    const productos = [
        {
            nombre: "Epilación de Cejas",
            descripcion: "Realzamos tu mirada con una epilación precisa y personalizada. Técnica suave que respeta la forma natural de tus cejas para un acabado limpio y armónico.",
            precio: "$15.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Epilacion de cejas+diseño",
            descripcion: "Realzamos tu mirada con una epilación precisa y personalizada. Técnica suave que respeta la forma natural de tus cejas para un acabado limpio y armónico.",
            precio: "$20.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Epilación de bozo",
            descripcion: "Eliminamos el vello de forma suave y delicada, dejando tu piel lisa, cuidada y sin irritaciones.",
            precio: "$7.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Epilación de axilas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$15.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Full face",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$40.000",
            categoria: "Epilacion"
        },
        {
            nombre: "Laminado de cejas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$85.000",
            categoria: "Cejas"
        },
        {
            nombre: "Diseño + depilacion + henna",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$35.000",
            categoria: "Cejas"
        },
        {
            nombre: "Henna",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$20.000",
            categoria: "Cejas"
        },
        {
            nombre: "SPA de cejas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$15.000",
            categoria: "Cejas"
        }
    ];

    // Manejo del filtrado por categoría a través de botones o enlaces con data-categoria
    document.querySelectorAll('[data-categoria]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.target.getAttribute('data-categoria');
            mostrarProductos(categoria);
        });
    });

    // Función para mostrar los productos en base a la categoría seleccionada
    function mostrarProductos(categoriaSeleccionada) {
        productosContainer.innerHTML = ''; // Limpiamos el contenedor

        // Filtramos productos si se selecciona una categoría específica
        const productosFiltrados = categoriaSeleccionada === 'Todos'
            ? productos
            : productos.filter(p => p.categoria === categoriaSeleccionada);

        // Mostramos mensaje si no hay productos
        if (productosFiltrados.length === 0) {
            productosContainer.innerHTML = "<p>No hay productos en esta categoría.</p>";
            return;
        }

        // Renderizamos cada producto
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

    // Mostramos todos los productos por defecto al cargar la página
    mostrarProductos('Todos');

    // Evento delegado para capturar clics en los botones "Reservar servicio"
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-carrito")) {
            const nombreProducto = e.target.getAttribute("data-nombre");
            mostrarNotificacion(`"${nombreProducto}" fue agregado al carrito 🛍️`);

            // Actualizamos el contador del carrito
            const contador = document.querySelector(".carrito .cantidad");
            contador.textContent = parseInt(contador.textContent) + 1;
        }
    });

    // Función para mostrar notificaciones temporales
    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion');
        notificacion.textContent = mensaje;
        notificacion.classList.add('mostrar');

        // Ocultamos la notificación después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }

    // Mostrar el modal con indicaciones al hacer clic en el enlace
    document.getElementById('enlace-indicaciones').onclick = function (e) {
        e.preventDefault();
        document.getElementById('modal-indicaciones').style.display = 'flex';
    };

    // Cerrar el modal al hacer clic en el botón "cerrar"
    document.getElementById('cerrar-indicaciones').onclick = function () {
        document.getElementById('modal-indicaciones').style.display = 'none';
    };

    // También cerrar el modal si se hace clic fuera del contenido
    document.getElementById('modal-indicaciones').onclick = function (e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    };
    document.getElementById('enlace-indicaciones').onclick = function (e) {
        e.preventDefault();
        document.getElementById('modal-indicaciones').style.display = 'flex';
    };
    document.getElementById('cerrar-indicaciones').onclick = function () {
        document.getElementById('modal-indicaciones').style.display = 'none';
    };
    // Cerrar modal al hacer click fuera de la imagen
    document.getElementById('modal-indicaciones').onclick = function (e) {
        if (e.target === this) this.style.display = 'none';
    };
});
