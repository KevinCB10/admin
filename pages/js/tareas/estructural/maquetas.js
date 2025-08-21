 

// =================== TAREAS MAQUETA - ESTRUCTURAL =========== 
 

// Lista de gestores disponibles
const gestores = ['Gestor 1', 'Gestor 2', 'Gestor 3', 'Gestor 4', 'Gestor 5'];

// Estados posibles que puede tener una tarea, clasificados por rol
const estados = [
    '1. Solicitud de Tarea (Gestor)',
    '2. Información Incompleta (Diseñador)',
    '3. Tarea Completada (Diseñador)',
    '4. Solicitud de Modificación (Gestor)',
    '5. Tarea Finalizada (Gestor)',
    '6. Trabajo Enviado al Cliente (Gestor)',
    '7. Modificación Solicitada por el Cliente (Comercial)',
    '8. Trabajo aceptado por cliente (Comercial)', 
];

// Contenedor donde se insertan dinámicamente las tareas
 
const contenedorTareas = document.getElementById('contenedor-tareas');
                                 
// Contador global para generar IDs únicos
let contadorTareas = 1;

// FUNCIÓN PRINCIPAL PARA CREAR TAREAS

function crearTarea(id, autoFocus = false) {
    // Crea un div para representar la tarea y le asigna clase e ID según si es impar o par
    const divTarea = document.createElement('div');
    divTarea.className = id % 2 === 1 ? 'tareaImpar' : 'tareaPar';
    divTarea.id = `tarea-${id}`;

    // Fecha actual para mostrar en la tarea
    const fechaInicio = new Date();
    const fecha = fechaInicio.toLocaleDateString('es-ES');

    // Obtener estado correspondiente del gestor para esta tarea
    const estadosImpares = estados.filter((_, index) => (index + 1) % 2 === 1);
    const estadoAsignado = estadosImpares[Math.floor((id - 1) / 2)];
    const esEstadoUno = estadoAsignado && estadoAsignado.startsWith('1. Solicitud de Tarea (Gestor)');

    // TAREA IMPAR
    if (id % 2 === 1) {
        // Si es el primer estado, genera un modal para seleccionar departamento
        const modalHTML = esEstadoUno ? `
        <div class='modal fade' id='modal-sm-${id}' data-backdrop='static' data-keyboard='false'>
            <div class='modal-dialog'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h4 class='modal-title'>Asignar Departamento</h4>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span> 
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='form-group mt-2'>
                            <div class='form-check'>
                                <input class='form-check-input' type='radio' name='radio-${id}'>
                                <label class='form-check-label'>Departamento Interno</label>
                            </div>
                            <div class='form-check'>
                                <input class='form-check-input' type='radio' name='radio-${id}'>
                                <label class='form-check-label'>Departamento Externo</label>
                            </div>
                        </div>
                    </div>
                    <div class='modal-footer justify-content-end'>
                        <button type='button' class='btn btn-default mr-3' data-dismiss='modal'>Cancelar</button>
                        <button id='buttonAgregarTareaImpar${id}' onclick='guardarTarea(${id})'  type='button' class='btn btn-success agregar-tarea-impar'>Guardar</button>
                    </div>
                </div>
            </div>
        </div>` : '';
            
        // Botón que lanza el modal si aplica, o solo ejecuta la acción
        const botonModal = esEstadoUno
            ? `<button type='button' data-toggle='modal' data-target='#modal-sm-${id}' class='btn btn-sm bg-gradient-success addTask ml-3'>Agregar Tarea<i class='fas fa-plus ml-1'></i></button>`
            : `<button type='button' class='btn btn-sm bg-gradient-success agregar-tarea-impar addTask  ml-3'>Agregar Tarea<i class='fas fa-plus ml-1'></i></button>`;

        // HTML de la tarjeta de tarea impar
        divTarea.innerHTML = `
            ${modalHTML}
            <div class='row justify-content-center info-box-content fadeInUp-animation pb-4 mb-4'>
                <div class='  ' style='width: 70%; box-shadow: 0px !important; background-color: #f8f9fa !important'>
                    <div class='card-header'>
                        <div class='d-flex align-items-center justify-content-between mb-2'>
                            <h5><span class='badge badge-info'>#${id}</span> Solicitar Maqueta</h5>
                            ${botonModal}
                        </div>
                    </div>
                    <div class='card-body'>
                        <h6>Estado de la tarea <span class='badge badge-secondary'>Iniciada</span></h6>
                        <div class='row mt-3'>
                            <div class='col-12 col-md-4 mb-2'>
                                <span class='info-box-number text-left'>Iniciada:</span>
                                <span class='info-box-number text-left text-muted ml-1'>${fecha}</span>
                            </div>
                            <div class='col-12 col-md-4 mb-2'>
                                <span class='info-box-number text-left'>Completada:</span>
                                <span class='info-box-number text-left text-muted ml-1'>${fecha}</span>
                            </div>
                            <div class='col-12 col-md-4 mb-2'>
                                <span class='info-box-number text-left'>Gestor:</span>
                                <span class='info-box-number text-left text-muted ml-1'>Kevin de León</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;


        if (document.getElementById('contenedor-tareas')) {
            if (contenedorTareas.children.length > 0) {
                const hr = document.createElement('hr');
                hr.className = 'my-4'; // espacio arriba y abajo del divider
                contenedorTareas.appendChild(hr);
            }
        }

        if (document.getElementById('contenedor-tareas')) {
            contenedorTareas.appendChild(divTarea); 
        }
       
        // Lógica de botones
        const botonAgregarImpar = divTarea.querySelector('.agregar-tarea-impar');
        const botonAddTask = divTarea.querySelector('.addTask');
        const radios = document.querySelectorAll(`#modal-sm-${id} input[name="radio-${id}"]`);
        
        if (botonAgregarImpar) {
            botonAgregarImpar.addEventListener('click', () => {
                const algunoMarcado = Array.from(radios).some((radio =>{  
                    return radio.checked
                }));
                if (algunoMarcado || !esEstadoUno) {
                    botonAddTask.disabled = true;
                    botonAddTask.innerHTML = 'Agregada <span style="color: white;"><i class="fa-solid fa-circle-check"></i></span>';
                    botonAddTask.classList.remove('bg-gradient-success');
                    botonAddTask.classList.add('btn-info');
                    botonAddTask.style.cursor = 'not-allowed';  
                }  
                if (algunoMarcado) {
                    cambiarEstado(id, 'Completada'); 
                }

                if (!algunoMarcado && !esEstadoUno) {
                    cambiarEstado(id, 'Completada');  
                }
            });
        }

    // TAREA PAR
    } else {
        divTarea.innerHTML = `
        <div class='row justify-content-center pb-4 mb-4 fadeInUp-animation'>
            <div class=' ' style='width: 70%; box-shadow: 0px; background-color: #f8f9fa !important'>
                <div class='card-header'>
                    <div class='d-flex align-items-center justify-content-between mb-2'>
                        <h5><span class='badge badge-info'>#${id}</span> Crear Maqueta</h5>
                        <button type='button' class='btn btn-sm bg-gradient-success agregar-tarea-par'>Completar Tarea <i class='fas fa-check'></i></button>
                    </div>
                </div>
                <div class='card-body'>
                    <div class='row mt-1 g-2 align-items-end mb-3'>
                        <div class='col-md-6 mb-2' id='estado-container-${id}'>
                            <label class='form-label font-weight-bold'>Estado:</label>
                            <div class='input-group input-group-sm'>
                                <input type='text' id='estado-text-${id}' class='form-control' readonly />
                                <select id='estado-select-${id}' class='form-control d-none mr-2'>
                                    ${estados.map(e => `<option value='${e}'>${e}</option>`).join('')}
                                </select>
                                <button type='button' class='swalDefaultSuccess' style='padding: 4px; border: none; background-color: transparent;' id='btn-cambiar-estado-${id}' title='Cambiar Estado'>
                                    <i class='fa-solid fa-pen-to-square text-info h5'></i>
                                </button>
                            </div>
                        </div>

                        <div class='col-md-6'>
                            <div class='callout callout-info' style='padding: 7px; box-shadow: none;'>
                                <p>Departamento Interno</p>
                            </div>
                        </div>

                        <div class='form-floating col-md-6 mt-3'>
                            <textarea class='form-control' placeholder='Indicaciones' id='floatingTextarea2-${id}' style='height: 100px'></textarea>
                        </div>
                    </div> 
                    <div class='row mt-5 justify-content-center'>
                        <div class='col-12 col-md-4 mb-2'>
                            <span class='info-box-number text-left'>Iniciada:</span>
                            <span class='info-box-number text-left text-muted ml-1'>${fecha}</span>
                        </div>
                        <div class='col-12 col-md-4 mb-2'>
                            <span class='info-box-number text-left'>Completada:</span>
                            <span class='info-box-number text-left text-muted ml-1'>${fecha}</span>
                        </div>
                        <div class='col-12 col-md-4 mb-2'>
                            <span class='info-box-number text-left'>Asignada a:</span>
                            <span class='info-box-number text-left text-muted ml-1'>Comercial</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;


        if (contenedorTareas.children.length > 0) {
            const hr = document.createElement('hr');
            hr.className = 'my-4'; // espacio arriba y abajo del divider
            contenedorTareas.appendChild(hr);
        }

        contenedorTareas.appendChild(divTarea);

        // Estado dinámico editable
        const estadoText = document.getElementById(`estado-text-${id}`);
        const estadoSelect = document.getElementById(`estado-select-${id}`);
        const btnCambiarEstado = document.getElementById(`btn-cambiar-estado-${id}`);
        const estadoMsg = document.getElementById(`estado-msg-${id}`);

        // Estado inicial para diseñador
        const estadosImpares = estados.filter((_, index) => (index + 1) % 2 === 1);
        const estadoValido = estadosImpares[Math.floor((id - 1) / 2)] || estadosImpares[estadosImpares.length - 1];


        if (estadoSelect && estadoText) {
            estadoSelect.value = estadoValido;
            estadoText.value = estadoValido;
        }

        // Lógica para cambiar de estado editable
        btnCambiarEstado.addEventListener('click', () => {
            if (estadoSelect.classList.contains('d-none')) {
                estadoText.classList.add('d-none');
                estadoSelect.classList.remove('d-none');
                btnCambiarEstado.innerHTML = `<i class='fa-solid fa-floppy-disk text-success h5'></i>`;
                btnCambiarEstado.title = 'Guardar';
                estadoSelect.focus();
            } else {
                const nuevoEstado = estadoSelect.value;
                estadoText.value = nuevoEstado;
                estadoText.classList.remove('d-none');
                estadoSelect.classList.add('d-none'); 
                btnCambiarEstado.title = 'Cambiar Estado';
                btnCambiarEstado.innerHTML = `<i class='fa-solid fa-pen-to-square text-info h5'></i>`;
                
                // Toast de confirmación
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                Toast.fire({
                    icon: 'success',
                    title: 'Estado actualizado correctamente'
                });

                if (estadoMsg) {
                    estadoMsg.classList.remove('d-none');
                    setTimeout(() => estadoMsg.classList.add('d-none'), 2500);
                }
            }
        });

        // Acción al completar tarea
        const botonAgregarPar = divTarea.querySelector('.agregar-tarea-par');
        if (botonAgregarPar) {
            botonAgregarPar.addEventListener('click', () => {
                botonAgregarPar.disabled = true;
                botonAgregarPar.innerHTML = 'Completada <span style="color: white;"><i class="fa-solid fa-circle-check"></i></span>';
                botonAgregarPar.classList.remove('bg-gradient-success');
                botonAgregarPar.classList.add('btn-info');
                botonAgregarPar.style.cursor = 'not-allowed';
                cambiarEstado(id, 'Completada');
            });
        }
    }
}
 
 
// Retorna la clase de ícono según extensión del archivo
function getFileIcon(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    switch (ext) {
        case 'pdf': return 'fa-file-pdf text-danger';
        case 'doc':
        case 'docx': return 'fa-file-word text-primary';
        case 'xls':
        case 'xlsx': return 'fa-file-excel text-success';
        case 'ppt':
        case 'pptx': return 'fa-file-powerpoint text-warning';
        case 'png':
        case 'jpg':
        case 'jpeg': return 'fa-file-image text-info';
        case 'zip':
        case 'rar': return 'fa-file-archive text-muted';
        default: return 'fa-file text-secondary';
    }
}

// Muestra la vista previa de un archivo
function showFilePreview(file, id) {
    const placeholder = document.getElementById(`drop-placeholder-${id}`);
    const preview = document.getElementById(`file-preview-${id}`);
    const link = document.getElementById(`file-download-link-${id}`);
    const iconClass = getFileIcon(file.name);
    const url = URL.createObjectURL(file);

    if (placeholder) placeholder.classList.add('d-none');

    preview.innerHTML = `
        <div class='position-relative text-center mt-2'>
            <i class='fas ${iconClass}' style='font-size: 2.5rem;'></i>
            <button type='button' class='btn-close position-absolute top-0 start-100 translate-middle' style='font-size: 0.7rem;' aria-label='Eliminar archivo' onclick='removeSelectedFile(${id})'></button>
            <div class='small mt-2 text-muted'>${file.name}</div>
        </div>
    `;

    if (link) {
        link.href = url;
        link.download = file.name;
        link.innerHTML = `<span class='d-inline-block text-truncate' style='max-width: 100px;'>${file.name}</span> <i class='fa-solid fa-file-arrow-down mb-2'></i>`;
        link.classList.remove('text-muted', 'disabled-link');
        link.style.pointerEvents = 'auto';
    }
}

// Limpia un archivo seleccionado
function removeSelectedFile(id) {
    const input = document.getElementById(`fileInput-${id}`);
    const preview = document.getElementById(`file-preview-${id}`);
    const placeholder = document.getElementById(`drop-placeholder-${id}`);
    const link = document.getElementById(`file-download-link-${id}`);

    if (input) input.value = '';
    if (preview) preview.innerHTML = '';
    if (placeholder) placeholder.classList.remove('d-none');
    if (link) {
        link.href = '#';
        link.removeAttribute('download');
        link.innerHTML = 'Descargar <i class="fa-solid fa-file-arrow-down"></i>';
        link.classList.add('text-muted', 'disabled-link');
        link.style.pointerEvents = 'none';
    }
}

// Cierra el modal al guardar
function guardarTarea(id) { 

    // Selecciona todos los radios del modal correspondiente
    const radios = document.querySelectorAll(`#modal-sm-${id} input[name='radio-${id}']`); 

    // Verifica si al menos uno está seleccionado
    const algunoMarcado = Array.from(radios).some(radio => radio.checked);
 
    !algunoMarcado 
        ? mostrarAlerta('Departamento requerido', 'Por favor, selecciona un departamento antes de continuar.', 'warning', 1800)
        : mostrarAlerta('Tarea Agregada', 'La tarea se ha asignado al Departamento Interno', 'success', 1800);

    // Si sí hay selección, entonces cierra el modal normalmente
    $(`#modal-sm-${id}`).modal('hide');
}


// Incrementa el contador de tareas y crea una nueva
function cambiarEstado(){  
    contadorTareas++;
    crearTarea(contadorTareas); 
}

crearTarea(contadorTareas);
// =================== FIN TAREAS MAQUETA - ESTRUCTURAL =========== 
