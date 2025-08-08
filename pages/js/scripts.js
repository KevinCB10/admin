// ==================== VARIABLES Y FUNCIONES GLOBALES ====================


const API_BASE_URL = 'http://174.65.1.204:8080/';
const departamentos = ['Departamento Interno', 'Departamento Externo'];


// Rutas y vistas del proyecto
const rutas = {
    'proyecto_detalle': '/pages/project-detail.html',
    'detalle_cliente': '/pages/detalle_cliente.html',
    'estructural_detalle': '/pages/estructural_detalle.html',
    'grafico_detalle': '/pages/grafico_detalle.html',
    'tareas_maqueta': '/pages/tareas_maqueta.html',
    'tareas_paletizado': '/pages/tareas_paletizado.html',
    'tareas_muestra_forrada': '/pages/tareas_muestra_forrada.html',
    'tareas_revision_troqueles': '/pages/tareas_revision_troqueles.html',
    'tareas_trazados': '/pages/tareas_trazados.html',
    'tareas_boceto': '/pages/tareas_boceto.html',
    'tareas_plotter': '/pages/tareas_plotter.html',
    'tareas_muestra_forrada_grafico': '/pages/tareas_muestra_forrada_grafico.html',
    'tareas_consumo_tinta': '/pages/tareas_consumo_tinta.html',
    'tareas_montajes': '/pages/tareas_montajes.html',
    'tareas_agrupaciones': '/pages/tareas_agrupaciones.html'
};


// Método que guarda la selección del tab en el sidebar si paso de una página padre a una página hija.
const guardarTabActivo = tabHref => localStorage.setItem('tab-activo', tabHref) 

// Método que recibe como parámetro una página y redirige según qué ruta se selecciona.
const redireccionPagina = (pagina, id = null, origen = null) => {
    if (!rutas[pagina]) return;

    if (origen) {
        localStorage.setItem('ultimaCardActiva', origen);
    }

    const baseUrl = rutas[pagina];
    const url = id ? `${baseUrl}?id=${encodeURIComponent(id)}` : baseUrl;
    window.location.href = url;
};
 

window.addEventListener('load', function () {
    setTimeout(() => {
    const loader = document.getElementById('loaderContainer');
        if (loader) loader.style.display = 'none';
    }, 1000); 
});

fetch('/pages/sidebar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sidebar-placeholder').innerHTML = html;

        const tabGuardado = localStorage.getItem('tab-activo');
        const currentPath = window.location.pathname;

        const links = document.querySelectorAll('#sidebar-placeholder .nav-link');

        // Marca tab guardado o coincidencia exacta
        links.forEach(link => {
            const href = link.getAttribute('href');

            if (href === tabGuardado) {
                link.classList.add('active');
            }

            if (!tabGuardado && href === currentPath) {
                link.classList.add('active');
            }
        });

        // 🔹 Si no estamos en index.html → marcar siempre Inicio
        if (!currentPath.endsWith('/index.html')) {
            const inicioLink = document.querySelector('#sidebar-placeholder .nav-link[href="/index.html"]');
            if (inicioLink) inicioLink.classList.add('active');
        }
    });


// Limpieza de atributos y focus al cerrar modales Bootstrap
$(document).on('hidden.bs.modal', function (e) {
    const modal = e.target;
    if (modal && modal.getAttribute('aria-hidden') === 'true') {
        modal.removeAttribute('aria-hidden');
    }

    setTimeout(() => {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }, 100);
});

// Alerta global
function mostrarAlerta(titulo, texto, icono = 'info', tiempo = 1800) {
    let timerInterval;

    Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
        timer: tiempo,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Alerta cerrada automáticamente');
        }
    });
}

// =================== FIN VARIABLES Y FUNCIONES GLOBALES =========


// =================== DASHBOARD =================================== 

   let tareasPendientes = null; 
    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    observer.disconnect();
                    callback(el);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    function renderTareas() {
        const tbody = document.getElementById('tabla-tareas-body');
        if (!tbody) {
            console.warn('No se encontró el contenedor de la tabla todavía.');
            return;
        }
 
        // if (tareasPendientes === null) {
        //     tbody.innerHTML = `
        //         <tr class='fadeInUp-animation'>
        //             <td colspan='12' class='text-center py-5 px-3 fs-5'>
        //                 <div class='spinner-border text-primary' role='status'></div>
        //                 <span class='ml-2'>Cargando tareas...</span>
        //             </td>
        //         </tr>
        //     `;
        //     return;
        // }

        // // Si hay array vacío → no hay tareas
        // if (tareasPendientes.length === 0) {
        //     tbody.innerHTML = `
        //         <tr class='fadeInUp-animation'>
        //             <td colspan='12' class='text-center text-muted py-5 px-3 fs-5'>
        //                 No hay tareas pendientes.
        //             </td>
        //         </tr>
        //     `;
        //     return;
        // }

        // Renderizar tareas con animación
        tbody.innerHTML = [
            {   
                'id': 1,
                'nombreProyecto': 'Proyecto Alpha',
                'clienteCodigo': 'CL-001',
                'clienteNombre': 'Cliente XYZ',
                'descripcion': 'Diseño de empaque premium',
                'tipo': 'Validación',
                'estado': 'En Progreso',
                'prioridad': 'Alta',
                'departamentoCreador': 'Diseño',
                'departamentoAsignado': 'Producción',
                'comercial': 'María Gómez',
                'asignadoA': 'Juan Pérez',
                'fechaCreacion': '2025-08-06',
            },
            {
                'id': 2,
                'nombreProyecto': 'Proyecto Alpha',
                'clienteCodigo': 'CL-001',
                'clienteNombre': 'Cliente XYZ',
                'descripcion': 'Diseño de empaque premium',
                'tipo': 'Validación',
                'estado': 'En Progreso',
                'prioridad': 'Alta',
                'departamentoCreador': 'Diseño',
                'departamentoAsignado': 'Producción',
                'comercial': 'María Gómez',
                'asignadoA': 'Juan Pérez',
                'fechaCreacion': '2025-08-06',
            },
            {
                'id': 2,
                'nombreProyecto': 'Proyecto Alpha',
                'clienteCodigo': 'CL-001',
                'clienteNombre': 'Cliente XYZ',
                'descripcion': 'Diseño de empaque premium',
                'tipo': 'Validación',
                'estado': 'En Progreso',
                'prioridad': 'Alta',
                'departamentoCreador': 'Diseño',
                'departamentoAsignado': 'Producción',
                'comercial': 'María Gómez',
                'asignadoA': 'Juan Pérez',
                'fechaCreacion': '2025-08-06',
            },

        ].map(t => `
            <tr onclick='redireccionPagina("proyecto_detalle", ${t.id}, "tareas")' style='font-size: 13px; cursor: pointer;' class='fadeInUp-animation'>
                <td>
                    <button type='button' class='btn btn-secondary btn-sm text-truncate' style='max-width: 140px;'>
                        ${t.nombreProyecto}
                    </button>
                </td>
                <td class='text-truncate' style='max-width: 140px;'>${t.clienteCodigo}</td>
                <td class='text-truncate' style='max-width: 160px;'>${t.clienteNombre}</td>
                <td class='text-truncate' style='max-width: 200px;'>${t.descripcion}</td>
                <td  class='text-truncate'>${t.tipo}</td>
                <td  class='text-truncate'>${t.estado}</td>
                <td  class='text-truncate'>${t.prioridad}</td>
                <td  class='text-truncate'>${t.departamentoCreador}</td>
                <td  class='text-truncate'>${t.departamentoAsignado}</td>
                <td  class='text-truncate'>${t.comercial}</td>
                <td  class='text-truncate'>${t.asignadoA}</td>
                <td  class='text-truncate'> ${formatearFecha(t.fechaCreacion)} </td>
            </tr>
        `).join('');

        // tbody.innerHTML = tareasPendientes.map(t => `
        //     <tr  onclick='redireccionPagina("proyecto_detalle")'  style='font-size: 13px; cursor: pointer;' class='fadeInUp-animation'> 
        //         <td>
        //             <button type='button' class='btn btn-secondary btn-sm text-truncate' style='max-width: 140px;'>
        //                 ${t.proyecto || 'Sin info.'}
        //             </button>
        //         </td>
        //         <td class='text-truncate' style='max-width: 160px;'>
        //             <button type='button' class='btn btn-secondary btn-sm'>
        //                 ${t.clienteCodigo || 'Sin info.'}
        //             </button>
        //         </td>
        //         <td  class='text-truncate' style='max-width: 140px;'>
        //             <button type='button' class='btn btn-secondary btn-sm'>
        //                 ${t.clienteNombre || 'Sin info.'}
        //             </button>
        //         </td>
        //         <td class='text-truncate' style='max-width: 200px;'>${t.descripcion}</td>
        //         <td>${t.tipo || 'Sin info.'}</td>
        //         <td>${t.estado || 'Sin info.'}</td>
        //         <td>${t.prioridad}</td>
        //         <td>${t.departamentoCreador}</td>
        //         <td>${t.departamentoAsignado}</td>
        //         <td>${t.creadoPor}</td>
        //         <td>${t.asignadoA}</td>
        //         <td>${t.fechaCreacion}</td> 

        //     </tr>
        // `).join('');
    }

    async function getData() { 
        const url = `${API_BASE_URL}tareas/pendientes/test/dmaiques`;
        
        console.log('📡 Llamando a API (refresco de tareas)...', url); 

        const TIMEOUT_MS = 10000;   
        const fetchWithTimeout = (url, options, timeout = TIMEOUT_MS) => {
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('timeout')), timeout)
                )
            ]);
        };

        try {
            const response = await fetchWithTimeout(url); 
            if (!response.ok) throw new Error(`Response status: ${response.status}`);

            const result = await response.json();
            console.log('📊 Respuesta JSON:', result); 
            tareasPendientes = result;
            renderTareas();

        } catch (error) {
            console.error('❌ Error en getData():', error);

            // Mostrar mensaje en tabla si hay error o timeout
            const tbody = document.getElementById('tabla-tareas-body');
            if (tbody) {
                tbody.innerHTML = ` 
                    <tr>
                        <td colspan='12' class='text-center text-danger py-5 px-3'>
                            <i class='fas fa-exclamation-triangle'></i>
                            Error al cargar las tareas $ {
                                error.message === 'timeout' ? '(Tiempo de espera agotado)' : ''
                            } 
                        </td>
                    </tr> 
                `;
            }
        }
    }


function mostrarContenido(tipo) {

    const contenedor = document.getElementById('dashboard-content');
    localStorage.setItem('ultimaCardActiva', tipo)

    // Primero quitamos el resaltado a todas las tarjetas
    document.querySelectorAll('.small-box').forEach(card => {
        card.classList.remove('active-card');
    });

    // Luego agregamos el resaltado a la tarjeta seleccionada
    const cardSeleccionada = document.getElementById(`card-${tipo}`);
    if (cardSeleccionada) {
        cardSeleccionada.classList.add('active-card');
    }

    // Ahora insertamos el contenido correspondiente
    let contenido = '';
    let tituloTabla = '';

    switch (tipo) {
        case 'proyectos':
            tituloTabla = 'Proyectos';
            contenido = `
                <div class='card card-default fadeInUp-animation'>
                    <div class='card-header'>
                        <h3 id='tablaTitulo' class='card-title text-bold'>${tituloTabla}</h3>
                    </div>
                    <div class='card-body'> 
                        <div class='card-body p-0'>
                            <table class='table table-striped projects'>
                                <thead>
                                    <tr>
                                        <th style='width: 1%'>
                                             
                                        </th>
                                        <th style='width: 20%'>
                                            Nombre del Proyecto
                                        </th> 
                                        <th>
                                            Cliente
                                        </th>
                                        <th>
                                            Descripción
                                        </th>
                                        <th style='width: 8%' class='text-center'>
                                            Estado
                                        </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                             
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001309</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 1
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td>
                                             
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")'  class='btn btn-secondary btn-sm'>C2040-001310</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 2
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            `;
        break;

        case 'tareas':
            tituloTabla = 'Tareas Pendientes';
            contenido = `
                <div class='card card-default fadeInUp-animation'>
                    <div class='card-header d-flex justify-content-start align-items-center'>
                        <h3 id='tablaTitulo' class='card-title text-bold mb-0'>${tituloTabla}</h3>
                        <button id='btn-actualizar-tareas' class='btn btn-link p-0 btn-icon d-flex align-items-center' title='Actualizar'>
                            <span class='icono-actualizar fade-show'>
                                <i class='fas fa-sync-alt ml-2 mt-2'></i>
                            </span>
                            <span class='spinner-cargando fade-hide'>
                                <span class='spinner-border spinner-border-sm ml-2' role='status' aria-hidden='true'></span>
                            </span>
                        </button>
                    </div>
                    <div class='card-body p-0'>
                        <div class='table-responsive'>
                            <table class='table table-striped projects table-hover align-middle mb-0'>
                                <thead class='thead-light'>
                                    <tr style='font-size: 13px;'> 
                                        <th>Nombre Proyecto</th>
                                        <th>Cliente/Código</th>
                                        <th>Cliente/Ubicación</th>
                                        <th>Descripción</th> 
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                        <th>Prioridad</th>
                                        <th>Departamento Creador</th>
                                        <th>Departamento Asignado</th>
                                        <th>Creado por</th>
                                        <th>Asignado a</th>
                                        <th>Tarea Creada</th>
                                    </tr>
                                </thead>
                                <tbody id='tabla-tareas-body'></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;

            if (contenedor) {
                contenedor.innerHTML = contenido;

                requestAnimationFrame(() => {
                    
                    if (tareasPendientes === null) {
                        renderTareas();
                        // getData();
                    } else {
                        console.log('♻️ Usando datos en caché');
                        renderTareas();
                    }

                    let actualizandoTareas = false;
                    const btnActualizar = document.getElementById('btn-actualizar-tareas');
                    const icono = btnActualizar?.querySelector('.icono-actualizar');
                    const spinner = btnActualizar?.querySelector('.spinner-cargando');

                    if (btnActualizar && icono && spinner) {
                        btnActualizar.addEventListener('click', async () => {
                            if (actualizandoTareas) return;

                            actualizandoTareas = true;
                            console.log('🔄 Actualizando tareas desde backend...');

                            // Bloquear botón y poner gris
                            btnActualizar.style.opacity = '0.5';
                            btnActualizar.style.pointerEvents = 'none';

                            // Fade icono → spinner
                            icono.classList.remove('fade-show');
                            icono.classList.add('fade-hide');
                            spinner.classList.remove('fade-hide');
                            spinner.classList.add('fade-show');

                            tareasPendientes = null;
                            renderTareas();

                            try {
                                await getData();
                            } catch (error) {
                                console.error('❌ Error al actualizar:', error);
                            } finally {
                                // Fade spinner → icono
                                spinner.classList.remove('fade-show');
                                spinner.classList.add('fade-hide');
                                icono.classList.remove('fade-hide');
                                icono.classList.add('fade-show');

                                // Restaurar botón
                                btnActualizar.style.opacity = '1';
                                btnActualizar.style.pointerEvents = 'auto';
                                actualizandoTareas = false;
                            }
                        });
                    }
                });
            }
        break; 
 
        case 'todos':
            tituloTabla = 'Todos los Proyectos';
            contenido = `
                <div class='card card-default fadeInUp-animation'>
                    <div class='card-header'>
                        <h3 id='tablaTitulo' class='card-title text-bold'>${tituloTabla}</h3>
                    </div>
                    <div class='card-body'> 
                        <div class='card-body p-0'>
                            <table class='table table-striped projects'>
                                <thead>
                                    <tr>
                                        <th style='width: 1%'> 
                                        </th>
                                        <th style='width: 20%'>
                                            Nombre del Proyecto
                                        </th> 
                                        <th>
                                            Cliente
                                        </th>
                                        <th>
                                            Descripción
                                        </th>
                                        <th style='width: 8%' class='text-center'>
                                            Estado
                                        </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001309</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 1
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td>
                                             
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")'  class='btn btn-secondary btn-sm'>C2040-001310</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 2
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            `;
        break;

        case 'aprobaciones':
            tituloTabla = 'Aprobaciones Pendientes';
            contenido = `
                <div class='card card-default fadeInUp-animation'>
                    <div class='card-header'>
                        <h3 id='tablaTitulo' class='card-title text-bold'>${tituloTabla}</h3>
                    </div>
                    <div class='card-body'> 
                        <div class='card-body p-0'>
                            <table class='table table-striped projects'>
                                <thead>
                                    <tr>
                                        <th style='width: 1%'>
                                             
                                        </th>
                                        <th style='width: 20%'>
                                            Tarea
                                        </th> 
                                        <th>
                                            Proyecto
                                        </th>
                                        <th>
                                            Descripción
                                        </th>
                                        <th style='width: 8%' class='text-center'>
                                            Estado
                                        </th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                             
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001309</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 1
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr> 
                                    <tr>
                                        <td>
                                             
                                        </td>
                                        <td> 
                                            <button type='button' onclick='redireccionPagina("proyecto_detalle")'  class='btn btn-secondary btn-sm'>C2040-001310</button> 
                                        </td> 
                                        <td class='project_progress'> 
                                            <button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button>
                                        </td>
                                        <td>
                                            Descripción del proyecto 2
                                        </td>
                                        <td class='project-state'>
                                            <span class='badge badge-success'>Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </div>
                </div>
            `;
        break;

        default:
            contenido = '<p>Selecciona una tarjeta para ver su contenido.</p>';
    }
    
    if (contenedor) {
        contenedor.innerHTML = contenido;
    }
}

// Mostrar la vista por defecto al cargar
document.addEventListener('DOMContentLoaded', function () {
    const ultimaCard = localStorage.getItem('ultimaCardActiva') || 'proyectos';
    mostrarContenido(ultimaCard);
});

 
// ======================== FIN DASHBOARD =============================


// ===================== DETALLE CLIENTE ========================

// clientes
const clientes = [
  {
    nombre: "VIÑEDOS Y BODEGAS LYNG, S.L.",
    codigo: "8842",
    email: "contacto@lyng.com",
    telefono: "600123456"
  },
  {
    nombre: "VIÑEDOS Y BODEGAS XXI,S.L.",
    codigo: "11274",
    email: "contacto@xxi.com",
    telefono: "600234567"
  },
  {
    nombre: "WARDA TRADING S.A.R.A.U.",
    codigo: "42765",
    email: "info@warda.com",
    telefono: "600345678"
  },
  {
    nombre: "WILKHAHN, S.A.",
    codigo: "22985",
    email: "info@wilkahn.com",
    telefono: "600456789"
  },
  {
    nombre: "WINES AND COMPANY",
    codigo: "2312",
    email: "ventas@wines.com",
    telefono: "600567890"
  }
];

const folderData = {

    imágenes: [
        { 
            name: 'Image-1.jpg', 
            icon: 'fas fa-image',
            date: '2025-06-01' 
        },
        { 
            name: 'Image-2.png', 
            icon: 'fas fa-image', 
            date: '2025-06-02' 
        },
        { 
            name: 'Image-3.gif', 
            icon: 'fas fa-image', 
            date: '2025-06-03' 
        }
    ],

    scripts: [
        { 
            name: 'app.js', 
            icon: 'fab fa-js', 
            date: '2025-06-04' 
        },
        { 
            name: 'main.js', 
            icon: 'fab fa-js', 
            date: '2025-06-05' 
        }
    ],

    docs: [
        { 
            name: 'README.txt', 
            icon: 'fas fa-file-alt', 
            date: '2025-06-06' 
        },
        { 
            name: 'Checklist.doc', 
            icon: 'fas fa-file-word', 
            date: '2025-06-07' 
        }
    ]

};

 
const folderList = document.getElementById('folder-list');
const folderTitle = document.getElementById('folder-title');
const folderContent = document.getElementById('folder-content');

const renderFolder = (folderName) => {

    if (folderTitle) {
        folderTitle.textContent = `Contenido de ${capitalize(folderName)}`;    
    }

    if (folderContent) {
        folderContent.innerHTML = '';
    }

    const files = folderData[folderName] || [];

    files.forEach(file => {

        const item = document.createElement('div');
        item.className = 'file-item mb-2';
        item.innerHTML = `
            <div class='file-item-icon ${file.icon} text-secondary mr-3'></div>
            <a href='#' class='file-item-name flex-grow-1'>${file.name}</a>
            <div class='file-item-changed text-muted mr-3'>${file.date}</div>
            <div class='file-item-actions btn-group'>
                <button type='button' class='btn btn-sm dropdown-toggle' data-toggle='dropdown'>
                    <i class='fas fa-ellipsis-v'></i>
                </button>
                <div class='dropdown-menu dropdown-menu-right'>
                    <a class='dropdown-item' href='#'>Renombrar</a>
                    <a class='dropdown-item' href='#'>Eliminar</a>
                </div>
            </div>
        `;

        if (folderContent) {
            folderContent.appendChild(item);
        }

    });

};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

 if (folderList) {
    folderList.addEventListener('click', (e) => {
        const item = e.target.closest('li[data-folder]');
        if (item) {
            document.querySelectorAll('#folder-list .list-group-item').forEach(li => li.classList.remove('active'));
            item.classList.add('active');
            const folderName = item.getAttribute('data-folder');
            renderFolder(folderName);
        }
    });
} 

renderFolder('imágenes');

// ====================== FIN DETALLE CLIENTE ==========================


// ====================== BOTON VOLVER =================================
function renderBotonVolver() {
  const contenedor = document.getElementById('btn-volver-placeholder');
  if (!contenedor) return;

  contenedor.innerHTML = `
    <button id='btn-volver' class='btn btn-outline-info shadow-sm d-flex align-items-center'>
      <i class='fas fa-chevron-left mr-2'></i> Volver
    </button>
  `;

  const btnVolver = document.getElementById('btn-volver');
  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      window.history.length > 1 
      ? window.history.back() 
      : window.location.href = '/index.html';
    });
  }
}

function formatearFecha(fecha) {
  const [anio, mes, dia] = fecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

// SCRIPT CLIENTES
 
document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('tabla-clientes');
  if (!contenedor) return;

  clientes.forEach(cliente => {
    const inicial = cliente.nombre.trim().charAt(0).toUpperCase();

    const fila = `
      <tr style="cursor: pointer;">
        <td class="col-cliente">
          <div class='d-flex align-items-center'>
            <div class='avatar-circle mr-3'>${inicial}</div>
            <div>
              <div class='font-weight-bold info-destacada'>${cliente.nombre}</div>
            </div>
          </div>
        </td>
        <td class="col-codigo">
          <div class="info-destacada">${cliente.codigo}</div>
        </td> 
        <td class="col-acciones">
          <button class='btn btn-sm btn-primary'><i class='fas fa-search'></i></button>
          <button class='btn btn-sm btn-info'><i class='fas fa-edit'></i></button>
          <button class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i></button>
        </td>
      </tr>
    `;

    contenedor.insertAdjacentHTML('beforeend', fila);
  });
});



document.addEventListener('DOMContentLoaded', renderBotonVolver);