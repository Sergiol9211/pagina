document.addEventListener('DOMContentLoaded', () => {

    // Obtenemos el contenedor donde se mostrarán los productos
    const productosContainer = document.getElementById('productos-container');

    // Definimos el array con todos los productos/servicios disponibles
    const productos = [
        {
            nombre: "Epilación de Cejas",
            descripcion: "Realzamos tu mirada con una epilación precisa y personalizada. Técnica suave que respeta la forma natural de tus cejas para un acabado limpio y armónico.",
            precio: "$15.000",
            categoria: "Epilacion",
            duracion: 15
        },
        {
            nombre: "Epilacion de cejas+diseño",
            descripcion: "Realzamos tu mirada con una epilación precisa y personalizada. Técnica suave que respeta la forma natural de tus cejas para un acabado limpio y armónico.",
            precio: "$20.000",
            categoria: "Epilacion",
            duracion: 20
        },
        {
            nombre: "Epilación de bozo",
            descripcion: "Eliminamos el vello de forma suave y delicada, dejando tu piel lisa, cuidada y sin irritaciones.",
            precio: "$7.000",
            categoria: "Epilacion",
            duracion: 10
        },
        {
            nombre: "Epilación de axilas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$15.000",
            categoria: "Epilacion",
            duracion: 15
        },
        {
            nombre: "Full face",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$40.000",
            categoria: "Epilacion",
            duracion: 30
        },
        {
            nombre: "Laminado de cejas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$85.000",
            categoria: "Cejas",
            duracion: 45
        },
        {
            nombre: "Diseño + depilacion + henna",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$35.000",
            categoria: "Cejas",
            duracion: 30
        },
        {
            nombre: "Henna",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$20.000",
            categoria: "Cejas",
            duracion: 20
        },
        {
            nombre: "SPA de cejas",
            descripcion: "Técnica rápida y efectiva para una piel suave, limpia y sin vello por más tiempo.",
            precio: "$15.000",
            categoria: "Cejas",
            duracion: 20
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
                <p class="duracion">Duración: ${producto.duracion} min</p>
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
        const producto = productos.find(p => p.nombre === nombreProducto);
        const productoExistente = carrito.find(item => item.nombre === nombreProducto);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ nombre: nombreProducto, cantidad: 1, duracion: producto.duracion });
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

            // Mostramos el calendario directamente (sin botón)
            html += `<div id="calendario-turnos" style="margin-top:15px;"></div>`;

            // Formulario de datos del cliente
            html += `
                <form id="form-datos-cliente" style="margin-top:15px;">
                    <label>Nombre:<br><input type="text" name="nombre" required style="width:100%;margin-bottom:8px;"></label><br>
                    <label>WhatsApp:<br><input type="tel" name="whatsapp" required style="width:100%;margin-bottom:8px;"></label><br>
                    <label>Correo:<br><input type="email" name="correo" required style="width:100%;margin-bottom:8px;"></label><br>
                    <button type="submit" style="padding:10px 20px;background:#000;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:16px;">Finalizar reserva</button>
                </form>
            `;
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

        // Mostrar el calendario automáticamente si hay productos en el carrito
        if (carrito.length > 0) {
            const duracionTotal = carrito.reduce((sum, item) => sum + (item.duracion * item.cantidad), 0);
            mostrarCalendarioTurnos(modal.querySelector('#calendario-turnos'), duracionTotal);
        }

        // Acción del formulario de datos del cliente
        const formDatos = modal.querySelector('#form-datos-cliente');
        if (formDatos) {
            formDatos.onsubmit = async function (e) {
                e.preventDefault();
                const nombre = formDatos.nombre.value.trim();
                const whatsapp = formDatos.whatsapp.value.trim();
                const correo = formDatos.correo.value.trim();

                // Obtener día y hora seleccionados
                const diaBtn = document.querySelector('.btn-dia-turno.seleccionado');
                const horaBtn = document.querySelector('.btn-hora-turno.seleccionado');
                const fecha = diaBtn ? `${diaBtn.textContent.padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}` : '';
                const hora = horaBtn ? horaBtn.textContent : '';
                const servicios = carrito.map(item => `${item.nombre} x${item.cantidad}`).join(', ');

                // Si tienes backend, aquí puedes enviar los datos con fetch:
                // await fetch('http://localhost:3000/guardar-turno', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ nombre, whatsapp, correo, fecha, hora, servicios })
                // });

                modal.remove();
                carrito = [];
                actualizarContadorCarrito();
                mostrarNotificacion(`¡Reserva finalizada! Gracias, ${nombre}. Nos pondremos en contacto por WhatsApp.`);
                // Si quieres ver los datos en consola:
                console.log({ nombre, whatsapp, correo, fecha, hora, servicios });
            };
        }
    }

    // Función para mostrar el calendario y reservar turno
    function mostrarCalendarioTurnos(contenedor, duracionTotal) {
        // Fecha actual
        const hoy = new Date();
        let año = hoy.getFullYear();
        let mes = hoy.getMonth();

        render();

        function render() {
            // Selector de mes y año
            let html = `
                <div style="margin-bottom:10px;">
                    <button id="mes-anterior" style="margin-right:10px;">&#8592;</button>
                    <span style="font-weight:bold;">${new Date(año, mes).toLocaleString('es-CO', { month: 'long' })} ${año}</span>
                    <button id="mes-siguiente" style="margin-left:10px;">&#8594;</button>
                </div>
                <h3>Selecciona un día para tu turno</h3>
                <div style="display:flex;flex-wrap:wrap;gap:5px;">
            `;
            const diasEnMes = new Date(año, mes + 1, 0).getDate();

            for (let dia = 1; dia <= diasEnMes; dia++) {
                html += `<button class="btn-dia-turno" data-dia="${dia}" style="width:40px;height:40px;">${dia}</button>`;
            }
            html += `</div><div id="horas-turno" style="margin-top:10px;"></div>`;

            contenedor.innerHTML = html;

            // Navegación de meses
            contenedor.querySelector('#mes-anterior').onclick = () => {
                if (mes === 0) {
                    mes = 11;
                    año--;
                } else {
                    mes--;
                }
                render();
            };
            contenedor.querySelector('#mes-siguiente').onclick = () => {
                if (mes === 11) {
                    mes = 0;
                    año++;
                } else {
                    mes++;
                }
                render();
            };

            // Evento para seleccionar día con resaltado
            contenedor.querySelectorAll('.btn-dia-turno').forEach(btn => {
                btn.onclick = function () {
                    // Quitar selección previa
                    contenedor.querySelectorAll('.btn-dia-turno').forEach(b => b.classList.remove('seleccionado'));
                    // Marcar el seleccionado
                    this.classList.add('seleccionado');
                    const diaSeleccionado = this.getAttribute('data-dia');
                    mostrarHorasTurno(contenedor.querySelector('#horas-turno'), año, mes, diaSeleccionado, duracionTotal);
                };
            });
        }
    }

    // Horarios según bloques de atención y duración total
    function mostrarHorasTurno(contenedor, año, mes, dia, duracionTotal) {
        let html = `<h4>Selecciona una hora:</h4>`;
        const bloques = [
            { inicio: 9, fin: 12 },   // 9:00 a 12:00
            { inicio: 14, fin: 19 }   // 14:00 a 19:00
        ];

        bloques.forEach(bloque => {
            // Convertimos el inicio y fin del bloque a minutos desde medianoche
            let bloqueInicioMin = bloque.inicio * 60;
            let bloqueFinMin = bloque.fin * 60;

            for (let min = bloqueInicioMin; min + duracionTotal <= bloqueFinMin; min += duracionTotal) {
                let hora = Math.floor(min / 60);
                let minutos = min % 60;
                // Formato HH:MM
                let horaStr = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
                html += `<button class="btn-hora-turno" data-hora="${horaStr}" style="margin:2px;">${horaStr}</button>`;
            }
        });

        contenedor.innerHTML = html;

        // Evento para seleccionar hora con resaltado
        contenedor.querySelectorAll('.btn-hora-turno').forEach(btn => {
            btn.onclick = function () {
                // Quitar selección previa
                contenedor.querySelectorAll('.btn-hora-turno').forEach(b => b.classList.remove('seleccionado'));
                // Marcar el seleccionado
                this.classList.add('seleccionado');
                // Aquí puedes guardar la hora seleccionada si lo deseas
            };
        });
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
