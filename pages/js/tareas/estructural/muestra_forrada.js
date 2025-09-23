 
// =================== TAREAS MUESTRA FORRADA - ESTRUCTURAL ============

const estados_mf = [
  '1. Solicitud de Tarea (Gestor)',
  '2. Información Incompleta (Diseñador)',
  '3. Tarea Completada (Diseñador) '
];

// Contenedor donde se insertan dinámicamente las tareas
const contenedorTareasMf = document.getElementById('contenedor-tareas-mf');

// Contador global para generar IDs únicos
let contadorTareasMf = 1;

// FUNCIÓN PRINCIPAL PARA CREAR TAREAS
function crearTareaMf(id, autoFocus = false) {
  const divTarea = document.createElement('div');
  divTarea.className = id % 2 === 1 ? 'tareaImpar' : 'tareaPar';
  divTarea.id = `tarea-${id}`;

  const fecha = new Date().toLocaleDateString('es-ES');

  const estadosImpares = estados_mf.filter((_, index) => (index + 1) % 2 === 1);
  const estadoAsignado = estadosImpares[Math.floor((id - 1) / 2)];
  const esEstadoUno = !!(estadoAsignado && estadoAsignado.startsWith('1. Solicitud de Tarea (Gestor)'));

  // ================= TAREA IMPAR =================
  if (id % 2 === 1) {
    // Modal: se inyecta al hacer clic
    const modalId = `modal-sm-${id}`;
    const modalHTML = `
      <div class='modal fade' id='${modalId}' tabindex='-1' role='dialog' aria-hidden='true' data-backdrop='static' data-keyboard='false'>
        <div class='modal-dialog' role='document'>
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
                  <input class='form-check-input' type='radio' name='radio-${id}' value='interno'>
                  <label class='form-check-label'>Departamento Interno</label>
                </div>
                <div class='form-check'>
                  <input class='form-check-input' type='radio' name='radio-${id}' value='externo'>
                  <label class='form-check-label'>Departamento Externo</label>
                </div>
              </div>
            </div>
            <div class='modal-footer justify-content-end'>
              <button type='button' class='btn btn-default mr-3' data-dismiss='modal'>Cancelar</button>
              <button id='buttonAgregarTareaImpar${id}' type='button' class='btn btn-success'>Guardar</button>
            </div>
          </div>
        </div>
      </div>`;

    // Tarjeta (sin meter el modal dentro)
    const botonModal = esEstadoUno
      ? `<button type='button' class='btn btn-sm bg-gradient-success addTask ml-3'>Agregar Tarea<i class='fas fa-plus ml-1'></i></button>`
      : `<button type='button' class='btn btn-sm bg-gradient-success agregar-tarea-impar addTask ml-3'>Agregar Tarea<i class='fas fa-plus ml-1'></i></button>`;

    divTarea.innerHTML = `
      <div class='row justify-content-center info-box-content fadeInUp-animation pb-4 mb-4'>
        <div style='width: 70%; box-shadow: 0px !important; background-color: #f8f9fa !important'>
          <div class='card-header'>
            <div class='d-flex align-items-center justify-content-between mb-2'>
              <h5><span class='badge badge-info'>#${id}</span> Muestra Forrada</h5>
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

    if (document.getElementById('contenedor-tareas-mf')) {
      if (contenedorTareasMf.children.length > 0) {
        const hr = document.createElement('hr');
        hr.className = 'my-2';
        contenedorTareasMf.appendChild(hr);
      }
      contenedorTareasMf.appendChild(divTarea);
    }

    // Lógica de botones
    const botonAddTask = divTarea.querySelector('.addTask');

    // Sin modal (cuando no es estado 1)
    const botonAgregarImpar = !esEstadoUno ? divTarea.querySelector('.agregar-tarea-impar') : null;
    if (botonAgregarImpar) {
      botonAgregarImpar.addEventListener('click', () => {
        botonAddTask.disabled = true;
        botonAddTask.innerHTML = 'Agregada <span style="color: white;"><i class="fa-solid fa-circle-check"></i></span>';
        botonAddTask.classList.remove('bg-gradient-success');
        botonAddTask.classList.add('btn-info');
        botonAddTask.style.cursor = 'not-allowed';
        cambiarEstadoMf(id, 'Completada');
      });
    }

    // Con modal (estado 1): inyectar y abrir AL CLIC; handlers con delegación
    if (esEstadoUno && botonAddTask) {
      botonAddTask.addEventListener('click', () => {
        // eliminar modal huérfano si existiera
        const viejo = document.getElementById(modalId);
        if (viejo) viejo.remove();

        // crear modal y mostrar
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const $modal = $(`#${modalId}`);

        // Delegación para el botón Guardar (evita referencias rotas)
        $(document)
          .off('click', `#buttonAgregarTareaImpar${id}`)
          .on('click', `#buttonAgregarTareaImpar${id}`, () => {
            guardarTareaMuestraForrada(id);
          });

        // Limpiar al cerrar (una sola vez)
        $modal.one('hidden.bs.modal', function () {
          $(this).remove();
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
        });

        $modal.modal('show');
      });
    }

  // ================= TAREA PAR =================
  } else {
    divTarea.innerHTML = `
      <div class='row justify-content-center pb-4 mb-4 fadeInUp-animation'>
        <div style='width: 70%; box-shadow: 0px; background-color: #f8f9fa !important'>
          <div class='card-header'>
            <div class='d-flex align-items-center justify-content-between mb-2'>
              <h5><span class='badge badge-info'>#${id}</span> Crear Muestra Forrada</h5>
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
                    ${estados_mf.map(estado => `<option value='${estado}'>${estado}</option>`).join('')}
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

    if (contenedorTareasMf.children.length > 0) {
      const hr = document.createElement('hr');
      hr.className = 'my-2';
      contenedorTareasMf.appendChild(hr);
    }
    contenedorTareasMf.appendChild(divTarea);

    // Estado dinámico editable
    const estadoText = document.getElementById(`estado-text-${id}`);
    const estadoSelect = document.getElementById(`estado-select-${id}`);
    const btnCambiarEstado = document.getElementById(`btn-cambiar-estado-${id}`);
    const estadoMsg = document.getElementById(`estado-msg-${id}`);

    const estadosImpares2 = estados_mf.filter((_, index) => (index + 1) % 2 === 1);
    const estadoValido = estadosImpares2[Math.floor((id - 1) / 2)] || estadosImpares2[estadosImpares2.length - 1];

    if (estadoSelect && estadoText) {
      estadoSelect.value = estadoValido;
      estadoText.value = estadoValido;
    }

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

        const Toast = Swal.mixin({
          'toast': true,
          'position': 'top-end',
          'showConfirmButton': false,
          'timer': 3000,
          'timerProgressBar': true,
        });

        Toast.fire({ 'icon': 'success', 'title': 'Estado actualizado correctamente' });

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
        cambiarEstadoMf(id, 'Completada');
      });
    }
  }
}

// Guardar (cierra y limpia modal) — nombre único para evitar choques
function guardarTareaMuestraForrada(id) {
  const modalSelector = `#modal-sm-${id}`;
  const $modal = $(modalSelector);
  const algunoMarcado = $modal.find(`input[name='radio-${id}']:checked`).length > 0;

  if (!algunoMarcado) {
    if (typeof mostrarAlerta === 'function') {
      mostrarAlerta('Departamento requerido', 'Por favor, selecciona un departamento antes de continuar.', 'warning', 1800);
    }
    return;
  }

  if (typeof mostrarAlerta === 'function') {
    mostrarAlerta('Tarea Agregada', 'La tarea se ha asignado al Departamento seleccionado', 'success', 1800);
  }

  // Marcar el botón de la tarjeta
  const botonAddTask = document.querySelector(`#tarea-${id} .addTask`);
  if (botonAddTask) {
    botonAddTask.disabled = true;
    botonAddTask.innerHTML = 'Agregada <span style="color: white;"><i class="fa-solid fa-circle-check"></i></span>';
    botonAddTask.classList.remove('bg-gradient-success');
    botonAddTask.classList.add('btn-info');
    botonAddTask.style.cursor = 'not-allowed';
  }

  // Limpieza al cerrar (una sola vez)
  $modal.one('hidden.bs.modal', function () {
    $(this).remove();
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  });

  // Cerrar modal
  $modal.modal('hide');

  // Avanzar estado
  cambiarEstadoMf(id, 'Completada');
}

function cambiarEstadoMf() {
  contadorTareasMf++;
  crearTareaMf(contadorTareasMf);
}

// init
crearTareaMf(contadorTareasMf);

// ================== FIN TAREAS MUESTRA FORRADA - ESTRUCTURAL =========
 
