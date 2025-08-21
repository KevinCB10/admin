 
// ==================== VARIABLES Y FUNCIONES GLOBALES ====================

const API_BASE_URL = 'http://174.65.1.204:8080/';
const departamentos = ['Departamento Interno', 'Departamento Externo'];

// Rutas y vistas del proyecto (sin cambios)
const rutas = {
  'proyecto_detalle': '/pages/detalle_proyecto.html',
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

// Guarda selección de tab (sin cambios)
const guardarTabActivo = tabHref => localStorage.setItem('tab-activo', tabHref);

// === REFACTORIZADO === Utils globales reutilizables
const TIMEOUT_MS = 10000;

function fetchWithTimeout(url, options = {}, timeout = TIMEOUT_MS) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}

// === REFACTORIZADO === Normalizador opcional si lo necesitas
function normalizarPath(p) {
  if (!p) return '/';
  return p.replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
}

// === REFACTORIZADO === Método de redirección (firma igual, más consistente)
const redireccionPagina = (pagina, id = null, origen = null) => {

  const baseUrl = rutas[pagina];
  if (!baseUrl) return;

  if (origen) localStorage.setItem('ultimaCardActiva', origen);

  const params = new URLSearchParams();
  if (id !== null && id !== undefined) params.set('id', String(id));

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  window.location.href = url;

};

// Oculta loader (igual)
window.addEventListener('load', function () {
  setTimeout(() => {
    const loader = document.getElementById('loaderContainer');
    if (loader) loader.style.display = 'none';
  }, 1000);
});

// === REFACTORIZADO === Helper para marcar link activo del sidebar (plug-and-play)
function marcarLinkActivo(links, currentPath, tabGuardado = null) {
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === tabGuardado || (!tabGuardado && href === currentPath)) {
      link.classList.add('active');
    }
  });
}

// Carga del sidebar y marcado de activo (misma lógica + helper)
fetch('/pages/sidebar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sidebar-placeholder').innerHTML = html;

    const tabGuardado = localStorage.getItem('tab-activo');
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('#sidebar-placeholder .nav-link');

    marcarLinkActivo(links, currentPath, tabGuardado);

    // Si no estamos en index.html → marcar siempre Inicio
    if (!currentPath.endsWith('/index.html')) {
      const inicioLink = document.querySelector('#sidebar-placeholder .nav-link[href="/index.html"]');
      if (inicioLink) inicioLink.classList.add('active');
    }
  });

// Limpieza de atributos y focus al cerrar modales Bootstrap (igual)
$(document).on('hidden.bs.modal', function (e) {
  const modal = e.target;
  if (modal && modal.getAttribute('aria-hidden') === 'true') {
    modal.removeAttribute('aria-hidden');
  }
  setTimeout(() => {
    if (document.activeElement) document.activeElement.blur();
  }, 100);
});

// Alerta global (igual)
function mostrarAlerta(titulo, texto, icono = 'info', tiempo = 1800) {
  let timerInterval;
  Swal.fire({
    icon: icono,
    title: titulo,
    text: texto,
    timer: tiempo,
    timerProgressBar: true,
    didOpen: () => { Swal.showLoading(); },
    willClose: () => { clearInterval(timerInterval); }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('Alerta cerrada automáticamente');
    }
  });
}

// =================== FIN VARIABLES Y FUNCIONES GLOBALES =========


// =================== DASHBOARD ===================================

let tareasPendientes = null;

// === REFACTORIZADO === Espera de elementos (mantiene callback y añade promise)
function waitForElement(selector, callback) {
  const exec = (el) => callback && callback(el);
  const el = document.querySelector(selector);
  if (el) return exec(el);

  const observer = new MutationObserver(() => {
    const found = document.querySelector(selector);
    if (found) {
      observer.disconnect();
      exec(found);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// === REFACTORIZADO === Versión Promise (opcional)
function waitForElementAsync(selector) {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    const obs = new MutationObserver(() => {
      const found = document.querySelector(selector);
      if (found) {
        obs.disconnect();
        resolve(found);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true });
  });
}

// Render tareas (igual, solo usa formatearFecha mejorada)
function renderTareas() {
  const tbody = document.getElementById('tabla-tareas-body');
  if (!tbody) {
    console.warn('No se encontró el contenedor de la tabla todavía.');
    return;
  }

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
      'fechaCreacion': '2025-08-06'
    },
    {
      'id': 2,
      'nombreProyecto': 'Proyecto Alpha',
      'clienteCodigo': 'CL-001',
      'clienteNombre': 'Cliente XYZ',
      'descripcion': 'Diseño de empaque premium',
      'tipo': 'Otra Tarea',
      'estado': 'En Progreso',
      'prioridad': 'Alta',
      'departamentoCreador': 'Diseño',
      'departamentoAsignado': 'Producción',
      'comercial': 'María Gómez',
      'asignadoA': 'Juan Pérez',
      'fechaCreacion': '2025-08-06'
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
      'fechaCreacion': '2025-08-06'
    }
  ].map(t => `
    <tr onclick='redireccionPagina("proyecto_detalle", ${t.id}, "tareas")' style='font-size: 13px; cursor: pointer;' class='fadeInUp-animation'>
      <td>
        <button type='button' class='btn btn-secondary btn-sm text-truncate td-fonts' style='max-width: 140px;'>
          ${t.nombreProyecto}
        </button>
      </td>
      <td class='text-truncate td-fonts' style='max-width: 140px;'>${t.clienteCodigo}</td>
      <td class='text-truncate td-fonts' style='max-width: 160px;'>${t.clienteNombre}</td>
      <td class='text-truncate td-fonts' style='max-width: 200px;'>${t.descripcion}</td>
      <td class='text-truncate td-fonts'>${t.tipo}</td>
      <td class='text-truncate td-fonts'>${t.estado}</td>
      <td class='text-truncate td-fonts'>${t.prioridad}</td>
      <td class='text-truncate td-fonts'>${t.departamentoCreador}</td>
      <td class='text-truncate td-fonts'>${t.departamentoAsignado}</td>
      <td class='text-truncate td-fonts'>${t.comercial}</td>
      <td class='text-truncate td-fonts'>${t.asignadoA}</td>
      <td class='text-truncate td-fonts'> ${formatearFecha(t.fechaCreacion)} </td>
    </tr>
  `).join('');
}

// === REFACTORIZADO === getData (usa fetchWithTimeout global)
async function getData() {
  const url = `${API_BASE_URL}test/tareas/pendientes/dmaiques`;
  console.log('📡 Llamando a API (refresco de tareas)...', url);

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    console.log('📊 Respuesta JSON:', result);
    tareasPendientes = result;
    renderTareas();
  } catch (error) {
    console.error('❌ Error en getData():', error);

    const tbody = document.getElementById('tabla-tareas-body');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan='12' class='text-center text-danger py-5 px-3'>
            <i class='fas fa-exclamation-triangle'></i>
            Error al cargar las tareas ${error.message === 'timeout' ? '(Tiempo de espera agotado)' : ''}
          </td>
        </tr>
      `;
    }
  }
}

function mostrarContenido(tipo) {
  const contenedor = document.getElementById('dashboard-content');
  localStorage.setItem('ultimaCardActiva', tipo);

  // Quitar resaltado y poner al seleccionado
  document.querySelectorAll('.small-box').forEach(card => card.classList.remove('active-card'));
  const cardSeleccionada = document.getElementById(`card-${tipo}`);
  if (cardSeleccionada) cardSeleccionada.classList.add('active-card');

  let contenido = '';
  let tituloTabla = '';

  switch (tipo) {
    case 'proyectos':
      tituloTabla = 'Proyectos';
      contenido = `
      <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
        <h3 id='tablaTitulo' class='m-0 text-bold'>${tituloTabla}</h3>
        <div class='proj-toolbar'>
          <div class='input-group input-group-lg mr-2'>
            <input
              id='proj-search'
              type='search'
              class='form-control'
              placeholder='Buscar…'
              autocomplete='off'
            />
            <div class='input-group-append'>
              <span
                id='proj-clear'
                class='input-group-text clear-addon'
                role='button'
                tabindex='0'
                title='Limpiar búsqueda'
                aria-label='Limpiar búsqueda'
              >
                <i class='fa-solid fa-eraser'></i>
              </span>
            </div>
          </div> 
          <div class='proj-select-wrap mr-2'>
            <select
              id='proj-status-filter'
              class='form-control form-control-lg proj-select'
              required
            >
              <option value='' selected>Seleccionar...</option>
              <option>Success</option>
              <option>En Progreso</option>
              <option>Pendiente</option>
            </select>
          </div> 
          <button
            id='proj-refresh'
            class='btn btn-outline-secondary btn-lg'
            title='Actualizar'
          >
            <i class='fas fa-sync-alt'></i>
          </button>
        </div>
      </div>

      <div class='card-body p-0'>
        <div class='table-responsive table-outline table-scroll-x'>
          <table class='table table-striped table-bordered projects table-hover align-middle mb-0'>
            <thead class='thead-light'>
              <tr>
                <th style='width:20%' class='td-fonts pb-3'>Nombre del Proyecto</th>
                <th class='td-fonts pb-3'>Cliente</th>
                <th class='td-fonts pb-3'>Descripción</th>
                <th style='width:15%' class='td-fonts pb-3'>Estado</th>
              </tr>
            </thead>
            <tbody id='proyectos-tbody'>
              <tr onclick='redireccionPagina("proyecto_detalle")' style='cursor: pointer;'>
                <td>
                  <button class='btn btn-secondary td-fonts'>C2040-001309</button>
                </td>
                <td class='project_progress'>
                  <button class='btn btn-secondary td-fonts'>Cliente</button>
                </td>
                <td class='td-fonts' title='Descripción del proyecto 1'>Descripción del proyecto 1</td>
                <td class='project-state td-fonts'>
                  <span class='badge badge-success badge-lg'>Success</span>
                </td>
              </tr>
              <tr onclick='redireccionPagina("proyecto_detalle")' style='cursor: pointer;'>
                <td>
                  <button class='btn btn-secondary td-fonts'>C2040-001310</button>
                </td>
                <td class='project_progress'>
                  <button class='btn btn-secondary td-fonts'>Clientazo</button>
                </td>
                <td class='td-fonts' title='Descripción del proyecto 2'>Descripción del proyecto 2</td>
                <td class='project-state td-fonts'>
                  <span class='badge badge-warning badge-lg'>Failed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> 
    `;
    break;

    case 'tareas':
      tituloTabla = 'Tareas Pendientes';
      contenido = `
      <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
        <h3 id='tablaTitulo' class='m-0 text-bold'>${tituloTabla}</h3>
        <div class='proj-toolbar'>
          <div class='input-group input-group-lg mr-2'>
            <input
              id='proj-search'
              type='search'
              class='form-control'
              placeholder='Buscar…'
              autocomplete='off'
            />
            <div class='input-group-append'>
              <span
                id='proj-clear'
                class='input-group-text clear-addon'
                role='button'
                tabindex='0'
                title='Limpiar búsqueda'
                aria-label='Limpiar búsqueda'
              >
                <i class='fa-solid fa-eraser'></i>
              </span>
            </div>
          </div> 
          <div class='proj-select-wrap mr-2'>
            <select
              id='proj-status-filter'
              class='form-control form-control-lg proj-select'
              required
            >
              <option value='' disabled selected>Seleccionar...</option>
              <option>Success</option>
              <option>En Progreso</option>
              <option>Pendiente</option>
            </select>
          </div> 
          <button
            id='proj-refresh'
            class='btn btn-outline-secondary btn-lg'
            title='Actualizar'
          >
            <i class='fas fa-sync-alt'></i>
          </button>
        </div>
      </div>

      <div class='card-body p-0'> 
        <div class='table-outline'> 
          <div class='table-responsive table-scroll-x'>
            <table class='table table-striped table-bordered projects table-hover align-middle mb-0'>
              <thead class='thead-light'>
                <tr>
                  <th class='pb-3 td-fonts'>Nombre Proyecto</th>
                  <th class='pb-3 td-fonts'>Cliente/Código</th>
                  <th class='pb-3 td-fonts'>Cliente/Ubicación</th>
                  <th class='pb-3 td-fonts'>Descripción</th>
                  <th class='pb-3 td-fonts'>Tipo</th>
                  <th class='pb-3 td-fonts'>Estado</th>
                  <th class='pb-3 td-fonts'>Prioridad</th>
                  <th class='pb-3 td-fonts'>Departamento Creador</th>
                  <th class='pb-3 td-fonts'>Departamento Asignado</th>
                  <th class='pb-3 td-fonts'>Creado por</th>
                  <th class='pb-3 td-fonts'>Asignado a</th>
                  <th class='pb-3 td-fonts'>Tarea Creada</th>
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
          getData();
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

            btnActualizar.style.opacity = '0.5';
            btnActualizar.style.pointerEvents = 'none';

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
              spinner.classList.remove('fade-show');
              spinner.classList.add('fade-hide');
              icono.classList.remove('fade-hide');
              icono.classList.add('fade-show'); 
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
          <div class='table-responsive table-outline'>
              <table class='table table-striped table-bordered projects table-hover align-middle mb-0'>
              <thead class='thead-light'>
                <tr>
                  <th style='width: 1%'></th>
                  <th style='width: 20%'>Nombre del Proyecto</th>
                  <th>Cliente</th>
                  <th>Descripción</th>
                  <th style='width: 8%' class='text-center'>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td><button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001309</button></td>
                  <td class='project_progress'><button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button></td>
                  <td>Descripción del proyecto 1</td>
                  <td class='project-state'><span class='badge badge-success'>Success</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001310</button></td>
                  <td class='project_progress'><button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button></td>
                  <td>Descripción del proyecto 2</td>
                  <td class='project-state'><span class='badge badge-success'>Success</span></td>
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
                  <th style='width: 1%'></th>
                  <th style='width: 20%'>Tarea</th>
                  <th>Proyecto</th>
                  <th>Descripción</th>
                  <th style='width: 8%' class='text-center'>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td><button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001309</button></td>
                  <td class='project_progress'><button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button></td>
                  <td>Descripción del proyecto 1</td>
                  <td class='project-state'><span class='badge badge-success'>Success</span></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button type='button' onclick='redireccionPagina("proyecto_detalle")' class='btn btn-secondary btn-sm'>C2040-001310</button></td>
                  <td class='project_progress'><button type='button' class='btn btn-secondary btn-sm'>Cliente # 2</button></td>
                  <td>Descripción del proyecto 2</td>
                  <td class='project-state'><span class='badge badge-success'>Success</span></td>
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

    // Si la vista actual es "proyectos", engancha la toolbar
    if (tipo === 'proyectos') {
        const tbody    = document.getElementById('proyectos-tbody');
        const search   = document.getElementById('proj-search');
        const status   = document.getElementById('proj-status-filter');
        const refresh  = document.getElementById('proj-refresh');
        const clearEl  = document.getElementById('proj-clear'); // addon con icono de borrador

        // Debounce helper
        const debounce = (fn, wait = 150) => {
          let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
        };

        const filtrarTabla = () => {
          if (!tbody) return;
          const q  = (search?.value || '').trim().toLowerCase();
          const st = (status?.value || '').trim().toLowerCase();

          tbody.querySelectorAll('tr').forEach(row => {
            const text  = row.textContent.toLowerCase();
            const badge = row.querySelector('.project-state .badge');
            const cur   = badge ? badge.textContent.trim().toLowerCase() : '';
            const okQ   = !q || text.includes(q);
            const okSt  = !st || cur === st;
            row.style.display = (okQ && okSt) ? '' : 'none';
          });
        };

        // Habilita/deshabilita el botón-borrador según haya texto
        const actualizarEstadoBorrador = () => {
          if (!clearEl || !search) return;
          const hayTexto = !!search.value.trim();
          clearEl.classList.toggle('is-disabled', !hayTexto);
          clearEl.setAttribute('aria-disabled', String(!hayTexto));
        };

        // Eventos
        if (search) {
          search.addEventListener('input', debounce(() => {
            filtrarTabla();
            actualizarEstadoBorrador();
          }, 150));
        }

        if (status) status.addEventListener('change', filtrarTabla);

        // Borrar solo el texto del buscador (no toca el select)
        if (clearEl) {
          clearEl.style.cursor = 'pointer';
          clearEl.addEventListener('click', () => {
            if (!search || !search.value) return;
            search.value = '';
            search.focus();
            filtrarTabla();
            actualizarEstadoBorrador();
          });

          // Accesibilidad con teclado
          clearEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              clearEl.click();
            }
          });
        }

        // Refresh: por ahora solo reaplica filtros (hook futuro para recargar datos)
        if (refresh) {
          refresh.style.cursor = 'pointer';
          refresh.addEventListener('click', () => {
            filtrarTabla();
          });
        }

        // Tooltips de truncado
        if (tbody) {
          tbody.querySelectorAll('td.td-fonts').forEach(td => {
            if (!td.getAttribute('title')) td.setAttribute('title', td.textContent.trim());
          });
        }

        // Estado inicial del borrador
        actualizarEstadoBorrador();
      }
    }
}

// Mostrar la vista por defecto al cargar (igual)
document.addEventListener('DOMContentLoaded', function () {
  const ultimaCard = localStorage.getItem('ultimaCardActiva') || 'proyectos';
  mostrarContenido(ultimaCard);
});

// ======================== FIN DASHBOARD =============================


// ===================== DETALLE CLIENTE ========================

const clientes = [
  { 
    nombre: 'VIÑEDOS Y BODEGAS LYNG, S.L.', 
    codigo: '8842', 
    email: 'contacto@lyng.com', 
    telefono: '600123456', 
  },
  { 
    nombre: 'VIÑEDOS Y BODEGAS XXI, S.L.', 
    codigo: '11274', 
    email: 'contacto@xxi.com', 
    telefono: '600234567' 
  },
  { 
    nombre: 'WARDA TRADING S.A.R.A.U.', 
    codigo: '42765', 
    email: 'info@warda.com', 
    telefono: '600345678' 
  },
  { 
    nombre: 'WILKHAHN, S.A.', 
    codigo: '22985', 
    email: 'info@wilkahn.com', 
    telefono: '600456789' 
  },
  { 
    nombre: 'WINES AND COMPANY', 
    codigo: '2312', 
    email: 'ventas@wines.com', 
    telefono: '600567890' 
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

// === REFACTORIZADO === helper para crear ítems de carpeta
const createFileItem = (file) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'file-item mb-2';
  wrapper.innerHTML = `
    <div class='file-item-icon ${file.icon} text-info mr-3'></div>
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
  return wrapper;
};

// === REFACTORIZADO === renderFolder más limpio
const renderFolder = (folderName) => {
  if (folderTitle) folderTitle.textContent = `Contenido de ${capitalize(folderName)}`;
  if (folderContent) folderContent.innerHTML = '';

  const files = folderData[folderName] || [];
  files.forEach(file => {
    if (folderContent) folderContent.appendChild(createFileItem(file));
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

// === REFACTORIZADO === formatearFecha robusta (misma salida dd/mm/aaaa)
function formatearFecha(fecha) {
  if (!fecha) return '';
  if (fecha instanceof Date && !isNaN(fecha)) {
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const yyyy = String(fecha.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }
  const parsed = new Date(fecha);
  if (!isNaN(parsed)) {
    const dd = String(parsed.getDate()).padStart(2, '0');
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const yyyy = String(parsed.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }
  return '';
}


document.addEventListener('DOMContentLoaded', renderBotonVolver);

// ====================== FIN BOTON VOLVER =============================


// ====================== NAV BAR ======================================

class AppNavbar extends HTMLElement {
  connectedCallback() {
    const logoutUrl   = this.getAttribute('logout-url')     || '/login.html';
    const tooltipText = this.getAttribute('tooltip-text')   || 'Cerrar sesión';
    const placement   = this.getAttribute('placement')      || 'bottom';
    const iconSize    = this.getAttribute('icon-size')      || 'fa-2x';
    const menuIconSz  = this.getAttribute('menu-icon-size') || 'fa-2x';
    const clearKeys   = (this.getAttribute('clear-keys')    || 'tab-activo, ultimaCardActiva').split(',').map(s => s.trim()).filter(Boolean);

    // Render (sin Shadow DOM para que apliquen estilos de Bootstrap/AdminLTE)
    this.innerHTML = `
      <nav class='main-header navbar navbar-expand navbar-white navbar-light'>
        <ul class='navbar-nav'>
          <li class='nav-item'>
            <a class='nav-link' data-widget='pushmenu' href='#' role='button' title='Menú'>
              <i class='fas fa-bars ${menuIconSz}'></i>
            </a>
          </li>
        </ul>

        <ul class='navbar-nav ml-auto '>
          <li class='nav-item'>
            <a
              class='nav-link btn-logout'
              href='#'
              aria-label='${tooltipText}'
              title='${tooltipText}'
              data-bs-toggle='tooltip'       
              data-toggle='tooltip'         
              data-bs-placement='${placement}'
              data-placement='${placement}'
            >
              <i class='fa-solid fa-right-from-bracket ${iconSize}'></i>
            </a>
          </li>
        </ul>
      </nav>
    `;

    // Logout handler (limpia storage opcional y redirige)
    const btn = this.querySelector('.btn-logout');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        try { clearKeys.forEach(k => localStorage.removeItem(k)); } catch {}
        window.location.href = logoutUrl;
      });
    }

    // Inicializa tooltips (BS5 o fallback BS4)
    const initTooltips = () => {
      const el = this.querySelector('[data-bs-toggle="tooltip"], [data-toggle="tooltip"]');
      if (!el) return;
      if (window.bootstrap && bootstrap.Tooltip) {
        new bootstrap.Tooltip(el);
      } else if (window.jQuery && typeof jQuery.fn.tooltip === 'function') {
        jQuery(el).tooltip();
      }
    };

    document.readyState === 'complete' || document.readyState === 'interactive'
    ? setTimeout(initTooltips, 0)
    : document.addEventListener('DOMContentLoaded', initTooltips)   
  }
}

  customElements.define('app-navbar', AppNavbar);

// ===================== VISTA MINIATURAS EN ESTRUCTURAL Y GRAFICO ===============================

 
// scripts.js (o al final de tu página)
document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('.fp-canvas img');
  if (!img) return;

  // Carga inicial desde assets
  setPreviewFile('/assets/ard.png', 'Vista previa de diseño');

  // Haz clic para abrir la imagen en una pestaña nueva (opcional)
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => window.open(img.src, '_blank'));
});

/**
 * Cambia la imagen de vista previa.
 * @param {string} url - Ruta de la imagen (puede ser absoluta o relativa).
 * @param {string} [alt='Vista previa'] - Texto alternativo.
 */
window.setPreviewFile = function setPreviewFile(url, alt = 'Vista previa') {
  const img = document.querySelector('.fp-canvas img');
  if (!img) return;

  img.style.opacity = '0';

  img.onload = () => {
    img.style.opacity = '1';
    img.onload = null; // limpiar
  };

  img.onerror = () => {
    img.style.opacity = '1';
    // Fallback mínimo si falla la carga
    img.src =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 300'>
        <rect width='100%' height='100%' fill='#f8fafc'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#64748b' font-family='sans-serif' font-size='18'>
          No se pudo cargar la imagen
        </text>
      </svg>`
    );
  };

  img.alt = alt;
  img.src = url;
};



(() => {
  const BREAKPOINT = 1200;
  const isMobile = () => innerWidth < BREAKPOINT;

  let canClose = false;
  const OPEN_DELAY = 220; // antirebote
  const backdrop = document.getElementById('sidebar-backdrop');

  function setOpen(open){
    const willOpen = (open === undefined)
    ? !document.body.classList.contains('sidebar-open')
    : open;

    document.body.classList.toggle('sidebar-open', willOpen);
    document.body.classList.remove('sidebar-collapse');  

    canClose = false;
    if (willOpen) setTimeout(() => canClose = true, OPEN_DELAY);
  }

  /* --- CAPTURAMOS el click del botón antes que AdminLTE --- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-widget="pushmenu"]');
    if (!btn) return;

    if (isMobile()) {
      // Bloquea completamente el handler de AdminLTE en móvil
      e.preventDefault();
      e.stopPropagation();
      // stopImmediatePropagation evita otros listeners en el mismo target
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();

      setOpen(); // nuestro toggle overlay
    }
    // En desktop no hacemos nada: dejar que AdminLTE maneje el botón
  }, true); // <-- FASE DE CAPTURA

  // Click fuera (cierra en móvil)
  document.addEventListener('click', (e) => {
    if (!isMobile()) return;
    if (!document.body.classList.contains('sidebar-open')) return;
    if (!canClose) return;

    const enSidebar = !!e.target.closest('.main-sidebar');
    const enBoton   = !!e.target.closest('[data-widget="pushmenu"]');
    if (!enSidebar && !enBoton) setOpen(false);
  });

  // Backdrop (si lo estás usando)
  backdrop?.addEventListener('click', () => {
    if (isMobile() && canClose) setOpen(false);
  });

  // ESC para cerrar
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && isMobile()) setOpen(false);
  });

  // Reset al volver a desktop
  addEventListener('resize', () => {
    if (!isMobile()) document.body.classList.remove('sidebar-open');
  });

})();

// ======================== MODAL HISTORIAL DE TAREAS =============================

// Datos demo (sustituye por lo que devuelva tu API)
const historialEventos = [
  {
    fecha: '2025-08-14 09:32',
    usuario: 'Kevin de León',
    accion: 'Actualizó estado',
    estado: 'En proceso',
    detalle: 'Estado Troquel pasó de "Pendiente" a "En proceso".'
  },
  {
    fecha: '2025-08-14 08:10',
    usuario: 'Salva',
    accion: 'Añadió comentario',
    estado: 'Pendiente',
    detalle: 'Se solicitó revisar medidas del paletizado.'
  },
  {
    fecha: '2025-08-13 16:25',
    usuario: 'Juan de León',
    accion: 'Adjuntó archivo',
    estado: 'Completada',
    detalle: 'Se adjuntó PDF de troquel actualizado.'
  }
];

function badgeClase(estado) {
  const e = (estado || '').toLowerCase();
  if (e.includes('completa')) return 'badge-completada';
  if (e.includes('proceso'))  return 'badge-proceso';
  return 'badge-pendiente';
}

function renderHistorial(filtro = '') {
  const ul = document.getElementById('listaHistorial');
  const resumen = document.getElementById('resumenHistorial');
  const f = filtro.trim().toLowerCase();

  const filtrados = historialEventos.filter(ev => {
    const blob = `${ev.fecha} ${ev.usuario} ${ev.accion} ${ev.estado} ${ev.detalle}`.toLowerCase();
    return blob.includes(f);
  });

  if (ul) {
    ul.innerHTML = filtrados.map(ev => `
    <li class='timeline-item'>
      <span class='dot'></span>
      <div class='title'>${ev.accion} <span class='badge-state ${badgeClase(ev.estado)}'>${ev.estado}</span></div>
      <div class='meta'>
        <span><i class='fa-regular fa-clock'></i> ${ev.fecha}</span>
        <span><i class='fa-regular fa-user'></i> ${ev.usuario}</span>
      </div>
      ${ev.detalle ? `<div class='desc'>${ev.detalle}</div>` : ''}
    </li>
  ` ).join('');
    resumen.textContent = `${filtrados.length} evento${filtrados.length !== 1 ? 's' : ''}`;
  } 
}

// Filtro
document.addEventListener('DOMContentLoaded', () => {
  renderHistorial();
  const input = document.getElementById('buscarHistorial');
  const btnClear = document.getElementById('btnLimpiarFiltro');

  if (input) {
    input.addEventListener('input', () => renderHistorial(input.value));
  }

  if(btnClear){
    btnClear.addEventListener('click', () => { input.value = ''; renderHistorial(''); });
  }
});

// Si prefieres abrir y renderizar al mostrar modal (BS4 jQuery):
$('#modalHistorial').on('shown.bs.modal', function () {
  renderHistorial(document.getElementById('buscarHistorial').value || '');
});

// BS5 (sin jQuery):
// document.getElementById('modalHistorial').addEventListener('shown.bs.modal', () => renderHistorial(document.getElementById('buscarHistorial').value || ''));

// ======================== FIN MODAL HISTORIAL DE TAREAS =============================


// ======================== EDICION DE CAMPOS EN DISEÑO ESTRUCTURAL =================== 

// ===== Toast simple =====
function mostrarToast(tipo, mensaje){
  var area = document.getElementById('toastArea');
  if(!area){ alert(mensaje || 'Operación realizada'); return; }
  var colores = { success:'bg-success text-white', info:'bg-info text-white', warning:'bg-warning text-dark', danger:'bg-danger text-white' };
  var clase = colores[tipo] || colores.info;
  var el = document.createElement('div');
  el.className = 'toast ' + clase;
  el.setAttribute('role','alert'); el.setAttribute('aria-live','assertive'); el.setAttribute('aria-atomic','true');
  el.innerHTML = '\n    <div class="toast-body d-flex align-items-center justify-content-between">\n      <span>' + (mensaje || "Operación realizada") + '</span>\n      <button type="button" class="ml-3 close text-white" data-dismiss="toast" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n  ';
  area.appendChild(el);
  if(typeof $ === 'function' && $.fn && typeof $.fn.toast === 'function'){
    $(el).toast({ delay:3000 }).on('hidden.bs.toast', function(){ el.remove(); }).toast('show');
  } else {
    el.style.opacity = '1'; setTimeout(function(){ el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(function(){ el.remove(); }, 300); }, 3000);
  }
}

// ===== Construir control según atributos =====
function crearControlEdicion(td){
  var valor = (td.textContent || '').trim();
  var tipo = (td.dataset.tipo || 'texto').toLowerCase();
  var opciones = (td.dataset.opciones || '').trim();
  var control;
  if(opciones){
    control = document.createElement('select');
    control.className = 'form-control form-control-sm';
    opciones.split(',').map(function(v){ return v.trim(); }).forEach(function(op){
      var opt = document.createElement('option'); opt.value = op; opt.textContent = op; if(op.toLowerCase() === valor.toLowerCase()) opt.selected = true; control.appendChild(opt);
    });
  } else if(tipo === 'textarea'){
    control = document.createElement('textarea'); control.className = 'form-control form-control-sm'; control.rows = 3; control.value = valor;
  } else {
    control = document.createElement('input'); control.className = 'form-control form-control-sm'; control.type = (tipo === 'numero') ? 'number' : 'text'; control.value = valor;
  }
  return control;
}

function activarEdicion(seccionId){
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  cont.querySelectorAll('[data-campo]').forEach(function(td){
    td.dataset.original = (td.textContent || '').trim();
    if(td.dataset.editando === '1') return;
    var control = crearControlEdicion(td); td.innerHTML = ''; td.appendChild(control); td.dataset.editando = '1';
  });
  toggleBotones(seccionId, true);
}

function guardarSeccion(seccionId){
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  var datos = {}; var cambios = 0;
  cont.querySelectorAll('[data-campo]').forEach(function(td){
    var original = (td.dataset.original || '').trim();
    var input = td.querySelector('input, textarea, select');
    var valor = input ? (input.value || '').trim() : (td.textContent || '').trim();
    if(valor !== original) cambios++;
    td.textContent = valor; td.dataset.editando = '0'; datos[td.dataset.campo] = valor;
  });
  toggleBotones(seccionId, false);
  mostrarToast('success', cambios ? ('Guardado (' + cambios + ' cambio' + (cambios!==1?'s':'') + ')') : 'Sin cambios');
  console.log('Datos guardados (front):', seccionId, datos);
}

function cancelarSeccion(seccionId){
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  cont.querySelectorAll('[data-campo]').forEach(function(td){
    var original = (td.dataset.original || '').trim();
    td.textContent = original; td.dataset.editando = '0';
  });
  toggleBotones(seccionId, false);
  mostrarToast('info', 'Edición cancelada');
}

function toggleBotones(seccionId, editando){
  var headerBtn = document.querySelector('.acciones-seccion .btn-editar[data-seccion="' + seccionId + '"]');
  if(!headerBtn) return;
  var header = headerBtn.closest('.acciones-seccion');
  var btnEditar = header.querySelector('.btn-editar[data-seccion="' + seccionId + '"]');
  var btnGuardar = header.querySelector('.btn-guardar[data-seccion="' + seccionId + '"]');
  var btnCancelar = header.querySelector(' .btn-cancelar[data-seccion="' + seccionId + '"]');
  if(editando){
    if(btnEditar) btnEditar.classList.add('d-none');
    if(btnGuardar) btnGuardar.classList.remove('d-none');
    if(btnCancelar) btnCancelar.classList.remove('d-none');
  } else {
    if(btnEditar) btnEditar.classList.remove('d-none');
    if(btnGuardar) btnGuardar.classList.add('d-none');
    if(btnCancelar) btnCancelar.classList.add('d-none');
  }
}

// Delegación de eventos (una sola vez)
if(!window.__secciones_editables_bind){
  window.__secciones_editables_bind = true;
  document.addEventListener('click', function(e){
    var be = e.target.closest('.btn-editar');
    var bg = e.target.closest('.btn-guardar');
    var bc = e.target.closest('.btn-cancelar');
    if(be) activarEdicion(be.dataset.seccion);
    if(bg) guardarSeccion(bg.dataset.seccion);
    if(bc) cancelarSeccion(bc.dataset.seccion);
  });
}

// ======================== FIN EDICION DE CAMPOS EN DISEÑO ESTRUCTURAL ===================


// ======================== FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =================

// ======= Datos → DOM (render desde arrays) =======
function tdLabelDS(txt, extra){
  return `<td class='text-bold td-fonts ${extra || ""}'>${txt}</td>`;
}

function tdValorDS(f, opts){
  opts = opts || {};
  const classes = `td-fonts${(f.justificar || opts.justificar) ? ' text-justify' : ''}`;
  const attrs = [`class='${classes}'`, `data-campo='${f.campo}'`];

  if (f.opciones) {
    attrs.push(`data-opciones='${Array.isArray(f.opciones) ? f.opciones.join(',') : f.opciones}'`);
  }
  if (f.tipo) attrs.push(`data-tipo='${f.tipo}'`);

  const colspan = f.colspan || opts.colspan;
  if (colspan) attrs.push(`colspan='${colspan}'`);

  const valor = (f.valor != null ? String(f.valor) : '');
  return `<td ${attrs.join(' ')}>${valor}</td>`;
}

function pintarTablaDesdeArray(seccionId, data){
  const cont = document.querySelector(`[data-seccion-target='${seccionId}']`);
  if(!cont) return;
  const tbody = cont.querySelector('tbody');
  if(!tbody) return;

  // Permitir dos formatos
  const isFlat = Array.isArray(data) && data.length > 0 && !Array.isArray(data[0]);
  let filas = [];

  if(isFlat){
    for(let i=0; i<data.length; i++){
      const a = data[i];
      if(a && (a.fullWidth || a.colspan)){
        filas.push([a]);
        continue;
      }
      let b = null;
      if(i+1 < data.length){
        const next = data[i+1];
        if(next && !(next.fullWidth || next.colspan)){
          b = next; i++;
        }
      }
      filas.push([a, b]);
    }
  } else {
    filas = data || [];
  }

  const html = filas.map(row => {
    if(!Array.isArray(row) || row.length === 0) return '';
    if(row.length === 1 && (row[0].fullWidth || row[0].colspan)){
      const f = row[0];
      return `<tr>${tdLabelDS(f.label, 'col-title')}${tdValorDS(f, {colspan:3, justificar:true})}</tr>`;
    } else {
      const left = row[0] || {};
      const right = row[1] || null;
      let s = `<tr>${tdLabelDS(left.label || '')}${tdValorDS(left)}`;
      if(right){ 
        s += `${tdLabelDS(right.label || '')}${tdValorDS(right)}`; 
      } else { 
        s += '<td></td><td></td>'; 
      }
      s += '</tr>'; 
      return s;
    }
  }).join('');

  tbody.innerHTML = html;
}

// ======================== FIN FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =================

// ---- Datos iniciales (mismo contenido que tu HTML actual) ---- 
// Clase petición para manejar los datos de diseño estructural

var PETICION = { 
  'id': '238923',  
  'proyectos': [
    { 
      'id': '1', 
      'nombre': 'Proyecto A', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'3221' 
            },
            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'31231312' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'81231236048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel', 
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500', 
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Contraencolado' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3432 Desc: TBIN160 SI 165 K 250 SI 165 K 250' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'F Minimicro 1,1mm' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 
              'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 1.' 
            },
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:', 
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    }, 

    { 
      'id': '2', 
      'nombre': 'Proyecto B', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 
              'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'645645' 
            },

            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'874574' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'86048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel',
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500',
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Contraencolado' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3432 Desc: TBIN160 SI 165 K 250 SI 165 K 250' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'L+F' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 2.' 
            },
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:',
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    }, 

    { 
      'id': '3', 
      'nombre': 'Proyecto A', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'3221' 
            },
            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'31231312' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'81231236048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel', 
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500', 
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Contraencolado' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3323 Desc: TBIN13232 SI 132 K 2320 SI 16325 K 230' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'L+F' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 
              'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 3.' 
            },
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:', 
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    }, 

    { 
      'id': '4', 
      'nombre': 'Proyecto A', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'3221' 
            },
            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'31231312' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'81231236048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel', 
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500', 
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Cartoncillo' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3093 Desc: TBIN323888 SI 132 K 3578 SI 13474 K 242' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'L+F' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 
              'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 4.' 
            },
            
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:', 
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    }, 

    { 
      'id': '5', 
      'nombre': 'Proyecto A', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'3221' 
            },
            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'31231312' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'81231236048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel', 
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500', 
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Cartoncillo' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3323 Desc: TBIN13232 SI 132 K 2320 SI 16325 K 230' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'L+F' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 
              'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 5.' 
            },
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:', 
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    },

    { 
      'id': '6', 
      'nombre': 'Proyecto A', 
      'estado': 'En proceso', 
      'fecha': '2025-08-01',
      'piezas': [
        { 
          'id': '1', 
          'nombre': 'Pieza 1',
          'estado': 'Completada', 
          'fecha': '2025-08-02',
          'DATA_DISENO_ESTRUCTURAL': [
            { 'label':'N° Muestra:', 
              'campo':'numero_muestra', 
              'valor':'3221' 
            },
            { 
              'label':'N° Troquel:', 
              'campo':'numero_troquel', 
              'valor':'31231312' 
            },
            { 
              'label':'Estado Muestra:', 
              'campo':'estado_muestra', 
              'valor':'No iniciada', 
              'opciones': ['No iniciada','Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Estado Troquel:', 
              'campo':'estado_troquel', 
              'valor':'Pendiente', 
              'opciones':['Pendiente','En proceso','Completado'] 
            },
            { 
              'label':'Asignado:', 
              'campo':'asignado', 
              'valor':'Salva' 
            },
            { 
              'label':'Proveedor:', 
              'campo':'proveedor', 
              'valor':'Jose De León' 
            }
          ],

          'DATA_DATOS_TROQUEL': [
            { 
              'label':'Bloquea/Anula Troquel:', 
              'campo':'bloquea_anula_troquel', 
              'valor':'81231236048', 
              'tipo':'numero' 
            },
            { 
              'label':'Comparte Troquel:', 
              'campo':'comparte_troquel', 
              'valor':'No', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Existe Troquel:', 
              'campo':'existe_troquel', 
              'valor':'Sí', 
              'opciones':['Sí','No'] 
            },
            { 
              'label':'Ficha Anular:', 
              'campo':'ficha_anular', 
              'valor':'8382500', 
              'tipo':'numero' 
            },
            { 
              'label':'Paletizado Troquel:', 
              'campo':'paletizado_troquel', 
              'valor':'Cajas por palet: 18, medida palet: 80x120, caja agrupadora: no, unidades por paquete: 700, unidades base: 6, unidades altura: 3, paquetes volteados: 2, observaciones paletizado: REEMB.C 400X400X330 (700), altura palet: 125.', 
              'tipo':'textarea', 
              'fullWidth': true 
            },
            { 
              'label':'Obs. específicas empaque:', 
              'campo':'obs_especificas_empaque', 
              'valor':'Revisar paletizado huevera (cambia dimensiones) / paletizado estuche es igual que FF 8382500', 
              'tipo':'textarea', 
              'fullWidth': true 
            }
          ], 

          'DATA_PROPIEDADES': [
            { 
              'label':'Identificador:', 
              'campo':'identificador', 
              'valor':'Estuche' 
            },
            { 
              'label':'Tipo Papel:', 
              'campo':'tipo_papel', 
              'valor':'Contraencolado' 
            },
            { 
              'label':'Calidad:', 
              'campo':'calidad', 
              'valor':'Cod: 3323 Desc: TBIN13232 SI 132 K 2320 SI 16325 K 230' 
            },
            { 
              'label':'Canal:', 
              'campo':'canal', 
              'valor':'L+F' 
            },
            { 
              'label':'Calidad Cllo:', 
              'campo':'calidad_cillo', 
              'valor':'COD: 973, DESC: CKE200' 
            },
            { 
              'label':'Modelo Fefco:', 
              'campo':'modelo_fefco', 
              'valor':'713' 
            },
            { 
              'label':'Rejillas:', 
              'campo':'rejillas', 
              'valor':'Incorporadas' 
            },
            { 
              'label':'Referencia:', 
              'campo':'referencia', 
              'valor':'Referencia del proyecto No 6.' 
            },
            { 
              'label':'Pegado:', 
              'campo':'pegado', 
              'valor':'Fondo automático' 
            },
            { 
              'label':'Ficha Técnica de Laboratorio:', 
              'campo':'ficha_tecnica_lab', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Alimento en contacto con envase:', 
              'campo':'alimento_contacto', 
              'valor':'No', 
              'opciones': ['Sí','No'] 
            },
            { 
              'label':'Complemento y asa:', 
              'campo':'complemento_asa', 
              'valor':'Complemento' 
            },
            { 
              'label':'Tipo FSC:', 
              'campo':'tipo_fsc', 
              'valor':'FSC reciclado' 
            }
          ],
        }, 
      ]
    }, 

  ], 
}; 

// --- Selección de proyecto/pieza desde la URL (fallbacks seguros) ---
function obtenerProyectoYPieza() {
  const qs = new URLSearchParams(location.search);
  const idProyecto = qs.get('id');                  // viene de la lista
  const idxPieza   = parseInt(qs.get('pieza')||'0', 10) || 0;

  // 1) Buscar por id si viene en la URL
  let proy = PETICION.proyectos.find(p => String(p.id) === String(idProyecto));

  // 2) Si no hay id o no existe, usar el primero disponible
  if (!proy) proy = PETICION.proyectos[0];

  // 3) Pieza (por ahora 0 si no se indica)
  const pieza = (proy && Array.isArray(proy.piezas) && proy.piezas[idxPieza]) || proy.piezas[0];

  return { proy, pieza };
}

document.addEventListener('DOMContentLoaded', function () {
  const ctx = obtenerProyectoYPieza();
  if (!ctx || !ctx.pieza) return;

  // Ahora sí: pintar cada sección con los arrays correctos
  pintarTablaDesdeArray('diseno-estructural', ctx.pieza.DATA_DISENO_ESTRUCTURAL || []);
  pintarTablaDesdeArray('datos-troquel',      ctx.pieza.DATA_DATOS_TROQUEL      || []);
  pintarTablaDesdeArray('propiedades',        ctx.pieza.DATA_PROPIEDADES        || []);
});

// ======================== FIN FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =============

// Helpers
function getVal(arr, campo, fallback){
  const f = (arr || []).find(x => x.campo === campo);
  return f ? f.valor : (fallback ?? '—');
}

function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}

function tdPar(label, valor){
  const v = esc(valor);
  return `
    <td class='text-bold td-fonts'>${esc(label)}</td>
    <td class='td-fonts' title='${v}'>${v}</td>
  `;
}
/* =========================
   HELPERS BÁSICOS
========================= */
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m])); }
function getVal(arr, campo, fallback){
  const f = (arr || []).find(x => x.campo === campo);
  return f ? f.valor : (fallback ?? '—');
}

/* =========================
   TARJETA CELESTE (Texto EXACTO)
========================= */
const CARD_CELESTE_SNIPPET = `
<div class='col-md-6 col-12 mb-4'>
  <div class='card card-info shadow-sm'>
    <div class='card-header text-center'>
      <h5>Diseño Gráfico</h5>
    </div>
    <div class='table table-responsive card-body p-0'>
      <table class='table table-striped mb-0'>
        <tbody>
          <tr>
            <td class='text-bold td-fonts'>N° Boceto:</td><td class='td-fonts'>345345</td>
            <td class='text-bold td-fonts'>N° Impresión:</td><td class='td-fonts'>234424</td>
          </tr>
          <tr>
            <td class='text-bold td-fonts'>Estado:</td><td class='td-fonts'>No iniciada</td>
            <td class='text-bold td-fonts'>Impresión:</td><td class='td-fonts'>Digital</td>
          </tr>
          <tr>
            <td class='text-bold td-fonts'>FSC Impreso:</td><td class='td-fonts'>No</td>
            <td class='text-bold td-fonts'>Asignado:</td><td class='td-fonts'>Juan De León</td>
          </tr>
        </tbody>
      </table>
      <div class='text-center'>
        <button type='button' onclick='redireccionPagina("grafico_detalle")' class='m-3 btn btn-info pb-2 pt-2' style=''font-size: 18px;'>
          Ver detalles y tareas <i class='fa-solid fa-chevron-right'></i>
        </button>
      </div>
    </div>
  </div>
</div>
`;

/* =========================
  TARJETAS ROJA + CELESTE (por proyecto) 
========================= */
function tdPar(label, valor){
  const v = esc(valor);
  return `
    <td class='text-bold td-fonts'>${esc(label)}</td>
    <td class='td-fonts' title='${v}'>${v}</td>
  `;
}

function renderProyectosEstructuralYGraficoFijo(peticion){
  const host = document.getElementById('lista-proyectos-estructural');
  if(!host) return;

  const proyectos = (peticion && Array.isArray(peticion.proyectos)) ? peticion.proyectos : [];
  let html = '';

  proyectos.forEach((proy, idx) => {
    const pieza = (proy.piezas && proy.piezas[0]) ? proy.piezas[0] : null;
    if(!pieza) return;

    const ds = pieza.DATA_DISENO_ESTRUCTURAL || [];
    const nMuestra  = getVal(ds, 'numero_muestra');
    const nTroquel  = getVal(ds, 'numero_troquel');
    const eMuestra  = getVal(ds, 'estado_muestra');
    const eTroquel  = getVal(ds, 'estado_troquel');
    const asignado  = getVal(ds, 'asignado');
    const proveedor = getVal(ds, 'proveedor');
    const redImg    = idx % 2 === 0 ? '/assets/ard.png'    : '/assets/troquel.png';
    const blueImg   = idx % 2 === 0 ? '/assets/nestle.png' : '/assets/palet.png';

    html += `
    <div class='grupo-disenos mb-4 mt-5'>
      <h2><span class='badge badge-secondary'>Proyecto No. ${esc(idx+1)}</span></h2>
      <div class='row stack-below-xl mt-3'>
        <div class='col-xl-6 col-12'>
          <div class='card card-danger shadow-sm equal-h-xl-420'>
            <div class='card-header text-center'><h5>Diseño Estructural</h5></div>
            <div class='table-responsive'>
              <table class='table table-striped mb-0'><tbody>
                <tr>${tdPar('N° Muestra:', nMuestra)}${tdPar('N° Troquel:', nTroquel)}</tr>
                <tr>${tdPar('Estado Muestra:', eMuestra)}${tdPar('Estado Troquel:', eTroquel)}</tr>
                <tr>${tdPar('Asignado:', asignado)}${tdPar('Proveedor:', proveedor)}</tr>
              </tbody></table>
              <div class='text-center'>
                <button type='button' onclick='redireccionPagina("estructural_detalle", "${esc(proy.id)}")' class='mt-2 btn btn-danger pb-2 pt-2' style='font-size:16px; margin-bottom:20px;'>
                  Ver detalles y tareas <i class='fa-solid fa-chevron-right'></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class='col-xl-6 col-12'>
          <div class='card shadow-sm equal-h-xl-420'>
            <div class='card-body p-0'>
              <div class='fp-canvas card-outline-cut card-outline-dashed' style='position:relative; overflow:hidden; border-radius:12px;'>
                <img src='${esc(redImg)}' alt='Vista previa de diseño estructural' style='position:absolute; inset:12px; width:calc(100% - 24px); height:calc(100% - 24px); object-fit:contain; border-radius:8px;'>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='row stack-below-xl'>
        ${CARD_CELESTE_SNIPPET}
        <div class='col-md-6 col-12'>
          <div class='card shadow-sm equal-h-xl-420'>
            <div class='card-body p-0'>
              <div class='fp-canvas card-outline-cut card-outline-dashed' style='position:relative; overflow:hidden; border-radius:12px;'>
                <img src='${esc(blueImg)}' alt='Vista previa de diseño gráfico' style='position:absolute; inset:12px; width:calc(100% - 24px); height:calc(100% - 24px); object-fit:contain; border-radius:8px;'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }); 
  host.innerHTML = html;
}

/*===========================================================
  CONTENEDOR EXCLUSIVO PARA LA COMPARACIÓN (no borra tarjetas)
===========================================================*/

function asegurarContenedorComparacion() {
  let host = document.getElementById('comparacion-calidad');
  if (!host) {
    host = document.createElement('div');
    host.id = 'comparacion-calidad';
    host.className = 'mt-4';
    const anchor = document.getElementById('lista-proyectos-estructural');
    if (anchor) anchor.insertAdjacentElement('afterend', host);
    else (document.querySelector('.card-body') || document.body).appendChild(host);
  }
  return host;
}

/* =========================
  AGRUPACIÓN DE CALIDADES
========================= */
function normalizarClaveCalidad(s) {
  return String(s || '')
    .replace(/\s+/g,' ')
    .trim(); // clave estable
}

function recolectarCalidades(peticion){
  const items = [];
  const proyectos = (peticion && peticion.proyectos) || [];
  proyectos.forEach((proy, pIdx) => {
    const pieza = (proy.piezas && proy.piezas[0]) || null;
    if(!pieza) return;
    const props = pieza.DATA_PROPIEDADES || [];
    const calidad = getVal(props, 'calidad', '');
    if(!calidad) return;
    items.push({
      proyectoIndex: pIdx + 1,
      proyectoNombre: proy.nombre || `Proyecto ${pIdx+1}`,
      piezaNombre: pieza.nombre || 'Pieza',
      calidad,
      key: normalizarClaveCalidad(calidad)
    });
  });
  return items;
}

function construirGruposCalidad(peticion){
  const items = recolectarCalidades(peticion);
  const mapa = new Map();
  items.forEach(it => {
    if(!mapa.has(it.key)) mapa.set(it.key, { key: it.key, calidad: it.calidad, items: [] });
    mapa.get(it.key).items.push(it);
  });

  // Ordenar: primero los grupos con más elementos
  const grupos = Array.from(mapa.values()).sort((a,b) => b.items.length - a.items.length);

  // Exponer objeto con array por grupo (clave = calidad normalizada)
  const obj = {};
  grupos.forEach(g => { obj[g.key] = g.items.slice(); });
  window.CALIDAD_GROUPS_OBJ = obj;

  return {
    grupos,
    totales: {
      totalCalidades: items.length,
      grupos: grupos.length,
      coincidencias: grupos.filter(g => g.items.length >= 2).length,
      unicas: grupos.filter(g => g.items.length === 1).length
    }
  };
}
 
/* =========================
  INICIALIZACIÓN
========================= */
document.addEventListener('DOMContentLoaded', function() {
  // 1) Tarjetas por proyecto (roja/celeste)
  if (typeof PETICION !== 'undefined') {
    renderProyectosEstructuralYGraficoFijo(PETICION);
  } 
});


// ========================= CREAR PROYECTO EN AS400 - FEATURE ARRASTRAR =========================
// ======= refs


document.addEventListener('DOMContentLoaded', () => {
  const LEFT  = document.querySelector('#todo-left');
  const RIGHT = document.querySelector('#todo-right');
  if (!LEFT || !RIGHT) return;                 // esta página no usa DnD

  if (window.__as400DnDInitialized) return;    // evita doble init
  window.__as400DnDInitialized = true;

  function boot() {
    // arriba, junto a tus refs

    function playDropAnimation(li){
      // reinicia la animación si se repite
      li.classList.remove('anim-drop');
      // fuerza reflow
      void li.offsetWidth;
      li.classList.add('anim-drop');

      const title = li.querySelector('.item-title');
      if (title){
        title.classList.remove('anim-title');
        void title.offsetWidth;
        title.classList.add('anim-title');
      }
    }

    const root = document.documentElement;
    const updateDragSide = (toEl) => {
      root.classList.toggle('drag-over-right', toEl === right);
      root.classList.toggle('drag-over-left',  toEl === left);
    };
    const lists = document.querySelectorAll('.drop-target');
    const clearHover = () => lists.forEach(ul => ul.classList.remove('is-hover'));
    const left  = document.getElementById('todo-left');
    const right = document.getElementById('todo-right');
    const selBadge = document.getElementById('sel-count');

    // ======= helpers visuales (cambio de fondo)
    function applyRightStyle(li) {           // estilo cuando está en la DERECHA
      li.classList.add('in-right');
    }

    let draggingEl = null;
    const setDragPreview = (toEl) => {
      if (!draggingEl) return;
      if (toEl === right) draggingEl.classList.add('preview-right');
      else draggingEl.classList.remove('preview-right');
    };

    function restoreLeftStyle(li) {          // recuperar estilo al volver a la IZQUIERDA
      li.classList.remove('in-right');
    }

    // ======= estado vacío / contador
    function refreshEmptyStates() {
      left.classList.toggle('is-empty',  left.querySelectorAll(':scope > li').length === 0);
      right.classList.toggle('has-items', right.querySelectorAll(':scope > li').length > 0); // oculta “+AS400”
    }

    function updateCount() {
      const n = right.querySelectorAll(':scope > li').length;
      selBadge.textContent = n;
      refreshEmptyStates();

      // 👇 Ocultar/mostrar el hint según haya elementos
      const dropHint = document.getElementById('drop-hint');
      if (dropHint) dropHint.style.display = n > 0 ? 'none' : 'block';

      document.querySelector('.drag-fab')?.classList.toggle('d-none', n > 0);
    }

    // ======= mover de vuelta con la “X”
    function moveBackToLeft(li) {
      li.querySelector('.remove-btn')?.remove();
      restoreLeftStyle(li);
      left.appendChild(li);
      updateCount();
    }

    // ======= botón “quitar” en items de la derecha
    function addRemoveButton(li) {
      if (li.querySelector('.remove-btn')) return;
      const tools = li.querySelector('.tools') || li.appendChild(document.createElement('div'));
      tools.classList.add('tools');

      const btn = document.createElement('i');
      btn.className = 'fas fa-times text-danger ml-2 remove-btn';
      btn.title = 'Quitar de la selección';
      btn.addEventListener('click', () => moveBackToLeft(li));
      tools.appendChild(btn);
    }

    // ================== SORTABLES ==================
    const fab = document.querySelector('.drag-fab');
    const COMMON = {
      group: { name: 'todos', pull: true, put: true },
      draggable: 'li',
      handle: null,                 // arrastrar desde cualquier parte
      animation: 150,
      forceFallback: true,          // drag más “firme” que el nativo
      fallbackOnBody: true,
      fallbackTolerance: 2,         // no exige mover mucho para iniciar
      filter: '.tools, .remove-btn, input, label, a, button', // 👈 SIN .badge
      preventOnFilter: true
    };

    // ===== IZQUIERDA
    Sortable.create(left, {
      ...COMMON,
      sort: false,
      onStart: (evt) => {
        draggingEl = evt.item;
        right.classList.add('is-active');
        fab?.classList.add('is-dragging');
        updateDragSide(evt.from);
        setDragPreview(evt.from);                 // 👈 NUEVO
      },
      onAdd: (evt) => {
        const el = evt.item;
        el.querySelector('.remove-btn')?.remove();
        restoreLeftStyle(el);
        updateCount();
      },
      onRemove: updateCount,
      onMove: (evt) => {
        clearHover();
        evt.to.classList.add('is-hover');
        updateDragSide(evt.to);
        setDragPreview(evt.to);                   // 👈 NUEVO
      },
      onEnd: () => {
        right.classList.remove('is-active');
        fab?.classList.remove('is-dragging');
        clearHover();
        root.classList.remove('drag-over-right', 'drag-over-left');
        draggingEl?.classList.remove('preview-right'); // 👈 NUEVO (limpia)
        draggingEl = null;
      },
    });

    // ===== DERECHA
    Sortable.create(right, {
      ...COMMON,
      sort: true,
      onStart: (evt) => {
        draggingEl = evt.item;
        right.classList.add('is-active');
        fab?.classList.add('is-dragging');
        updateDragSide(evt.from);
        setDragPreview(evt.from);                 // 👈 NUEVO
      },
      onAdd: (evt) => {
        const el = evt.item;
        applyRightStyle(el);
        addRemoveButton(el);
        playDropAnimation(el);  
        updateCount();
      },
      onSort:  updateCount,
      onRemove:updateCount,
      onMove: (evt) => {
        clearHover();
        evt.to.classList.add('is-hover');
        updateDragSide(evt.to);
        setDragPreview(evt.to);                   // 👈 NUEVO
      },
      onEnd: () => {
        right.classList.remove('is-active');
        fab?.classList.remove('is-dragging');
        clearHover();
        root.classList.remove('drag-over-right', 'drag-over-left');
        draggingEl?.classList.remove('preview-right'); // 👈 NUEVO (limpia)
        draggingEl = null;
      },
    });

    // Botón: vaciar → devolver todos a la izquierda
    document.getElementById('btn-clear')?.addEventListener('click', () => {
      [...right.querySelectorAll(':scope > li')].forEach(li => moveBackToLeft(li));
      updateCount();
    });

    // Botón: crear proyecto → ids seleccionados
    document.getElementById('btn-create')?.addEventListener('click', () => {
      const seleccion = [...right.querySelectorAll(':scope > li')].map(li => li.dataset.id);
      if (seleccion.length === 0) {
        alert('Añade al menos un elemento.');
      } else {
        alert('Listo. Enviaríamos al AS/400: ' + seleccion.join(', '));
        // fetch('/api/proyecto', { method:'POST', headers:{'Content-Type':'application/json'},
        // body: JSON.stringify({ elementos: seleccion }) });
      }
    });

    // ---- Normaliza el estado inicial por si ya hay items en la derecha al cargar
    (function normalizeInitialStyles(){
      right.querySelectorAll(':scope > li').forEach(applyRightStyle);
      left .querySelectorAll(':scope > li').forEach(restoreLeftStyle);
    })();

    // Estado inicial
    updateCount();

    // ==== helpers
    function getProp(arr, campo){
      const it = (arr || []).find(x => x.campo === campo);
      return it ? it.valor : '—';
    }

    // ==== render como LISTA (viñetas)
    function renderLeftFromJson(PETICION){
      const left = document.getElementById('todo-left');
      left.innerHTML = '';

      PETICION.proyectos.forEach(proy => {
        (proy.piezas || []).forEach(pieza => {
          const props   = pieza.DATA_PROPIEDADES || [];
          const tipo    = getProp(props, 'tipo_papel');
          const calidad = getProp(props, 'calidad');
          const canal   = getProp(props, 'canal');
          const ref     = getProp(props, 'referencia');

          const li = document.createElement('li');
          li.dataset.id = `${proy.id}-${pieza.id}`;

          li.innerHTML = `
    
            <div class='item-main fadeInUp-animation'> 
              <div class='item-title'>${proy.nombre} — ${pieza.nombre}</div>
              <ul class='kv-list'>
                <li><strong>Tipo de papel:</strong> ${tipo}</li>
                <li><strong>Calidad:</strong> ${calidad}</li>
                <li><strong>Canal:</strong> ${canal}</li>
                <li><strong>Referencia:</strong> ${ref}</li>
              </ul>
            </div>

            <div class='tools'></div>
          `;

          document.getElementById('todo-left').appendChild(li);
        });
      });

      // si usas placeholders/contadores
      if (typeof refreshEmptyStates === 'function') refreshEmptyStates();
    }

    // Llamada inicial
    renderLeftFromJson(PETICION);
  }

  if (window.Sortable) {
    boot();
  } else {
    const s = document.createElement('script');
    s.src   = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js';
    s.defer = true;
    s.onload = boot;
    document.head.appendChild(s);
  }
}); 

const todoRight = document.getElementById('todo-right');
const dropHint = document.getElementById('drop-hint');

 
// ========================= FIN CREAR PROYECTO EN AS400 - FEATURE ARRASTRAR ======================
 

// ======================== FETCHES API LISTADO DE CLIENTES POR COMERCIAL =========================

// SCRIPT CLIENTES (igual)
let listadoClientes = [];
async function getListadoClientesComercial() { 
  const url = `${API_BASE_URL}test/clientes/pnadal`; 
  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result = await response.json();
    console.log('📊 Respuesta JSON:', result);
    listadoClientes = result;
 
  } catch (error) {
    console.error('❌ Error en getData:', error); 
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('tabla-clientes');
  if (!contenedor) return;

  clientes.forEach(cliente => {
    const inicial = cliente.nombre.trim().charAt(0).toUpperCase();

    const fila = `
      <tr style='cursor: pointer;'>
        <td class='col-cliente'>
          <div class='d-flex align-items-center'>
            <div class='avatar-circle mr-3'>${inicial}</div>
            <div>
              <div class='font-weight-bold info-destacada'>${cliente.nombre}</div>
            </div>
          </div>
        </td>
        <td class='col-codigo'>
          <div class='info-destacada'>${cliente.codigo}</div>
        </td>
        <td class='col-acciones'>
          <button class='btn btn-sm btn-primary'><i class='fas fa-search'></i></button>
          <button class='btn btn-sm btn-info'><i class='fas fa-edit'></i></button>
          <button class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i></button>
        </td>
      </tr>
    `;
    contenedor.insertAdjacentHTML('beforeend', fila);
  });
});

getListadoClientesComercial();


// ========================= FIN FETCHES API ===================