

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
          <div class='card card-default'>
            <div class='card-header'>
              <h3 class='card-title text-bold'>Proyectos</h3>
            </div>
            <div class='card-body'> 
              <div class='card-body p-0'>
                <table class='table table-striped projects'>
                  <thead>
                    <tr>
                      <th style='width: 1%'>
                        #
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
                        #
                      </td>
                      <td> 
                        <button type='button' onclick='window.location.href = '/pages/detalle_proyecto.html''  class='btn btn-secondary btn-sm'>C2040-001309</button> 
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
                      <td>
                        #
                      </td>
                      <td> 
                        <button type='button' onclick='window.location.href = 'detalle_proyecto.html''  class='btn btn-secondary btn-sm'>C2040-001310</button> 
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
        contenido = `
          <div class='card card-default'>
            <div class='card-header'>
              <h3 class='card-title text-bold'>Tareas Pendientes</h3>
            </div>
            <div class='card-body'>
              <p>Contenido genérico para tareas pendientes.</p>
            </div>
          </div>
        `;
        break;

      case 'todos':
        contenido = `
          <div class='card card-default'>
            <div class='card-header'>
              <h3 class='card-title text-bold'>Todos los Proyectos</h3>
            </div>
            <div class='card-body'>
              <p>Contenido genérico para todos los proyectos.</p>
            </div>
          </div>
        `;
        break;

      case 'aprobaciones':
        contenido = `
          <div class='card card-default'>
            <div class='card-header'>
              <h3 class='card-title text-bold'>Aprobaciones Pendientes</h3>
            </div>
            <div class='card-body'>
              <p>Contenido genérico para aprobaciones pendientes.</p>
            </div>
          </div>
        `;
        break;

      default:
        contenido = '<p>Selecciona una tarjeta para ver su contenido.</p>';
    }

    contenedor.innerHTML = contenido;
  }

  // Mostrar la vista por defecto al cargar
  document.addEventListener('DOMContentLoaded', function () {
    mostrarContenido('proyectos');
  });

  window.addEventListener('load', function () {
    setTimeout(() => {
      const loader = document.getElementById('loaderContainer');
      if (loader) loader.style.display = 'none';
    }, 1000); 
  });
