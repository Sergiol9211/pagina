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

    // Carrito en memoria
    let carrito = [];

    // Agregar producto al carrito
    function agregarAlCarrito(nombreProducto) {
        const productoExistente = carrito.find(item => item.nombre === nombreProducto);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ nombre: nombreProducto, cantidad: 1 });
        }
        actualizarContadorCarrito();
    }

    // Actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const contador = document.querySelector(".carrito .cantidad");
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }

    // Mostrar el carrito en un modal
    function mostrarCarrito() {
        let html = '<h2>Carrito de compras</h2>';
        if (carrito.length === 0) {
            html += '<p>El carrito está vacío.</p>';
        } else {
            html += '<ul>';
            let total = 0;
            carrito.forEach((item, idx) => {
                // Extraer el valor numérico del precio
                const producto = productos.find(p => p.nombre === item.nombre);
                let precioUnitario = 0;
                if (producto) {
                    precioUnitario = parseInt(producto.precio.replace(/\D/g, ''));
                }
                const subtotal = precioUnitario * item.cantidad;
                total += subtotal;
                html += `<li>${item.nombre} x${item.cantidad} <span style="font-weight:400;">($${subtotal.toLocaleString('es-CO')})</span> <button data-idx="${idx}" class="eliminar-item">Eliminar</button></li>`;
            });
            html += '</ul>';
            html += `<p style="font-weight:bold;font-size:18px;margin-top:10px;">Total: $${total.toLocaleString('es-CO')}</p>`;
            // Botón para ver turnos disponibles y contenedor
            html += `<button id="btn-google-login" style="margin-top:10px;padding:10px 20px;background:#4285F4;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:16px;">Ver turnos disponibles</button>`;
            html += `<div id="turnos-disponibles" style="margin-top:15px;"></div>`;
            html += `<button id="finalizar-reserva" style="margin-top:15px;padding:10px 20px;background:#000;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:16px;">Finalizar reserva</button>`;
        }
        const modal = document.createElement('div');
        modal.id = 'modal-carrito';
        modal.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:2000;';
        modal.innerHTML = `<div style="background:#fff;padding:20px;border-radius:8px;max-width:90vw;max-height:90vh;position:relative;">
            <button id="cerrar-carrito" style="position:absolute;top:10px;right:10px;font-size:1.5em;background:none;border:none;cursor:pointer;">&times;</button>
            ${html}
        </div>`;
        document.body.appendChild(modal);

        document.getElementById('cerrar-carrito').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

        modal.querySelectorAll('.eliminar-item').forEach(btn => {
            btn.onclick = function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                carrito.splice(idx, 1);
                modal.remove();
                mostrarCarrito();
                actualizarContadorCarrito();
            };
        });

        // Acción del botón "Finalizar reserva"
        const btnFinalizar = modal.querySelector('#finalizar-reserva');
        if (btnFinalizar) {
            btnFinalizar.onclick = function () {
                modal.remove();
                carrito = [];
                actualizarContadorCarrito();
                mostrarNotificacion('¡Reserva finalizada! Nos pondremos en contacto contigo.');
            };
        }

        // Asignar evento al botón "Ver turnos disponibles" dentro del modal
        const btnGoogleLogin = modal.querySelector('#btn-google-login');
        if (btnGoogleLogin) {
            btnGoogleLogin.onclick = function () {
                if (typeof handleAuthClick === "function") {
                    handleAuthClick();
                }
            };
        }
    }

    // Evento para botones "Reservar servicio" y mostrar carrito
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-carrito")) {
            const nombreProducto = e.target.getAttribute("data-nombre");
            agregarAlCarrito(nombreProducto);
            mostrarNotificacion(`"${nombreProducto}" fue agregado al carrito 🛍️`);
        }
        if (e.target.classList.contains("carrito")) {
            e.preventDefault();
            mostrarCarrito();
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

});

// --- Google Calendar API ---
const CLIENT_ID = '369828587641-e96k726h6v401ugk1go8rfgp8j1em21h.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// Cargar la API de Google al cargar la página
window.handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
};

function initClient() {
    gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    });
}

function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        // Busca el contenedor dentro del modal
        const turnosDiv = document.getElementById('turnos-disponibles');
        if (turnosDiv) {
            listarTurnosDisponibles(turnosDiv);
        }
    });
}

function listarTurnosDisponibles(turnosDiv) {
    // Duración del servicio en minutos (puedes cambiarlo según el servicio)
    const duracionServicio = 60;
    // Consulta los eventos de hoy
    const inicio = new Date();
    inicio.setHours(8, 0, 0, 0); // 8:00 am
    const fin = new Date();
    fin.setHours(18, 0, 0, 0); // 6:00 pm

    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': inicio.toISOString(),
        'timeMax': fin.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(response => {
        const eventos = response.result.items;
        let turnos = [];
        let libreDesde = new Date(inicio);

        eventos.forEach(ev => {
            let inicioEvento = new Date(ev.start.dateTime || ev.start.date);
            let finEvento = new Date(ev.end.dateTime || ev.end.date);
            if ((inicioEvento - libreDesde) / 60000 >= duracionServicio) {
                turnos.push({
                    desde: new Date(libreDesde),
                    hasta: new Date(inicioEvento)
                });
            }
            libreDesde = finEvento > libreDesde ? finEvento : libreDesde;
        });
        // Último hueco del día
        if ((fin - libreDesde) / 60000 >= duracionServicio) {
            turnos.push({
                desde: new Date(libreDesde),
                hasta: new Date(fin)
            });
        }

        // Mostrar turnos disponibles
        let html = '<h3>Turnos disponibles:</h3><ul>';
        turnos.forEach(t => {
            html += `<li>${t.desde.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(t.desde.getTime() + duracionServicio * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>`;
        });
        html += '</ul>';
        turnosDiv.innerHTML = html;
    });
}
