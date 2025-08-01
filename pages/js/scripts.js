// ==================== VARIABLES Y FUNCIONES GLOBALES ====================

const departamentos = ['Departamento Interno', "Departamento Externo"];
function guardarTabActivo(tabHref) {
    localStorage.setItem('tab-activo', tabHref);
}

window.addEventListener("load", function () {
    setTimeout(() => {
        const loader = document.getElementById("loaderContainer");
        if (loader) loader.style.display = "none";
    }, 500); 
});

function redireccionPagina(pagina){
    switch (pagina) {

        // Vistas de Estructural

        case 'detalle_cliente':
            window.location.href = '/pages/detalle_cliente.html'; 
        break;

        case 'estructural_detalle':
            window.location.href = '/pages/estructural_detalle.html';
        break;

        case 'grafico_detalle':
            window.location.href = '/pages/grafico_detalle.html';
        break;

        case 'tareas_maqueta':
            window.location.href = '/pages/tareas_maqueta.html';
        break;

        case 'tareas_paletizado':
            window.location.href = '/pages/tareas_paletizado.html';
        break;

        case 'tareas_muestra_forrada':
            window.location.href = '/pages/tareas_muestra_forrada.html';
        break;

        case 'tareas_revision_troqueles':
            window.location.href = '/pages/tareas_revision_troqueles.html';
        break;

        case 'tareas_trazados':
            window.location.href = '/pages/tareas_trazados.html';
        break;

        default:
        break;

        // Vistas de Diseño Gráfico
  
        case 'tareas_boceto':
            window.location.href = '/pages/tareas_boceto.html'
        break;

        case 'tareas_plotter':
            window.location.href = '/pages/tareas_plotter.html'
        break;

        case 'tareas_muestra_forrada_grafico':
            window.location.href = '/pages/tareas_muestra_forrada_grafico.html'
        break;

        case 'tareas_consumo_tinta':
            window.location.href = '/pages/tareas_consumo_tinta.html'
        break;

        case 'tareas_montajes': 
            window.location.href = '/pages/tareas_montajes.html'
        break;

        case 'tareas_agrupaciones': 
            window.location.href = '/pages/tareas_agrupaciones.html'
        break;
    }
}

window.addEventListener("load", function () {
    setTimeout(() => {
    const loader = document.getElementById("loaderContainer");
    if (loader) loader.style.display = "none";
    }, 1000); 
});

fetch("/pages/sidebar.html").then(response => response.text()).then(html => {
    document.getElementById("sidebar-placeholder").innerHTML = html;

    const tabGuardado = localStorage.getItem('tab-activo');
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll('#sidebar-placeholder .nav-link');
    links.forEach(link => {
        const href = link.getAttribute('href');

        if (href === tabGuardado) {
            link.classList.add('active');
        }

        if (!tabGuardado && href === currentPath) {
            link.classList.add('active');
        }
    });
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
            console.log("Alerta cerrada automáticamente");
        }
    });
}
// =================== FIN VARIABLES Y FUNCIONES GLOBALES =========


// =================== DASHBOARD =================================== 

function mostrarContenido(tipo) {
    const contenedor = document.getElementById('dashboard-content');

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

    switch (tipo) {
        case 'proyectos':
        contenido = `
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title text-bold">Proyectos</h3>
                </div>
                <div class="card-body"> 
                    <div class="card-body p-0">
                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 1%">
                                        #
                                    </th>
                                    <th style="width: 20%">
                                        Nombre del Proyecto
                                    </th> 
                                    <th>
                                        Cliente
                                    </th>
                                    <th>
                                        Descripción
                                    </th>
                                    <th style="width: 8%" class="text-center">
                                        Estado
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = '/pages/project-detail.html'" class="btn btn-secondary btn-sm">C2040-001309</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 1
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = 'project-detail.html'"  class="btn btn-secondary btn-sm">C2040-001310</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 2
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
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
        contenido = `
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title text-bold">Proyectos</h3>
                </div>
                <div class="card-body"> 
                    <div class="card-body p-0">
                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 1%">
                                        #
                                    </th>
                                    <th style="width: 20%">
                                        Tarea
                                    </th> 
                                    <th>
                                        Proyecto
                                    </th>
                                    <th>
                                        Descripción
                                    </th>
                                    <th style="width: 8%" class="text-center">
                                        Estado
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = '/pages/project-detail.html'" class="btn btn-secondary btn-sm">C2040-001309</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 1
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = 'project-detail.html'"  class="btn btn-secondary btn-sm">C2040-001310</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 2
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>
        `;
        break;

        case 'todos':
        contenido = `
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title text-bold">Proyectos</h3>
                </div>
                <div class="card-body"> 
                    <div class="card-body p-0">
                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 1%">
                                        #
                                    </th>
                                    <th style="width: 20%">
                                        Nombre del Proyecto
                                    </th> 
                                    <th>
                                        Cliente
                                    </th>
                                    <th>
                                        Descripción
                                    </th>
                                    <th style="width: 8%" class="text-center">
                                        Estado
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = '/pages/project-detail.html'" class="btn btn-secondary btn-sm">C2040-001309</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 1
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = 'project-detail.html'"  class="btn btn-secondary btn-sm">C2040-001310</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 2
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
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
        contenido = `
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title text-bold">Proyectos</h3>
                </div>
                <div class="card-body"> 
                    <div class="card-body p-0">
                        <table class="table table-striped projects">
                            <thead>
                                <tr>
                                    <th style="width: 1%">
                                        #
                                    </th>
                                    <th style="width: 20%">
                                        Tarea
                                    </th> 
                                    <th>
                                        Proyecto
                                    </th>
                                    <th>
                                        Descripción
                                    </th>
                                    <th style="width: 8%" class="text-center">
                                        Estado
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = '/pages/project-detail.html'" class="btn btn-secondary btn-sm">C2040-001309</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 1
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
                                    </td>
                                </tr> 
                                <tr>
                                    <td>
                                        #
                                    </td>
                                    <td> 
                                        <button type="button" onclick="window.location.href = 'project-detail.html'"  class="btn btn-secondary btn-sm">C2040-001310</button> 
                                    </td> 
                                    <td class="project_progress"> 
                                        <button type="button" class="btn btn-secondary btn-sm">Cliente # 2</button>
                                    </td>
                                    <td>
                                        Descripción del proyecto 2
                                    </td>
                                    <td class="project-state">
                                        <span class="badge badge-success">Success</span>
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
    mostrarContenido('proyectos');
});

window.addEventListener("load", function () {
    setTimeout(() => {
        const loader = document.getElementById("loaderContainer");
        if (loader) loader.style.display = "none";
    }, 1000); 
});


// ======================== FIN DASHBOARD =============================


// ===================== DETALLE CLIENTE ========================

const folderData = {

    images: [
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
            <div class="file-item-icon ${file.icon} text-secondary mr-3"></div>
            <a href="#" class="file-item-name flex-grow-1">${file.name}</a>
            <div class="file-item-changed text-muted mr-3">${file.date}</div>
            <div class="file-item-actions btn-group">
            <button type="button" class="btn btn-sm dropdown-toggle" data-toggle="dropdown">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Renombrar</a>
                <a class="dropdown-item" href="#">Eliminar</a>
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

renderFolder('images');

// ====================== FIN DETALLE CLIENTE ==========================

 
                 
 

