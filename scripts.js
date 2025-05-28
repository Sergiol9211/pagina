document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');

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

    document.querySelectorAll('[data-categoria]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.target.getAttribute('data-categoria');
            mostrarProductos(categoria);
        });
    });

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

    mostrarProductos('Todos');

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-carrito")) {
            const nombreProducto = e.target.getAttribute("data-nombre");
            mostrarNotificacion(`"${nombreProducto}" fue agregado al carrito 🛍️`);

            const contador = document.querySelector(".carrito .cantidad");
            contador.textContent = parseInt(contador.textContent) + 1;
        }
    });

    function mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion');
        notificacion.textContent = mensaje;
        notificacion.classList.add('mostrar');

        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    }
});
