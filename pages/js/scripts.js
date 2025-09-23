 
// ==================== VARIABLES Y FUNCIONES GLOBALES ====================

const API_BASE_URL = 'http://174.65.1.204:8080/';
const departamentos = ['Departamento Interno', 'Departamento Externo'];
const TIMEOUT_MS = 10000; 
let tareasPendientes = [];
let proyectosGestor = [];

// Datos demo (sustituye por lo que devuelva tu API)
const historialEventos = [
  {
    'fecha': '2025-08-14 09:32',
    'usuario': 'Kevin de León',
    'accion': 'Actualizó estado',
    'estado': 'En proceso',
    'detalle': 'Estado Troquel pasó de "Pendiente" a "En proceso".'
  },
  {
    'fecha': '2025-08-14 08:10',
    'usuario': 'Salva',
    'accion': 'Añadió comentario',
    'estado': 'Pendiente',
    'detalle': 'Se solicitó revisar medidas del paletizado.'
  },
  {
    'fecha': '2025-08-13 16:25',
    'usuario': 'Juan de León',
    'accion': 'Adjuntó archivo',
    'estado': 'Completada',
    'detalle': 'Se adjuntó PDF de troquel actualizado.'
  }
];

 
const clientes = [
  { 
    'id': '1',
    'nombre': 'VIÑEDOS Y BODEGAS LYNG, S.L.', 
    'codigo': '8842', 
    'email': 'contacto@lyng.com', 
    'telefono': '600123456', 
  },
  { 
    'id': '2',
    'nombre': 'VIÑEDOS Y BODEGAS XXI, S.L.', 
    'codigo': '11274', 
    'email': 'contacto@xxi.com', 
    'telefono': '600234567' 
  },
  { 
    'id': '3',
    'nombre': 'WARDA TRADING S.A.R.A.U.', 
    'codigo': '42765', 
    'email': 'info@warda.com', 
    'telefono': '600345678' 
  },
  { 
    'id': '4',
    'nombre': 'WILKHAHN, S.A.', 
    'codigo': '22985', 
    'email': 'info@wilkahn.com', 
    'telefono': '600456789' 
  },
  { 
    'id': '5',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '6',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '7',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '8',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '9',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '10',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '11',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '12',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '13',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  },
  { 
    'id': '24',
    'nombre': 'WINES AND COMPANY', 
    'codigo': '2312', 
    'email': 'ventas@wines.com', 
    'telefono': '600567890' 
  } 
];


const folderData = { 
  'imágenes': [
    { 
      'name': 'Image-1.jpg', 
      'icon': 'fas fa-image', 
      'date': '2025-06-01' 
    },
    { 
      'name': 'Image-2.png', 
      'icon': 'fas fa-image', 
      'date': '2025-06-02' 
    },
    { 
      'name': 'Image-3.gif', 
      'icon': 'fas fa-image', 
      'date': '2025-06-03' 
    }
  ],

  'scripts': [
    { 
      'name': 'app.js',  
      'icon': 'fab fa-js', 
      'date': '2025-06-04' 
    },
    { 
      'name': 'main.js', 
      'icon': 'fab fa-js', 
      'date': '2025-06-05' 
    }
  ],

  'docs': [
    { 
      'name': 'README.txt',     
      'icon': 'fas fa-file-alt',  
      'date': '2025-06-06' 
    },
    { 
      'name': 'Checklist.doc',  
      'icon': 'fas fa-file-word', 
      'date': '2025-06-07' 
    }
  ] 
};

const folderList = document.getElementById('folder-list');
const folderTitle = document.getElementById('folder-title');
const folderContent = document.getElementById('folder-content');

// Rutas y vistas del proyecto (sin cambios)
const rutas = {
  'cliente': '/pages/cliente.html',
  'detalle_cliente': '/pages/detalle_cliente.html',
  'estructural_detalle': '/pages/estructural_detalle.html',
  'grafico_detalle': '/pages/grafico_detalle.html',
  'proyecto_detalle': '/pages/detalle_proyecto.html',
  'tareas_agrupaciones': '/pages/tareas_agrupaciones.html',
  'tareas_boceto': '/pages/tareas_boceto.html',
  'tareas_consumo_tinta': '/pages/tareas_consumo_tinta.html',
  'tareas_maqueta': '/pages/tareas_maqueta.html',
  'tareas_montajes': '/pages/tareas_montajes.html',
  'tareas_muestra_forrada': '/pages/tareas_muestra_forrada.html',
  'tareas_muestra_forrada_grafico': '/pages/tareas_muestra_forrada_grafico.html',
  'tareas_paletizado': '/pages/tareas_paletizado.html',
  'tareas_plotter': '/pages/tareas_plotter.html',
  'tareas_revision_troqueles': '/pages/tareas_revision_troqueles.html',
  'tareas_trazados': '/pages/tareas_trazados.html'
};

 
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


/**
 * Guarda en localStorage el enlace (href) de la pestaña activa.
 * Esto permite recordar la última pestaña seleccionada incluso después de recargar.
 * 
 * @param {string} tabHref - Enlace (href) de la pestaña activa.
 */
const guardarTabActivo = tabHref => localStorage.setItem('tab-activo', tabHref);


/**
 * Realiza un petición fetch con un tiempo límite (timeout).
 * Si el servidor no responde dentro del tiempo especificado, la promesa se rechaza.
 * 
 * @param {string} url - Url a la que se hará la petición.
 * @param {Object} options - Opciones del fetch (header, método, body, etc.).
 * @param {number} timeout -Tiempo máximo en milisegundos antes de cancelar.
 * @returns {Promise<Response>} - Promesa con la respuesta del fetch o un error de timeout.
 */
function fetchWithTimeout(url, options = {}, timeout = TIMEOUT_MS) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}


/**
 * Normaliza un path eliminando barras finales y '/index.html'.
 * Devuelve '/' si el resultado queda vacío.
 * 
 * @param {string} ruta - Ruta a normalizar.
 * @returns {string} Ruta normalizada.
 */
function normalizarPath(ruta) {
  if (!ruta) return '/';
  return ruta.replace(/\/+$/, '').replace(/\/index\.html$/, '') || '/';
}


/**
 * Redirige al usuario a una página definida en 'rutas'.
 * Puede guardar el origen en localStorage y añadir un parámetro 'id' a la URL.
 * 
 * @param {string} pagina - Clave del objeto 'rutas' que contiene la URL de destino.
 * @param {number|string|null} id - (Opcional) ID para agregar como query param en la URL. 
 * @param {string|null} origen - (Opcional) - Valor para guardar en localStorage como 'ultimaCardActiva'.
 */
const redireccionPagina = (pagina, id = null, origen = null) => {
  const baseUrl = rutas[pagina];
  if (!baseUrl) return; 
  if (origen) localStorage.setItem('ultimaCardActiva', origen); 
  const params = new URLSearchParams();
  if (id !== null && id !== undefined) params.set('id', String(id)); 
  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  window.location.href = url;
};


/** 
 * Espera a que la página cargue y oculta el loader después  de 1 segundo.
 * Mejora la UX al mostrar brevemente un indicador de carga.
 */
window.addEventListener('load', function () {
  setTimeout(() => {
    const loader = document.getElementById('loaderContainer');
    if (loader) loader.style.display = 'none';
  }, 1000);
});


/**
 * Marca como activo el enlace que coincide con la pestaña guardada o con la ruta actual.
 * Agrega la clase CSS 'active' para resaltar el enlace en la UI.
 * 
 * @param {NodeList|Array<Element>} links - Lista de enlaces a evaluar.
 * @param {string} currentPath - Ruta actual normalizada.
 * @param {string|null} tabGuardado - (Opcional) Ruta de la pestaña guardada en localStorage.
 */ 
function marcarLinkActivo(links, currentPath, tabGuardado = null) {
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === tabGuardado || (!tabGuardado && href === currentPath)) {
      link.classList.add('active');
    }
  });
}


/**
 * Carga el HTML del sidebar y, una vez insertado el DOM, marca el enlace
 * correspondiente como 'activo'. Toma en cuenta la pestaña guardada en
 * localStorage ('tab-activo') y el path actual.
 */
fetch('/pages/sidebar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('sidebar-placeholder').innerHTML = html;
    const tabGuardado = localStorage.getItem('tab-activo');
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('#sidebar-placeholder .nav-link');

    marcarLinkActivo(links, currentPath, tabGuardado); 
    if (!currentPath.endsWith('/index.html')) {
      const inicioLink = document.querySelector('#sidebar-placeholder .nav-link[href="/index.html"]');
      if (inicioLink) inicioLink.classList.add('active');
    }
  });


/**
 * Listener global: Cuando un modal de Bootstrap se oculta ('hidden.bs.modal').
 * Se limpia el atributo 'aria-hidden' si quedó en 'true' y se hace blur del
 * elemento activo para evitar que el foco quede atrapado.
 */
$(document).on('hidden.bs.modal', function (e) {
  const modal = e.target;
  if (modal && modal.getAttribute('aria-hidden') === 'true') {
    modal.removeAttribute('aria-hidden');
  }
  setTimeout(() => {
    if (document.activeElement) document.activeElement.blur();
  }, 100);
});


/**
 * Muestra una alerta usando SweetAlert2 con un icono, titulo, texto y cierre automático por tiempo.
 * También agrega una barra de progreso y muestra un log cuando se cierra automáticamente.
 * 
 * @param {string} titulo - Texto que se mostrará como título de la alerta. 
 * @param {string} texto Texto descriptivo o mensaje principal de la alerta.
 * @param {string} icono [icono='info'] - Icono de la alerta (info, success, warning, error, question).
 * @param {number} tiempo [tiempo=1800] - Tiempo en milisegundos antes de que la alerta se cierre automáticamente.
 */
function mostrarAlerta(titulo, texto, icono = 'info', tiempo = 1800) {
  let timerInterval;
  Swal.fire({
    'icon': icono,
    'title': titulo,
    'text': texto,
    'timer': tiempo,
    'timerProgressBar': true,
    'didOpen': () => { Swal.showLoading(); },
    'willClose': () => { clearInterval(timerInterval); }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('Alerta cerrada automáticamente');
    }
  });
}

// =================== FIN VARIABLES Y FUNCIONES GLOBALES =========



// =================== DASHBOARD ===================================

// ===================== RENDER DE PROYECTOS ========================


/**
 * Renderiza dinámicamente el listado de proyectos en el <tbody> de la tabla.
 * 
 * - Busca el elemento con id 'proyectos-tbody' en el DOM.
 * - Si no lo encuentra, muestra una advertencia en consola y termina.
 * - Si lo encuentra genera el contenido HTML de cada fila <tr> usando los datos
 *   de cada proyecto y lo inserta en el tbody.
 * - Cada fila es clickeable y redirige a la vista de detalle del proyecto.
 * 
 * Campos renderizados en cada fila:
 *  - clienteCodigo
 *  - cliente
 *  - referencia
 *  - comercial
 *  - numero (muestra 'Sin información' si está vacío)
 *  - estado (con badge visual)
 *  - gestor
 *  - fechaCreacion
 *  - fechaModificacion (muestra 'Sin información' si está vacío)
 * 
 * @returns {void}
 */
function renderProyectos(proyectosGestor) {
  const tbody = document.getElementById('proyectos-tbody');

  if (!tbody) {
    console.warn('No se encontró el contenedor de la tabla todavía.');
    return;
  }
  
  tbody.innerHTML = '';
  proyectosGestor.forEach(proyecto => {
    const fila = ` 
    <tr onclick='redireccionPagina("proyecto_detalle")' style='cursor: pointer;'>
      <td class='td-fonts'>${proyecto['clienteCodigo']}</td> 
      <td class='td-fonts'>${proyecto['cliente']}</td> 
      <td class='td-fonts'> ${proyecto['referencia']} </td>
      <td class='td-fonts'>${proyecto['comercial']}</td> 
      <td class='td-fonts'>${proyecto['numero'] == '' ? '- Sin información -' : proyecto['numero']}</td>  
      <td class='td-fonts'><span class='badge badge-success badge-lg'>${proyecto['estado']}</span></td>
      <td class='td-fonts'>${proyecto['gestor']}</td>
      <td class='td-fonts'>${proyecto['fechaCreacion']}</td> 
      <td class='td-fonts'>${proyecto['fechaModificacion'] == '' ? '- Sin información -' : proyecto['fechaModificacion']}</td>
    </tr> 
  `;
  tbody.insertAdjacentHTML('beforeend', fila);
  })
};


/**
 * Obtiene la lista de tareas pendientes desde la API.
 * 
 * - Construye la URL usando la constante API_BASE_URL.
 * - Llama a la API utilizando fetchWithTimeout() para evitar que quede colgada.
 * - Si la respuesta es exitosa (response.ok), convierte el resultado a JSON y lo retorna.
 * - Si ocurre unn error (timeout, fallo de red o status no-Ok):
 *   - Muestra un mensaje de error en consola.
 *   - Si existe el <tbody> con id 'tabla-tareas-body', muestra una fila con el error.
 *   - Retorna un array vacío para evitar que el flujo principal falle.
 * 
 * @async
 * @returns {Promise<Array>} Arreglo con las tareas obtenidas o un array vacío si hubo error. 
 */
async function getData() {
  const url = `${API_BASE_URL}test/tareas/pendientes/dmaiques`;
  console.log('📡 Llamando a API (refresco de tareas)...', url);

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`); 
    const result = await response.json();
    console.log('📊 Respuesta JSON:', result);
    return result; 
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
    return [];
  }
};

async function getProyectosGestor() {
  const url = `${API_BASE_URL}test/proyectos/gestor/dmaiques`;
  console.log('📡 Llamando a API (refresco de tareas)...', url);

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`); 
    const result = await response.json();
    console.log('📊 Respuesta JSON proyectos:', result);
    return result; 
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
    return [];
  }
};


/**
 * Renderiza dinámicamente las tareas pendientes en la tabla.
 * 
 * - Busca el <tbody> conn id 'tabla-tareas-body'.
 * - Si no lo encuentra, muestra un warning en consola y sale de la función.
 * - Si lo encuentra, limpia su contenido e inserta una filaa <tr> por cada tarea.
 * - Cada fila es clickeable y redirije a la vista 'proyecto_detalle'.
 * - Se usan clases de estilo como 'text-truncate' para limitar el ancho de texto y mantener el diseño ordenado.
 * - Al final inicializa DataTable si está disponible, para agregar paginación, búsqueda y ordenamiento.
 * 
 * @param {Array<Object>} tareasPendientes - Lista de tareas a renderizar. Cada objeto debe contener:
 *  - descripcion {string}
 *  - clienteCodigo {string} 
 *  - clienteNombre {string}
 *  - referencia {string}
 *  - tipo {string}
 *  - estado {string}
 *  - departamento {string}
 *  - creador {string}
 *  - asignadoA {string}
 *  - fechaCreacion {string|Date}
 * 
 * @returns 
 */
function renderTareas(tareasPendientes) {
  const tbody = document.getElementById('tabla-tareas-body');
  if (!tbody) {
    console.warn('No se encontró el contenedor de la tabla todavía.');
    return;
  } 
  
  tbody.innerHTML = '';
  tareasPendientes.forEach(tarea => {
    const fila = `
      <tr onclick='redireccionPagina("proyecto_detalle",  "tareas")' style='font-size: 13px; cursor: pointer;' class='fadeInUp-animation'>
        <td class='text-truncate td-fonts' style='max-width: 140px;'> 
          ${tarea['descripcion']}  ff
        </td>
        <td class='text-truncate td-fonts'>${tarea['clienteCodigo']}</td>
        <td class='text-truncate td-fonts'>${tarea['clienteNombre']}</td>
        <td class='text-truncate td-fonts'>${tarea['referencia']}</td>
        <td class='text-truncate td-fonts'>${tarea['tipo']}</td>
        < td class='text-truncate td-fonts'>${tarea['estado']}</td>
        <td class='text-truncate td-fonts'>${tarea['prioridad']}</td>
        <td class='text-truncate td-fonts'>${tarea['departamentoCreador']}</td>
        <td class='text-truncate td-fonts'>${tarea['departamentoAsignado']}</td>
        <td class='text-truncate td-fonts'>${tarea['creadoPor']}</td>
        <td class='text-truncate td-fonts'>${tarea['asignadoA']}</td>
        <td class='text-truncate td-fonts'> ${formatearFecha(tarea['fechaCreacion'])} </td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', fila);
  });

  // === Paginación/DataTable (misma config que el ejemplo) ===
  const tabla = document.querySelector('#tabla-tareas-body')?.closest('table');
  if (tabla && !$.fn.DataTable.isDataTable(tabla)) {
    const dt = $(tabla).DataTable({
      'responsive': true,
      'lengthChange': false,
      'autoWidth': false, 
      'pageLength': 25, // (opcional) fija 10 por página
      'buttons': [
        { 
          'extend': 'excelHtml5', 
          'text': '📊 Excel', 
          'exportOptions': { 
            'columns': 
            ':visible' 
          } 
        },
        {
          'extend': 'pdfHtml5',
          'text': '📄 PDF',
          'orientation': 'landscape',
          'pageSize': 'A4',
          'exportOptions': { 
            'columns': 
            ':visible' 
          },

          'customize': function (doc) {
            doc.styles.tableHeader = { 
              'fillColor': '#003366', 
              'color': 'white', 
              'bold': true, 
              'fontSize': 10 
            };
            if (doc.content[1] && doc.content[1].table && doc.content[1].table.body && doc.content[1].table.body[0]) {
              doc.content[1].table.body[0].forEach(function (headerCell) { headerCell.alignment = 'center'; });
              doc.defaultStyle.fontSize = 8;
              doc.defaultStyle.alignment = 'left';
              doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
              var rowCount = doc.content[1].table.body.length;
              for (var i = 1; i < rowCount; i++) {
                if (i % 2 === 0) {
                  doc.content[1].table.body[i].forEach(function (cell) { cell.fillColor = '#f3f3f3'; });
                }
              }
              var objLayout = {
                'hLineWidth': function() { return 0.5; },
                'vLineWidth': function() { return 0.5; },
                'hLineColor': function() { return '#cccccc'; },
                'vLineColor': function() { return '#cccccc'; },
                'paddingLeft': function() { return 4; },
                'paddingRight': function() { return 4; },
                'paddingTop': function() { return 2; },
                'paddingBottom': function() { return 2; }
              };
              doc.content[1].layout = objLayout;
            }
          }
        }
      ],

      'language': {
        'lengthMenu': '📄 Mostrar _MENU_ registros por página',
        'zeroRecords': '⚠️ No se encontraron resultados',
        'info': '📊 Viendo <b>_START_ → _END_</b> de un total de <b>_TOTAL_</b> registros',
        'infoEmpty': '📊 No hay registros para mostrar',
        'infoFiltered': '(filtrado de <b>_MAX_</b> registros totales)',
        'search': '🔍 Buscar:',
        'paginate': {
          'first': '⏮️ Primero',
          'last': '⏭️ Último',
          'next': '➡️ Siguiente',
          'previous': '⬅️ Anterior'
        }
      }, 

      'initComplete': function () {
        const w = document.querySelector('.content-wrapper.fadeInUp-animation');
        if (w) w.classList.add('is-ready');
      }

    });

    // Colocar los botones como en tu ejemplo, sin requerir ID del <table>
    dt.buttons().container().appendTo($(dt.table().container()).find('.col-md-6:eq(0)'));
  }
};


 /**
  * Espera a que el DOM esté completamente cargado y luego:
  *  1. Llama getData() para obtener las tareas desde la API.
  *  2. Asigna el resultado a la variable global tareasPendientes.
  *  3. Muestra en consola el listado de tareas obtenidas. 
  *  4. llama a renderTareas() para pintar las filas en la tabla.
  * 
  * @listens DOMContentLoaded
  * @async
  */ 
document.addEventListener('DOMContentLoaded', async () => {
  const tareasP = await getData();
  tareasPendientes = tareasP;
  console.log('Listado tareas listo para render',  tareasPendientes);
  renderTareas(tareasP);
});

document.addEventListener('DOMContentLoaded', async () => {
  const proyectos = await getProyectosGestor();
  proyectosGestor = proyectos;
  console.log('Listado tareas listo para render',  proyectosGestor);
  //renderTareas(tareasP);
});


/**
 * Carga y muestra el contenido del dashboard según el `tipo` seleccionado.
 * - Guarda la última card activa en localStorage y marca visualmente la card.
 * - Genera el HTML (según `tipo`) y lo inyecta en #dashboard-content.
 * - Reinicia la animación .fadeInUp-animation para unn re-render suave.
 * - Conecta 'enganches' específicos por vista (búsqueda/filtros/refresh/render). 
 * 
 * Tipos soportados:
 * - 'proyedctos': pinta tabla + buscador + filtro de estado + botón actualizar.
 * - 'tareas': usa renderTareas(tareasPendientnes) y botón 'Actualizar'.
 * - 'todos' / 'aprobaciones': (bloques análogos, según tu switch).
 * 
 * Detalles clave:
 * - Debounce(150ms) para búsqueda.
 * - Filtro por texto + estado; botón 'borrar' habilita/inhabilita según input.
 * - Reflow para reiniciar animación: style.animation='none' -> offsetWidth -> ''.
 * - Persiste selección: localStorage.setItem('ultimaCardActiva', tipo).
 * 
 * @param {('proyectos'|'tareas'|'todos'|'aprobaciones')} tipo - Vista a renderizar.
 * @returns {Promise<Void>}
 */
async function mostrarContenido(tipo) {
  const contenedor = document.getElementById('dashboard-content');
  localStorage.setItem('ultimaCardActiva', tipo);

  document.querySelectorAll('.small-box').forEach(card => card.classList.remove('active-card'));
  const cardSeleccionada = document.getElementById(`card-${tipo}`);
  if (cardSeleccionada) cardSeleccionada.classList.add('active-card');

  let contenido = '';
  let tituloTabla = '';

  switch (tipo) {
    case 'proyectos': {  
      tituloTabla = 'Proyectos';
      contenido = `
        <div class='card card-default fadeInUp-animation'>
          <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
            <h3 id='tablaTitulo' class='m-0 card-title text-bold'>${tituloTabla}</h3>
            <div class='proj-toolbar'>
              <div class='input-group input-group-lg mr-2'>
                <input id='proj-search' type='search' class='form-control' placeholder='Buscar…' autocomplete='off' />
                <div class='input-group-append'>
                  <span id='proj-clear' class='input-group-text clear-addon' role='button' tabindex='0' title='Limpiar búsqueda' aria-label='Limpiar búsqueda'>
                    <i class='fa-solid fa-eraser'></i>
                  </span>
                </div>
              </div>
              <div class='proj-select-wrap mr-2'>
                <select id='proj-status-filter' class='form-control form-control-lg proj-select' required>
                  <option value='' selected>Seleccionar...</option>
                  <option>Success</option>
                  <option>En Progreso</option>
                  <option>Pendiente</option>
                </select>
              </div>
              <button id='proj-refresh' class='btn btn-outline-secondary proj-btn' title='Actualizar'>
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
                      <th class='td-fonts pb-3'>Código Cliente</th> 
                      <th class='td-fonts pb-3'>Cliente</th> 
                      <th class='td-fonts pb-3'>Referencia</th>
                      <th class='td-fonts pb-3'>Comercial</th> 
                      <th class='td-fonts pb-3'>Número Proyecto</th>
                      <th class='td-fonts pb-3'>Estado</th>
                      <th class='td-fonts pb-3'>Gestor</th>
                      <th class='td-fonts pb-3'>Fecha Creación</th>
                      <th class='td-fonts pb-3'>Fecha Modificación</th> 
                    </tr>
                  </thead>
                  <tbody id='proyectos-tbody'> </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;
      break;
    }

    case 'tareas': {
      // Se renderiza la tabla de Tareas pendientes
      tituloTabla = 'Tareas Pendientes';
      contenido = `
        <div class='card card-default fadeInUp-animation'>
          <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
            <h3 id='tablaTitulo' class='m-0 card-title text-bold'>${tituloTabla}</h3>
            <div class='proj-toolbar'>
              <div class='input-group input-group-lg mr-2'>
                <input id='proj-search' type='search' class='form-control' placeholder='Buscar…' autocomplete='off' />
                <div class='input-group-append'>
                  <span id='proj-clear' class='input-group-text clear-addon' role='button' tabindex='0' title='Limpiar búsqueda' aria-label='Limpiar búsqueda'>
                    <i class='fa-solid fa-eraser'></i>
                  </span>
                </div>
              </div>
              <div class='proj-select-wrap mr-2'>
                <select id='proj-status-filter' class='form-control form-control-lg proj-select' required>
                  <option value='' selected>Seleccionar...</option>
                  <option>Success</option>
                  <option>En Progreso</option>
                  <option>Pendiente</option>
                </select>
              </div>
              <button id='btn-actualizar-tareas' class='btn btn-outline-secondary proj-btn' title='Actualizar'>
                <span class='icono-actualizar fade-show'><i class='fas fa-sync-alt'></i></span>
                <span class='spinner-cargando fade-hide'><span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></span>
              </button>
            </div>
          </div>

          <div class='card-body p-0'>
            <div class='table-outline'>
              <div class='table-responsive table-scroll-x'>
                <table class='table table-striped table-bordered projects table-hover align-middle mb-0'>
                  <thead class='thead-light'>
                    <tr>
                      <th class='pb-3 td-fonts'>Descripción</th>
                      <th class='pb-3 td-fonts'>Cliente/Código</th>
                      <th class='pb-3 td-fonts'>Cliente/Ubicación</th>
                      <th class='pb-3 td-fonts'>Referencia</th>
                      <th class='pb-3 td-fonts'>Tipo</th>
                      <th class='pb-3 td-fonts'>Estado</th>
                      <th class='pb-3 td-fonts'>Prioridad</th>
                      <th class='pb-3 td-fonts'>Departamento Creador</th>
                      <th class='pb-3 td-fonts'>Departamento Asignado</th>
                      <th class='pb-3 td-fonts'>Creado por</th>
                      <th class='pb-3 td-fonts'>Asignado a</th>
                      <th class='pb-3 td-fonts'>Fecha Creación</th>
                    </tr>
                  </thead>
                  <tbody id='tabla-tareas-body'></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;
      break;
    }

    case 'todos': {

      // Se renderiza la tabla de todos los proyectos
      tituloTabla = 'Todos los Proyectos';
      contenido = `
        <div class='card card-default fadeInUp-animation'>
          <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
            <h3 id='tablaTitulo' class='m-0 card-title text-bold'>${tituloTabla}</h3>
            <div class='proj-toolbar'></div>
          </div>
          <div class='card-body p-0'>
            <div class='table-outline'>
              <div class='table-responsive table-scroll-x'>
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
        </div>`;
      break;
    }

    case 'aprobaciones': {
      // Se renderiza la tabla de aprobaciones pendientes
      tituloTabla = 'Aprobaciones Pendientes';
      contenido = `
        <div class='card card-default fadeInUp-animation'>
          <div class='card-header bg-white d-flex align-items-center justify-content-between flex-wrap'>
            <h3 id='tablaTitulo' class='m-0 card-title text-bold'>${tituloTabla}</h3>
            <div class='proj-toolbar'></div>
          </div>
          <div class='card-body p-0'>
            <div class='table-outline'>
              <div class='table-responsive table-scroll-x'>
                <table class='table table-striped table-bordered projects table-hover align-middle mb-0'>
                  <thead class='thead-light'>
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
        </div>`;
      break;
    }

    default: { contenido = '<p>Selecciona una tarjeta para ver su contenido.</p>'; }

  }


  // ========== INYECCIÓN + RE-ARME DE ANIMACIÓN ==========
  if (!contenedor) return;
  contenedor.innerHTML = contenido;

  const cardAnim = contenedor.querySelector('.fadeInUp-animation');
  if (cardAnim) {
    cardAnim.style.animation = 'none';
    // fuerza reflow
    // eslint-disable-next-line no-unused-expressions
    cardAnim.offsetWidth;
    cardAnim.style.animation = '';
  }

  // ========== ENGANCHES ESPECÍFICOS ==========
  if (tipo === 'proyectos') {
    const tbody   = document.getElementById('proyectos-tbody');
    const search  = document.getElementById('proj-search');
    const status  = document.getElementById('proj-status-filter');
    const refresh = document.getElementById('proj-refresh');
    const clearEl = document.getElementById('proj-clear');

    if (typeof renderProyectos === 'function') {
      try { renderProyectos(proyectosGestor); } catch (e) { console.error('renderProyectos error:', e); }
    }

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


    const actualizarEstadoBorrador = () => {
      if (!clearEl || !search) return;
      const hayTexto = !!search.value.trim();
      clearEl.classList.toggle('is-disabled', !hayTexto);
      clearEl.setAttribute('aria-disabled', String(!hayTexto));
    };

    if (search) {
      search.addEventListener('input', debounce(() => {
        filtrarTabla();
        actualizarEstadoBorrador();
      }, 150));
    }

    if (status) status.addEventListener('change', filtrarTabla);

    if (clearEl) { 
      clearEl.style.cursor = 'pointer';
      clearEl.addEventListener('click', () => {
        if (!search || !search.value) return;
        search.value = '';
        search.focus();
        filtrarTabla();
        actualizarEstadoBorrador();
      });

      clearEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clearEl.click();
        }
      });
    }

    if (refresh) {
      refresh.style.cursor = 'pointer';
      refresh.addEventListener('click', () => {
        filtrarTabla();
      });
    }

    if (tbody) {
      tbody.querySelectorAll('td.td-fonts').forEach(td => {
        if (!td.getAttribute('title')) td.setAttribute('title', td.textContent.trim());
      });
    }

    actualizarEstadoBorrador();
  }

  if (tipo === 'tareas') { 
    // Render inicial si existe tu función global
    if (typeof renderTareas === 'function') {
      console.log('renderizando tareas'); 
      try { renderTareas(tareasPendientes); } catch (e) { console.error('renderTareas error:', e); }
    }

    const btnActualizar = document.getElementById('btn-actualizar-tareas');
    const icono   = btnActualizar?.querySelector('.icono-actualizar');
    const spinner = btnActualizar?.querySelector('.spinner-cargando');
    let actualizando = false; 

    if (btnActualizar && icono && spinner) {
      btnActualizar.addEventListener('click', async () => {
        if (actualizando) return;
        actualizando = true;

        btnActualizar.style.opacity = '0.5';
        btnActualizar.style.pointerEvents = 'none';
        icono.classList.remove('fade-show');  icono.classList.add('fade-hide');
        spinner.classList.remove('fade-hide'); spinner.classList.add('fade-show');
        
        try {
          if (typeof renderTareas === 'function') renderTareas();
        } catch (err) {
          console.error('❌ Error al actualizar:', err);
        } finally {
          spinner.classList.remove('fade-show'); spinner.classList.add('fade-hide');
          icono.classList.remove('fade-hide');   icono.classList.add('fade-show');
          btnActualizar.style.opacity = '1';
          btnActualizar.style.pointerEvents = 'auto';
          actualizando = false;
        }
      });
    }
  }
} 


/** 
 * Al cargar el DOM:
 *  - Obtiene de localStorage la última card activa ('ultimaCardActiva').
 *  - Si no existe, usa 'proyectos' como valor por defecto.
 *  - Llama a mostrarContenido() para renderizar la vista correspondiente.
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  const ultimaCard = localStorage.getItem('ultimaCardActiva') || 'proyectos';
  mostrarContenido(ultimaCard);
});

// ======================== FIN DASHBOARD ============================= 


// ===================== DETALLE CLIENTE ========================


/**
 * Crea un elemento <div> que representa unn archivo enn la lista de archivos.
 * 
 * - Muestra el nombre del archivo, su fecha y un menú de acciones (Renombrar, Eliminar).
 * - Devuelve el elemento <div> listo para ser insertado en el DOM.
 * 
 * @param {Object} file - Objeto con datos del archivo (file.name, file.date, etc.).
 * @returns {HTMLDivElement} Elemento <div> con el contenido del archivo.
 */ 
const createFileItem = (file) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'file-item mb-2';
  wrapper.innerHTML = `
    <div class='file-item-icon ${file['icon']} text-info mr-3'></div>
    <a href='#' class='file-item-name flex-grow-1'>${file['name']}</a>
    <div class='file-item-changed text-muted mr-2'>${file['date']}</div>
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

 
/**
 * Renderiza el contenido de una carpeta seleccionada.
 * - Cambia el título de la sección a 'Contenido de {folderName}'.
 * - Limpia el contenedor actual.
 * - Si la carpeta está vacía, muestra un mensaje de 'No hay archivos'.
 * - Si tiene archivos, genera los elementos con createFileItem() y los agrega.
 * 
 * @param {string} folderName - Nombre de la carpeta a mostrar. 
 */
const renderFolder = (folderName) => {
  if (folderTitle) folderTitle.textContent = `Contenido de ${capitalize(folderName)}`;
  if (folderContent) folderContent.innerHTML = '';

  const files = folderData[folderName] || [];

  if (files.length === 0) {
    folderContent.innerHTML = `
      <div class='text-center text-muted p-4'>
        <i class='fas fa-folder-open fa-2x mb-2'></i>
        <p class='mb-0'>No hay archivos en esta carpeta</p>
      </div>
    `
    return
  }
  
  files.forEach(file => folderContent.appendChild(createFileItem(file)))
};


/**
 * Convierte la primera letra de un string a mayúscula.
 * 
 * @param {string} str - Texto de entrada. 
 * @returns {string} Texto con la primera letra en mayúscula.
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


/**
 * Si existe la lista de carpetas (folderList):
 * - Escucha clics en la lista.
 * - Detecta qué carpeta (<li data-folder>) fue seleccionada.
 * - Remueve la clase 'active' de todas las carpetas y la aplica a la seleccionada.
 * - Llama a renderFolder() para mostrar su contenido
 */
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


/**
 * Renderiza unn botón de 'Volver' dentro del contenedor #btn-volver-placeholder.
 * 
 * - Si no existe el contenedor, no hace nada.
 * - Inserta el HTML del botón con ícono de flecha.
 * - Si el usuario tiene historial de navegación, usa window.history.back()
 * - Si no hay historial, redirige a index.html.
 * 
 * @returns {void}
 */
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


/**
 * Formatea una fecha en formato dd/mm/yyyy.
 * 
 * - Acepta objetos Date o strings en formato yyyy-mm-dd.
 * - Si la fecha no es válida, returna null.
 * 
 * @param {Date|String} fecha - Fecha a formatear. 
 * @returns  {string|null} Fecha formateada como dd/mm/yyyy o null si es inválida.
 */
function formatearFecha(fecha) {
  if (!fecha) return '';

  // Caso: objeto Date válido
  if (fecha instanceof Date && !isNaN(fecha)) {
    const dd = String(fecha.getDate()).padStart(2, '0');
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const yyyy = String(fecha.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }

  // Caso: string con formato 'yyyy-mm-dd'
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  // Intentar parsear cualquier otro formato de fecha
  const parsed = new Date(fecha);
  if (!isNaN(parsed)) {
    const dd = String(parsed.getDate()).padStart(2, '0');
    const mm = String(parsed.getMonth() + 1).padStart(2, '0');
    const yyyy = String(parsed.getFullYear());
    return `${dd}/${mm}/${yyyy}`;
  }
  return '';
}


/**
 * Cuando el DOM está completamente cargado:
 * - Llama a renderBotonVolver() para insertar el botón de 'Volver'
 *   en el contenedor #btn-volver-plahecolder.
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', renderBotonVolver);




// ====================== FIN BOTON VOLVER =============================


// ====================== NAV BAR ======================================

/**
 * Componente personalizado <app-navbar> que renderiza la barra de navegación superior.
 * 
 * - Lee atributos HTML para personalizar:
 *   - logout-url: URL de cierre de sesión (por defecto '/login.html').
 *   - tooltip-text: Texto del tooltip (por defecto 'Cerrar sesión').
 *   - placement: Posición del tooltip (por defecto 'bottom').
 *   - icon-size: Tamaño del ícono (por defecto 'fa-2x').
 *   - menu-icon-size: Tamaño del ícono de menú (por defecto 'fa-2x').
 *   - clear-keys: Lista de claves de localStorage a limpiar al cerrar sesión.
 * 
 * - Inserta el HTML del navbar con:
 *   - Botón de menú (icono de barras).
 *   - Botón de logout con tooltip.
 * 
 * - Al hacer click en logout:
 *   - Limpia las claves de localStorage indicadas en clear-keys.
 *   - Redirige al logout-url
 * 
 * - Inicializa tooltips compatibles con Bootstrap 4 y 5.
 * 
 * @extends HTMLElement
 */
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
        try { clearKeys.forEach(key => localStorage.removeItem(key)); } catch {}
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

    // Ejecuta inicialización al cargar documento
    document.readyState === 'complete' || document.readyState === 'interactive'
      ? setTimeout(initTooltips, 0)
      : document.addEventListener('DOMContentLoaded', initTooltips)   
  }
}

customElements.define('app-navbar', AppNavbar);

// ====================== FIN NAV BAR ======================================


// ===================== VISTA MINIATURAS EN ESTRUCTURAL Y GRAFICO ===============================
 

/**
 * Inicializa la vista de miniaturas en la seccion de estructural y gráfico.
 * 
 * - Espera a que el DOM esté cargando.
 * - Busca la imagen dentro de .fp-canvas
 */
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
    'data:image/svg+xml;utf8,' +
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


/** 
 * Controla el comportamiento del sidebar (menú lateral) de AdminLTE de forma personalizada.
 * 
 * - Detecta si la pantalla está en modo móvil (< BREAKPOINT).
 * - Implementa función setOpen() para abrir/cerrar el sidebar manualmente.
 * - Captura click en el botón [data-widget='pushmenu'] antes que AdminLTE en móvil
 *   para evitar que AdminLTE maneje el toggle directamente.
 * - Detecta click fuera del sidebar para cerrarlo (en móvil).
 * - Cierra el sidebar si se hace click en el backdrop (overlay).
 * - Permite cerrar con tecla Escape.
 * - Al volver a desktop (> BREAKPOINT), elimina la clase sidebar-open.
 * 
 * Variables clave:
 * @const BREAKPOINT {number} - Ancho en px que separa desktop en móvil.
 * @const isMobile {boolean} - true si innerWidth < BREAKPOINT.
 * @const OPEN_DELAY {number} - Tiempo en ms para permitir cierre tras abrir (antirebote).
 * @let canClose {boolean} - Previene que el sidebar se cierre inmediatamente después de abrirse.
 * 
 * @funciton setOpen
 * @param {boolean} [open] - Estado deseado (true = abrir, false = cerrar).
 *  Si se omite, alterna el estado actual.
 * 
 */
(() => {
  const BREAKPOINT = 1200;
  const isMobile = () => innerWidth < BREAKPOINT;
  let canClose = false;
  const OPEN_DELAY = 220; // antirebote
  const backdrop = document.getElementById('sidebar-backdrop');

  function setOpen(open) {
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


/**
 * Devuelve la clase CSS de badge según el estado del evento.
 * 
 * - Si el estado incluye 'completa' -> devuelve 'badge-completada'
 * - Si el estado incluye 'proceso' -> devuelve el 'bagde-proceso'
 * - En cualquier otro caso -> devuelve 'badge-pendiente'
 * 
 * @param {string} estado - Estado del evento (ej. 'completada', 'en proceso'). 
 * @returns {string} Clase CSS a usar en el badge.
 */
function badgeClase(estado) {
  const e = (estado || '').toLowerCase();
  if (e.includes('completa')) return 'badge-completada';
  if (e.includes('proceso'))  return 'badge-proceso';
  return 'badge-pendiente';
}


/**
 * Renderiza la lista de eventos en el historial según el filtro proporcionado.
 * 
 * - Filtra los eventos de historialEventos que contengan el texto del filtro
 *   en cualquiera de sus campos (fecha, usuario, accion, estado, detalle).
 * - Genera el HTML de cada evento en formato de línea de tiempo (<li>).
 * 
 * @param {string} filtro [filtro=''] - Texto a buscar dentro de los eventos.
 * @returns {voi} 
 */
function renderHistorial(filtro = '') {
  const ul = document.getElementById('listaHistorial');
  const resumen = document.getElementById('resumenHistorial');
  const f = filtro.trim().toLowerCase();

  const filtrados = historialEventos.filter(evento => {
    const blob = `${evento['fecha']} ${evento['usuario']} ${evento['accion']} ${evento['estado']} ${evento['detalle']}`.toLowerCase();
    return blob.includes(f);
  });

  if (ul) {
    ul.innerHTML = filtrados.map(evento => `
    <li class='timeline-item'>
      <span class='dot'></span>
      <div class='title'>${evento['accion']} <span class='badge-state ${badgeClase(evento['estado'])}'>${evento['estado']}</span></div>
      <div class='meta'>
        <span><i class='fa-regular fa-clock'></i> ${evento['fecha']}</span>
        <span><i class='fa-regular fa-user'></i> ${evento['usuario']}</span>
      </div>
      ${evento['detalle'] ? `<div class='desc'>${evento['detalle']}</div>` : ''}
    </li>
  ` ).join('');
    resumen.textContent = `${filtrados.length} evento${filtrados.length !== 1 ? 's' : ''}`;
  } 
}



/** 
 * Inicializa el buscador de historial al cargar el DOM.
 * 
 * - Obtiene el input de búsqueda y el botón de limpiar.
 * - Llama a renderHistorial() en cada cambio de input.
 * - Si se hace click en el botón limpiar, borra el input y vuelve a renderizar.
 */
document.addEventListener('DOMContentLoaded', () => {
  renderHistorial();
  const input = document.getElementById('buscarHistorial');
  const btnClear = document.getElementById('btnLimpiarFiltro');

  if (input) {
    input.addEventListener('input', () => renderHistorial(input.value));
  }

  if(btnClear) {
    btnClear.addEventListener('click', () => { input.value = ''; renderHistorial(''); });
  }
});


/**
 * Muestra el modal del historial
 */
$('#modalHistorial').on('shown.bs.modal', function () {
  renderHistorial(document.getElementById('buscarHistorial').value || '');
});

// BS5 (sin jQuery):
// document.getElementById('modalHistorial').addEventListener('shown.bs.modal', () => renderHistorial(document.getElementById('buscarHistorial').value || ''));

// ======================== FIN MODAL HISTORIAL DE TAREAS =============================


// ======================== EDICION DE CAMPOS EN DISEÑO ESTRUCTURAL =================== 

/**
 * Muestra un toast (notificacion temporal) en el área #toastArea.
 * 
 * - Crea dinámicamente un div con la clase correspondiente al tipo de alerta.
 * - Si hay soporte de Bootstrap (.toast), lo utiliza para mostrar y ocultar.
 * - Si no, aplica transición manual de opacidad y lo elimina después de 3s.
 * 
 * @param {'success'|'info'|'warning'|'danger'} tipo - Tipo de toast (afecta color y estilo). 
 * @param {string} mensaje - Texto del mensaje a mostrar en el toast. 
 * @returns 
 */
function mostrarToast(tipo, mensaje) {
  var area = document.getElementById('toastArea');
  if(!area) { alert(mensaje || 'Operación realizada'); return; }
  var colores = { 'success': 'bg-success text-white', 'info': 'bg-info text-white', 'warning': 'bg-warning text-dark', 'danger': 'bg-danger text-white' };
  var clase = colores[tipo] || colores.info;
  var el = document.createElement('div');
  el.className = 'toast ' + clase;
  el.setAttribute('role','alert'); el.setAttribute('aria-live', 'assertive'); el.setAttribute('aria-atomic', 'true');
  el.innerHTML = '\n    <div class="toast-body d-flex align-items-center justify-content-between">\n      <span>' + (mensaje || "Operación realizada") + '</span>\n      <button type="button" class="ml-3 close text-white" data-dismiss="toast" aria-label="Close">\n        <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n  ';
  area.appendChild(el);
  if(typeof $ === 'function' && $.fn && typeof $.fn.toast === 'function') {
    $(el).toast({ delay: 3000 }).on('hidden.bs.toast', function() { el.remove(); }).toast('show');
  } else {
    el.style.opacity = '1'; setTimeout(function() { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(function() { el.remove(); }, 300); }, 3000);
  }
}


/**
 * Crea un control de edición (input, textarea o select) según el tipo definido en el <td>.
 * 
 * - Si el <td> tiene dataset.opciones, crea un <select> con esas opciones.
 * - Si el tipo es 'textareaa', crea un <textarea>.
 * - Si no, crea un <input> (number o text según tipo).
 *  
 * @param {HTMLTableCellElement} td - Celda de tabla donde se obtienen el valor y atributos. 
 * @returns {HTMLElement} Control de formulario listo para insertar en el DOM.
 */
function crearControlEdicion(td) {
  var valor = (td.textContent || '').trim();
  var tipo = (td.dataset.tipo || 'texto').toLowerCase();
  var opciones = (td.dataset.opciones || '').trim();
  var control;
  if(opciones) {
    control = document.createElement('select');
    control.className = 'form-control form-control-sm';
    opciones.split(',').map(function(v) { return v.trim(); }).forEach(function(op) {
      var opt = document.createElement('option'); opt.value = op; opt.textContent = op; if(op.toLowerCase() === valor.toLowerCase()) opt.selected = true; control.appendChild(opt);
    });
  } else if(tipo === 'textarea') {
    control = document.createElement('textarea'); control.className = 'form-control form-control-sm'; control.rows = 3; control.value = valor;
  } else {
    control = document.createElement('input'); control.className = 'form-control form-control-sm'; control.type = (tipo === 'numero') ? 'number' : 'text'; control.value = valor;
  }
  return control;
}


/**
 * Activa el modo edición en la sección especificada.
 * 
 * - Busca todos los <td data-campo> dentro de la sección.
 * - Limpia su contenido, inserta el control de edición correspondiente
 *   (usando crearControlEdicion) y marca el <td> como editando.
 * - Activa los botones de la sección (toggleBotones).
 * 
 * @param {string} seccionId - ID de la sección a activar en modo edición. 
 * @returns 
 */
function activarEdicion(seccionId) {
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  cont.querySelectorAll('[data-campo]').forEach(function(td) {
    td.dataset.original = (td.textContent || '').trim();
    if(td.dataset.editando === '1') return;
    var control = crearControlEdicion(td); td.innerHTML = ''; td.appendChild(control); td.dataset.editando = '1';
  });
  toggleBotones(seccionId, true);
}


/**
 * Guarda los datos editados de una sección.
 * 
 * - Recorre todos los <td data-campo> dentro de la sección.
 * - Obtiene el valor de los inputs/textarea/select y los compara con el valor original.
 * - Desactiva el modo edición llamando a toggleBotones().
 * - Muestra un toast de confirmación con la cantidad de cambios.
 * - Loguea en consola los datos guardados (útil para enviarlos a backend).
 * 
 * @param {string} seccionId - ID de la sección a guardar.
 * @returns 
 */
function guardarSeccion(seccionId) {
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  var datos = {}; var cambios = 0;
  cont.querySelectorAll('[data-campo]').forEach(function(td) {
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


/**
 * Cancela la edición de una sección y restaura los valores originales.
 * 
 * - Recorre todos los <td data-campo> dentro de la sección.
 * - Restaura el texto original desde td.dataset.original.
 * - Desactiva el modo edición y oculta botones.
 * - Muestra un toast de confirmación con la cantidad de cambios.
 * - Muestra un toast informando que la edición fue cancelada.
 * 
 * @param {string} seccionId - ID de la sección a guardar.
 * @returns 
 */
function cancelarSeccion(seccionId) {
  var cont = document.querySelector('[data-seccion-target="' + seccionId + '"]');
  if(!cont) return;
  cont.querySelectorAll('[data-campo]').forEach(function(td) {
    var original = (td.dataset.original || '').trim();
    td.textContent = original; td.dataset.editando = '0';
  });
  toggleBotones(seccionId, false);
  mostrarToast('info', 'Edición cancelada');
}

/**
 * Muestra u oculta los botones de edición, guardar y cancelar de la sección.
 * 
 * - Busca el contenedor .acciones-seccion que coincida con el data-seccion.
 * - Si el editando = true -> oculta botón editar, muestra botones guardar/cancelar.
 * - Si editando = false -> hace lo inverso
 * @param {string} seccionId - ID de la sección a afectar. 
 * @param {boolean} editando -> true para mostrar botones de guardado/cancelación.
 * @returns 
 */
function toggleBotones(seccionId, editando) {
  var headerBtn = document.querySelector('.acciones-seccion .btn-editar[data-seccion="' + seccionId + '"]');
  if(!headerBtn) return;
  var header = headerBtn.closest('.acciones-seccion');
  var btnEditar = header.querySelector('.btn-editar[data-seccion="' + seccionId + '"]');
  var btnGuardar = header.querySelector('.btn-guardar[data-seccion="' + seccionId + '"]');
  var btnCancelar = header.querySelector(' .btn-cancelar[data-seccion="' + seccionId + '"]');
  if(editando) {
    if(btnEditar) btnEditar.classList.add('d-none');
    if(btnGuardar) btnGuardar.classList.remove('d-none');
    if(btnCancelar) btnCancelar.classList.remove('d-none');
  } else {
    if(btnEditar) btnEditar.classList.remove('d-none');
    if(btnGuardar) btnGuardar.classList.add('d-none');
    if(btnCancelar) btnCancelar.classList.add('d-none');
  }
}


/**
 * Delegación de eventos para los botones de edición de secciones.
 * 
 * - Se asegura de que solo se vincule una vez usando la bandera global
 *   window.__secciones_editables_bind.
 * - Escucha clicks en todo el documento.
 * - Detecta si el click ocurrió en un botón:
 *    - .btn-editar -> llama a activarEdicion(seccionId)
 *    - .btn-guarda -> llama a guardarSeccion(seccionId)
 *    - .btn-cancelar -> llama a cancelarSeccion(seccionId)
 * 
 *@listens click
 */
if(!window.__secciones_editables_bind) {
  window.__secciones_editables_bind = true;
  document.addEventListener('click', function(event) {
    var be = event.target.closest('.btn-editar');
    var bg = event.target.closest('.btn-guardar');
    var bc = event.target.closest('.btn-cancelar');
    if(be) activarEdicion(be.dataset.seccion);
    if(bg) guardarSeccion(bg.dataset.seccion);
    if(bc) cancelarSeccion(bc.dataset.seccion);
  });
}

// ======================== FIN EDICION DE CAMPOS EN DISEÑO ESTRUCTURAL ===================


// ======================== FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =================
 
/**
 * Genera una celda <td> que actúa como etiqueta en una fila de tabla.
 * 
 * - Aplica clases por defecto: text-bold y td fonts.
 * - Permite agregar clases extra opcionales.
 * 
 * @param {string} txt - Texto que se mostrará en la celda.
 * @param {string} [extra=''] - Clases CSS adicionales para personalizar el estilo.
 * @returns {string} HTML de la celda lista para insertar en la tabla.
 */
function tdLabelDS(txt, extra) {
  return `<td class='text-bold td-fonts ${extra || ''}'>${txt}</td>`;
}


/**
 * Genera una celda <td> con el valor de un campo dinámico.
 * 
 * - Aplica clases de estilo y atributos de datos según las propiedades de f.
 * - Admite opciones adicionales (colspan, justificación).
 * - Si f.opciones es un array, se serializa y se agrega como data-opciones.
 * - Si f.tipo existe, se agrega como data-tipo.
 * - Si colspan está definido, se agrega como atributo en el <td>.
 * 
 * @param {Object} f - Objeto que representa el campo. 
 * @param {string} f.campo - Nombre del campo (se guarda en data-campo).
 * @param {string|number|null} f.valor - Valor a mostrar en la celda. 
 * @param {string|Array} [f.opciones] - Opciones de selección (para usar en edición). 
 * @param {string} [f.tipo] - Tipo de dato (texto, numero, etc.). 
 * @param {boolean} [f.justificar] - Si es true, aplica clase text-justify. 
 * @param {Object} [opts] - Opciones adicionales.. 
 * @param {number} [opts.colspan] Permite que la celda ocupe varias columnas.
 * @returns {string} HTML de la celda con su contenido y atributos.
 */
function tdValorDS(f, opts) {
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


/**
 * Genera dinámicamente el contenido de una tabla (<tbody>) a partir de un array de datos.
 * 
 * - Busca el contenedor de la sección y el <tbody> correspondiente.
 * - Acepta dos formatos de data:
 *    1. Array plano de objetos -> se emparejan de 2 en 2 para formar filas [label, valor].
 *    2. Array de arrays -> se usa directamente como filas.
 * - Genera las filas usando tdLabelDS() y tdValorDS() para celdas de etiqueta y valor.
 * - Soporta:
 *    - Filas de ancho completo (fullWidth) -> ocupan colspan 3.
 *    - Justificación de texto (opción justify).
 * 
 * @param {string} seccionId - ID de la sección donde está la tabla (atributo data-seccion-target). 
 * @param {Array} data - Datos a rennderizar. Puede ser unarray plano de objetos o un array de arrays. 
 * @returns {void}
 */
function pintarTablaDesdeArray(seccionId, data) {
  const cont = document.querySelector(`[data-seccion-target='${seccionId}']`);
  if(!cont) return;
  const tbody = cont.querySelector('tbody');
  if(!tbody) return;

  // Determinar si es array plano (no array de arrays)
  const isFlat = Array.isArray(data) && data.length > 0 && !Array.isArray(data[0]);
  let filas = [];

  if(isFlat) {
    for(let i=0; i<data.length; i++) {
      const a = data[i];
      if(a && (a.fullWidth || a.colspan)) {
        filas.push([a]); // sila de ancho completo
        continue;
      }
      let b = null;
      if(i+1 < data.length) {
        const next = data[i+1];
        if(next && !(next.fullWidth || next.colspan)) {
          b = next; i++; // Saltar el siguiente porque ya se emparejó
        }
      }
      filas.push([a, b]);
    }
  } else {
    filas = data || []; // empareja en una fila [izquierda, derecha]
  }

  const html = filas.map(row => {
    if(!Array.isArray(row) || row.length === 0) return '';

    // Fila de ancho completo
    if(row.length === 1 && (row[0].fullWidth || row[0].colspan)) {
      const f = row[0];
      return `<tr>${tdLabelDS(f.label, 'col-title')}${tdValorDS(f, {'colspan': 3, 'justificar': true})}</tr>`;
    } else {
      const left = row[0] || {};
      const right = row[1] || null;
      let s = `<tr>${tdLabelDS(left.label || '')}${tdValorDS(left)}`;
      if(right) { 
        s += `${tdLabelDS(right.label || '')}${tdValorDS(right)}`; 
      } else { 
        s += '<td></td><td></td>'; // Espacio vacío si no hay segunda columna
      }
        s += '</tr>'; 
      return s;
    }
  }).join('');

  tbody.innerHTML = html;
}

// ======================== FIN FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =================

/**
 * Obtiene el proyecto y pieza a mostrar según los parámetros de la URL.
 * 
 * - Lee los parámetros 'id' (proyecto) y 'pieza' de la query string.
 * - Busca el proyecto con ese id en PETICION.proyectos.
 * - Si no existe o no hay id en la URL, usa el primer proyecto disponible.
 * - Devuelve el proyecto y la pieza correspondiente (índice indicado o la primera).
 * 
 * @returns {{proy: Object|null, pieza: Object|null}} Proyecto y piezas seleccionados.
 */
function obtenerProyectoYPieza() {
  const qs = new URLSearchParams(location.search);
  const idProyecto = qs.get('id'); // viene de la lista
  const idxPieza   = parseInt(qs.get('pieza')||'0', 10) || 0;

  // 1) Buscar por id si viene en la URL
  let proy = PETICION.proyectos.find(p => String(p.id) === String(idProyecto));

  // 2) Si no hay id o no existe, usar el primero disponible
  if (!proy) proy = PETICION.proyectos[0];

  // 3) Pieza (por ahora 0 si no se indica)
  const pieza = (proy && Array.isArray(proy.piezas) && proy.piezas[idxPieza]) || proy.piezas[0];

  return { proy, pieza };
}


/**
 * Al cargar el DOM:
 * - Llama a obtenerProyectoYPieza() para determinar qué proyecto y pieza mostrar.
 * - Si no existe contexto o pieza, no hace nada.
 * - Pinta las tres secciones de la tabla: diseño estructural, datos troquel y propiedades,
 *   usando los arrays correspondientes de la pieza.
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  const ctx = obtenerProyectoYPieza();
  if (!ctx || !ctx.pieza) return;

  // Ahora sí: pintar cada sección con los arrays correctos
  pintarTablaDesdeArray('diseno-estructural', ctx.pieza.DATA_DISENO_ESTRUCTURAL || []);
  pintarTablaDesdeArray('datos-troquel',      ctx.pieza.DATA_DATOS_TROQUEL      || []);
  pintarTablaDesdeArray('propiedades',        ctx.pieza.DATA_PROPIEDADES        || []);
});

// ======================== FIN FUNCIONALIDAD DE TABLAS EN DISEÑO ESTRUCTURAL =============


/**
 * Busca un objeto en el arreglo que tenga la propiedad 'campo' con el mismo nombre.
 * Si lo encuentra, devuelve su propiedad 'valor'.
 * Si no lo encuentra, devuelve el valor de fallback (o '--' si no se define).
 * 
 * @param {Array} arr - Arreglo de objetos a recorrer.
 * @param {String} campo - Nombre del campo a buscar.
 * @param {string} fallback - Valor alternativo en caso de no encontrar el campo.
 * @returns {*} - Valor encontrado o el fallback.
 */
function getVal(arr, campo, fallback) {
  const f = (arr || []).find(x => x.campo === campo);
  return f ? f.valor : (fallback ?? '—');
}
 

/**
 * Escapa caracteres especiales en un string para evitar inyección de HTML.
 * Convierte &, <, > y " a sus equivalentes HTML
 * 
 * @param {string|null|undefined} s - Texto a escapar. 
 * @returns {string}
 */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}


/**
 * Crea dos celdas <td> en formato HTML.
 * La primera celda contiene el label en negrita.
 * La segunda celda contiene el valor (escapado) y lo usa también en el atributo title.
 *  
 * @param {string} label - Etiqueta de la fila.
 * @param {string} valor - Valor de la fila.
 * @returns {string} - Cadena HTML con las dos celdas.
 */
function tdPar(label, valor) {
  const v = esc(valor);
  return `
    <td class='text-bold td-fonts'>${esc(label)}</td>
    <td class='td-fonts' title='${v}'>${v}</td>
  `;
} 


/**
 * Genera el  HTML de la tarjeta de 'Diseño Gráfico' para un proyecto.
 * 
 * - Recibe la URL de la imagen y los datos del proyecto.
 * - Construye una card con:
 *    - Título 'Diseño Gráfico'
 *    - Tabla con campos estáticos: No Boceto, No Impresión, Estado, Tipo de impresión,
 *      FSC Impreso, Asignado.
 *    - Imagen de vista previa del diseño gráfico (imgUrl).
 *    - Botón para ver detalles y tareas, que redirecciona a 'grafico_detalle'.
 *  
 * @param {string} imgUrl - URL de la imagen a mostrar como vista previa.
 * @param {Object} proy - Objeto del proyecto (puede usarse para datos dinámicos en el futuro). 
 * @returns {string} HTML completo de la card listo para innsertarse en el DOM.
 */
const renderCardGrafico = (imgUrl = '/assets/nestle.png', proy) => `
  <div class='col-xl-6 col-12 mb-4'>
    <div class='card card-info shadow-sm'>
      <div class='card-header text-center'>
        <h5>Diseño Gráfico</h5>
      </div> 
      <div class='card-body p-0 d-flex flex-column'>
        <div class='table-responsive'>
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
              <tr>
                <td colspan='4' class='p-3'>
                  <div class='media-frame card-outline-cut card-outline-dashed'>
                    <img src='${imgUrl}' alt='Vista previa de diseño gráfico'>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class='text-center mt-auto pb-2'>
          <button type='button' onclick='redireccionPagina("grafico_detalle")' class=' mb-1 btn btn-info pb-2 pt-2' style='font-size:16px;'>
            Ver detalles y tareas <i class='fa-solid fa-chevron-right'></i>
          </button>
        </div>
      </div>
    </div>
  </div>
`;


/* ======================================
  TARJETAS ROJA + CELESTE (por proyecto)
========================================= */

/**
 * Renderiza la lista de proyectos de diseño estructural en la interfaz.
 * 
 * 1. Busca el elemento con id 'lista-proyectos-estructural' en el DOM.
 * 2. Recorre el array de proyectos recibido en 'peticion.proyectos'.
 * 3. Para cada proyecto:
 *    - Obtiene su primera pieza y los datos de diseño estructural.
 *    - Usa getVal() para extraer los valores relevantes.
 *    - Alterna imágenes según el índice del proyecto.
 *    - Construye una tarjeta dinámicamente con:
 *        - Título y número de proyecto.
 *        - Tabla de datos clave (No. Muestra, Troquel, Estado, Asignado, Proveedor).
 *        - Imagen de vista previa estructural.
 *        - Botón de redirección a la vista de detalle.
 *        - Llamada a renderCarGrafico() para la parte gráfica.
 * 4. Inserta el HTML resultante en el contenedor.
 * 
 * @param {Object} peticion - Objeto que contiene la propiedad 'proyectos' (array).
 */
function renderProyectosEstructuralYGraficoFijo(peticion) {
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
    const redImg  = idx % 2 === 0 ? '/assets/ard.png'    : '/assets/troquel.png';
    const blueImg = idx % 2 === 0 ? '/assets/nestle.png' : '/assets/palet.png';
    html += `
    <div class='grupo-disenos mb-4 mt-5'>
      <h2><span class='badge badge-secondary'>Proyecto No. ${esc(idx+1)}</span></h2> 
      <div class='row equalize-pair mt-3'> 
        <div class='col-xl-6 col-12 mb-4'>
          <div class='card card-danger shadow-sm d-flex flex-column'>
            <div class='card-header text-center'><h5>Diseño Estructural</h5></div> 
            <div class='table-responsive'>
              <table class='table table-striped mb-0'>
                <tbody>
                  <tr>${tdPar('N° Muestra:', nMuestra)}${tdPar('N° Troquel:', nTroquel)}</tr>
                  <tr>${tdPar('Estado Muestra:', eMuestra)}${tdPar('Estado Troquel:', eTroquel)}</tr>
                  <tr>${tdPar('Asignado:', asignado)}${tdPar('Proveedor:', proveedor)}</tr>
                  <tr>
                    <td colspan='4' class='p-3'>
                      <div class='media-frame'>
                        <img src='${esc(redImg)}' alt='Vista previa estructural'>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 
            <div class='text-center mt-auto pb-2'>
              <button type='button' onclick='redireccionPagina("estructural_detalle")' class='mb-1 btn btn-danger pb-2 pt-2' style='font-size:16px;'>
                Ver detalles y tareas <i class='fa-solid fa-chevron-right'></i>
              </button>
            </div>
          </div>
        </div>  
        ${renderCardGrafico(blueImg, proy)}
      </div>
    </div>`;
  }); 
  host.innerHTML = html;
}


/**
 * Asegura que exista en el DOM un contenedor para la comparación de calidad.
 * 
 * - Busca el elemento con id='comparación-calidad'.
 * - Si no existe, lo crea dinámicamente y lo inserta:
 *    - Justo después de $lista-proyectos-estructural si existe.
 *    - Si no, al final del primer .card-body o en un document.body.
 * 
 * @returns {HTMLElement} El elemento contenedor (existente o recién creado).
 */
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


/**
 * Normaliza un string para usarlo como clave única de calidad.
 * 
 * - Convierte a string seguro.
 * - Elimina espacios en blanco repetidos.
 * - Aplica trim() para quitar espacios al inicio y final.
 * 
 * @param {string} s - Cadena original. 
 * @returns {string} Cadena normalizada y lista para usar como key.
 */
function normalizarClaveCalidad(s) {
  return String(s || '')
    .replace(/\s+/g,' ')
    .trim(); // clave estable
}


/**
 * Recolecta todas las calidades de los proyectos en la petición.
 * 
 * - Recorre cada proyecto y su primera pieza.
 * - Obtiene la propiedad 'calidad' desde DATA_PROPIEDADES usando getVal().
 * - Si existe, agrega un objeto con:
 *    - Índice del proyecto.
 *    - Nombre del proyecto y pieza.
 *    - Texto de calidad.
 *    - Clave normalizada (para usar como key única).
 * 
 * @param {Object} peticion - Objeto que contiene la lista de proyectos. 
 * @returns {Array<Object>} Lista de objetos con información de calidades.
 */
function recolectarCalidades(peticion) {
  const items = [];
  const proyectos = (peticion && peticion.proyectos) || [];
  proyectos.forEach((proy, pIdx) => {
    const pieza = (proy.piezas && proy.piezas[0]) || null;
    if(!pieza) return;
    const props = pieza.DATA_PROPIEDADES || [];
    const calidad = getVal(props, 'calidad', '');
    if(!calidad) return;
    items.push({
      'proyectoIndex': pIdx + 1,
      'proyectoNombre': proy.nombre || `Proyecto ${pIdx+1}`,
      'piezaNombre': pieza.nombre || 'Pieza',
      calidad,
      'key': normalizarClaveCalidad(calidad)
    });
  });
  return items;
}


/**
 * Al cargar el DOM:
 * - Verifica si existe la variable global PETICION.
 * - Si está definida, llama a renderProyectosEstructuralYGraficoFijo()
 *   para renderizar las tarjetas de proyectos en la interfaz.
 */
document.addEventListener('DOMContentLoaded', function() {
  // 1) Tarjetas por proyecto (roja/celeste)
  if (typeof PETICION !== 'undefined') {
    renderProyectosEstructuralYGraficoFijo(PETICION);
  } 
}); 


// ========================= CREAR PROYECTO EN AS400 - FEATURE ARRASTRAR =========================

/**
 * Al cargar el DOM:
 *  - Prepara métodos y variables para poder arrastrar elementos de un lado a otro.
 */
document.addEventListener('DOMContentLoaded', () => {
  const LEFT  = document.querySelector('#todo-left');
  const RIGHT = document.querySelector('#todo-right');
  const root = document.documentElement;
  const lists = document.querySelectorAll('.drop-target');
  const left  = document.getElementById('todo-left');
  const right = document.getElementById('todo-right');
  const selBadge = document.getElementById('sel-count');let draggingEl = null;
  const dropHint = document.getElementById('drop-hint');
  const fab = document.querySelector('.drag-fab');

  const COMMON = {
    'group': { 
      'name': 'todos',
      'pull': true, 
      'put': true 
    },
    'draggable': 'li',
    'handle': null,                 // arrastrar desde cualquier parte
    'animation': 150,
    'forceFallback': true,          // drag más “firme” que el nativo
    'fallbackOnBody': true,
    'fallbackTolerance': 2,         // no exige mover mucho para iniciar
    'filter': '.tools, .remove-btn, input, label, a, button', // 👈 SIN .badge
    'preventOnFilter': true
  };


  if (!LEFT || !RIGHT) return;                 // esta página no usa DnD

  if (window.__as400DnDInitialized) return;    // evita doble init
  window.__as400DnDInitialized = true;

  function boot() { 

    /**
     * Reproduce la animación de 'drop' cuando un elemento es soltado.
     * 
     * - Reinicia la animación removiendo y re-agregando la clase CSS 'anim-drop'.
     * - Si el elemento tiene un título (.item.title), también le aplica animación.
     * 
     * @param {HTMLElement} li - Elemento <li> al que se le aplicará la animación. 
     */
    function playDropAnimation(li) {
      li.classList.remove('anim-drop');
      void li.offsetWidth; // Fuerza reflow para reiniciar animación
      li.classList.add('anim-drop');

      const title = li.querySelector('.item-title');
      if (title) {
        title.classList.remove('anim-title');
        void title.offsetWidth;
        title.classList.add('anim-title');
      }
    }


    /**
     * Alterna las clases de estado para indicar si el drag está sobre el lado izquierdo
     * 
     * @param {HTMLElement} toEl - Elemento sobre el que se está haciendo dragover. 
     */
    const updateDragSide = (toEl) => { 
      root.classList.toggle('drag-over-right', toEl === right);
      root.classList.toggle('drag-over-left',  toEl === left);
    };


    /**
     * Limpia el estado 'is-hover' de todas las listas.
     */
    const clearHover = () => lists.forEach(ul => ul.classList.remove('is-hover'));
    

    /**
     * Aplica la clase que marca al elemento como agregado en la lista derecha.
     * 
     * @param {HTMLElement} li - Elemento <li> al que se le aplicará el estilo. 
     */
    function applyRightStyle(li) {            
      li.classList.add('in-right');
    }


    /**
     * Marca el elemento que se está arrastrando para previsualizarlo en la lista derecha.
     * 
     * - Si el destino es la lista derecha, agrega la clase preview-right.
     * - Si no, la remueve.
     * 
     * @param {*HTMLElement} toEl - Elemento donde se está haciendo dragover. 
     */
    const setDragPreview = (toEl) => {
      if (!draggingEl) return;
      if (toEl === right) draggingEl.classList.add('preview-right');
      else draggingEl.classList.remove('preview-right');
    };


    /**
     * Restaura el estilo original del elemento, quitando la clase de 'in-right'.
     * 
     * @param {HTMLElement} li - Elemento que debe volver a su estado original. 
     */
    function restoreLeftStyle(li) {           
      li.classList.remove('in-right');
    }

    
    /**
     * Actualiza las clases de los contenedores izquierdo y derecho según si están vacíos o tienen elementos.
     * 
     * - Si el lado izquierdo no tiene <li>, agrega 'is-empty'.
     * - Si el lado derecho tiene elementos, agrega 'has-items'.
     */
    function refreshEmptyStates() {
      left.classList.toggle('is-empty',  left.querySelectorAll(':scope > li').length === 0);
      right.classList.toggle('has-items', right.querySelectorAll(':scope > li').length > 0); // oculta “+AS400”
    }


    /**
     * Actualiza el contador de elementos en la lista derecha y muestra u oculta el indicador de ayuda.
     * 
     * - Cuenta los elementos en la lista derecha.
     * - Actualiza el texto de selBadge.
     * - Llama a refreshEmpyStates() para ajustar el estado visual de las listas.
     * - Muestra/oculta el dropHint y el botón flotante (.drag-fab) dependiendo si hay elementos.
     */
    function updateCount() {
      const n = right.querySelectorAll(':scope > li').length;
      selBadge.textContent = n;
      refreshEmptyStates(); 
      if (dropHint) dropHint.style.display = n > 0 ? 'none' : 'block'; 
      document.querySelector('.drag-fab')?.classList.toggle('d-none', n > 0);
    }


    /**
     * Mueve un elemento <li> de vuelta a la lista izquierda.
     * 
     * - Remueve el botón de eliminar si existe.
     * - Restaura el estilo original del elemento (quitando 'in-right').
     * - Lo agrega de nuevo al contenedor de la lista izquierda.
     * - Actualiza el contador de elementos (y de estados vacíos).
     * 
     * @param {HTMLElement} li - Elemento de lista a mover a la izquierda. 
     */
    function moveBackToLeft(li) {
      li.querySelector('.remove-btn')?.remove();
      restoreLeftStyle(li);
      left.appendChild(li);
      updateCount();
    }

    
    /**
     * Agrega un botón de eliminar (icono de 'x') a un elemento <li> en la lista derecha.
     * 
     * - Si el elemento ya tiene un botón de eliminar, no hace nada.
     * - Si no existe un contenedor .tools, lo crea y lo agrega al <li>.
     * - Crea un botón <i> con icono de 'x' y evento click que llama a moveBackToLeft().
     * 
     * @param {HTMLElement} li - Elemento de lista al que se le agregará el botón.  
     */
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
    // ===== IZQUIERDA
    /**
     * Inicializa el comportamiento de arrastrar/soltar (drag & drop) para la lista izquierda/derecha.
     * 
     * - Usa la configuración común (...COMMON) y desactiva el reordenamiento interno (sort: false).
     * - Define callbakcs para cada etapa del drag:
     * 
     * @listens onStart
     *  - Guarda el elemento que se está arrastrando (draggingEl).
     *  - Activa clases visuales en la lista derecha y el botón flotante.
     *  - Marca visualmente la lista de origen y muestra previsualización.
     * 
     * @listens onAdd
     *  - Cuando un elemento se suelta en la lista izquierda:
     *    - Quita su botón de eliminar si lo tenía.
     *    - Restaura su estilo original.
     *    - Actualiza el contador y los estados vacíos.
     *   
     * @listens onMove
     *  - Mientras se mueve el elemento:
     *    - Limpia hover en todas las listas y lo aplica en la lista actual.
     *    - Actualiza el lado de destino (izquierda/derecha).
     *    - Actualiza la previsualización.
     * 
     * @listens onEnd
     *  - Cuando termina el arrastre:
     *    - Quita clases visuales de las listas y el botón flotante.
     *    - Limpia el estado de arrastre y resetea draggingEl.
     */
    Sortable.create(left, {
      ...COMMON,
      'sort': false, 
      'onStart': (evt) => {
        draggingEl = evt.item;
        right.classList.add('is-active');
        fab?.classList.add('is-dragging');
        updateDragSide(evt.from);
        setDragPreview(evt.from);                 
      },

      'onAdd': (evt) => {
        const el = evt.item;
        el.querySelector('.remove-btn')?.remove();
        restoreLeftStyle(el);
        updateCount();
      },

      'onRemove': updateCount, 
      'onMove': (evt) => {
        clearHover();
        evt.to.classList.add('is-hover');
        updateDragSide(evt.to);
        setDragPreview(evt.to);                   
      },

      'onEnd': () => {
        right.classList.remove('is-active');
        fab?.classList.remove('is-dragging');
        clearHover();
        root.classList.remove('drag-over-right', 'drag-over-left');
        draggingEl?.classList.remove('preview-right');  
        draggingEl = null;
      },
      
    });


    // ===== DERECHA
    /**
     * Inicializa el drag & drop para la lista derecha.
     * 
     * - Hereda opciones comunes (...COMMON) y permite reordenar internamente (sort: true)
     * - Callbacks:
     * 
     * @listens onStart
     *  - Guarda el item arrastrado(draggingEl).
     *  - Activa clases visuales en la lista derecha y el botón flotante (fab).
     *  - Marca el lado de origen y muestra previsualización.
     * 
     * @listens onAdd
     *  - Al soltar un elemento en la derecha:
     *    - Aplica estilo de 'en derecha' (in-right).
     *    - Añade botón para quitarlo (addRemovebutton).
     *    - Reproduce animación de drop.
     *    - Actualiza contador/estados.
     * 
     * @listens onSort
     *  - Al reordenar dentro de la derecha, actualiza el contador.
     * 
     * @listens onRemove
     *  - Si un item sale de la derecha, actualiza el contador.
     * 
     * @listens onMove
     *  - Durante el drag:
     *    - Limpia hover global y lo aplica en la lista actual.
     *    - Actualiza lado de destino y previsualización.
     * 
     * @listens onEnd
     *  - Al terminar el drag:
     *    - Limpia calses visuales (lista, fab y root).
     *    - Quita previsualización y resetea draggingEl.
     */
    Sortable.create(right, {
      ...COMMON,
      'sort': true,
      'onStart': (evt) => {
        draggingEl = evt.item;
        right.classList.add('is-active');
        fab?.classList.add('is-dragging');
        updateDragSide(evt.from);
        setDragPreview(evt.from);              
      },

      'onAdd': (evt) => {
        const el = evt.item;
        applyRightStyle(el);
        addRemoveButton(el);
        playDropAnimation(el);  
        updateCount();
      },

      'onSort':  updateCount,
      'onRemove':updateCount,
      'onMove': (evt) => {
        clearHover();
        evt.to.classList.add('is-hover');
        updateDragSide(evt.to);
        setDragPreview(evt.to);                   
      },

      'onEnd': () => {
        right.classList.remove('is-active');
        fab?.classList.remove('is-dragging');
        clearHover();
        root.classList.remove('drag-over-right', 'drag-over-left');
        draggingEl?.classList.remove('preview-right');
        draggingEl = null;
      },
    });

    
    /**
     * Evento para el botón 'Limpiar' (btn-clear)
     * Este evento se dispara cuando el usuario hace click en el botón de limpiar.
     * - Obtiene un array con los IDs (dataset.id) de todos los elementos <li> que están en la lista de la derecha (.right).
     * - Los mueve de regreso a la.
     * - Si hay elementos, muestra una alerta simulando el envío de los IDs al sistema AS/400.
     *   (La parte de fetch está comentada, pero serviría para enviar los datos al backend usando POST)
     */
    document.getElementById('btn-clear')?.addEventListener('click', () => {
      [...right.querySelectorAll(':scope > li')].forEach(li => moveBackToLeft(li));
      updateCount();
    });

  
    /**
     * Evento para el botón 'Crear' (btn-create)
     * Este evento se dispara cuando el usuario hace click en el botón de crear.
     * - Obtiene un array con los IDs (dataset.id) de todos los elementos <li> que están en la lista de la derecha.
     * - Si no hay elementos seleccionados, muestra una alerta pidiendo al usuario que añada al menos uno.
     * - Si hay elementos, muestra una alerta simulando el envío de los IDs al sistema AS/400.
     *   (La parte de fetch está comentada, pero serviría para enviar los datos al backend usando POST)
     */
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

     
    (function normalizeInitialStyles() {
      right.querySelectorAll(':scope > li').forEach(applyRightStyle);
      left .querySelectorAll(':scope > li').forEach(restoreLeftStyle);
    })();

    // Estado inicial
    updateCount();

    // ==== helpers
    function getProp(arr, campo) {
      const it = (arr || []).find(x => x.campo === campo);
      return it ? it.valor : '—';
    }

    // ==== render como LISTA (viñetas)
    function renderLeftFromJson(PETICION) {
      const left = document.getElementById('todo-left');
      left.innerHTML = ''; 
      PETICION.proyectos.forEach(proy => {
        (proy['piezas'] || []).forEach(pieza => {
          const props   = pieza['DATA_PROPIEDADES'] || [];
          const tipo    = getProp(props, 'tipo_papel');
          const calidad = getProp(props, 'calidad');
          const canal   = getProp(props, 'canal');
          const ref     = getProp(props, 'referencia');

          const li = document.createElement('li');
          li['dataset']['id'] = `${proy['id']}-${pieza['id']}`;

          li.innerHTML = ` 
            <div class='item-main fadeInUp-animation'> 
              <div class='item-title'>${proy['nombre']} — ${pieza['nombre']}</div>
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
    console.log('📊 Respuesta JSON clientes:', result);
    return result;
  } catch (error) {
    console.error('❌ Error en getData:', error); 
    return [];
  }
}


// RENDERIZAR TABLA

function renderTablaclientesComercial(clientes) {
  const tbody = document.getElementById('tabla-clientes');
  
  if(!tbody) {
    console.warn('No se encontró  #tabla-clientes');
    return;
  }

  tbody.innerHTML = '';
  clientes.forEach(cliente => {
    const inicial = cliente['nombre'].trim().charAt(0).toUpperCase();
    const fila = `
      <tr class='fila-cliente' data-codigo='${cliente['codigo']}' style='cursor: pointer;'>
        <td class='col-cliente'>
          <div class='d-flex align-items-center'>
            <div class='avatar-circle mr-3'>${inicial}</div>
            <div>
              <div class='font-weight-bold info-destacada'>${cliente['nombre']}</div>
            </div>
          </div>
        </td>
        <td class='col-codigo'>
          <div class='info-destacada'>${cliente['codigo']}</div>
        </td>
        <td class='col-acciones'>
          <button class='btn btn-sm btn-info'><i class='fas fa-edit'></i></button>
          <button class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i></button>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML('beforeend', fila);
  });

  // Delegación de click de fila (igual que tenías)
  tbody.addEventListener('click', (e) => {
    const fila = e.target.closest('.fila-cliente');
    if (!fila) return;
    const codigo = fila.dataset.codigo;
    redireccionPagina('cliente');
  });

  // === Paginación/DataTable (misma config que el ejemplo) ===
  const tabla = document.querySelector('#tabla-clientes')?.closest('table');
  if (tabla && !$.fn.DataTable.isDataTable(tabla)) {
    const dt = $(tabla).DataTable({
      'responsive': true,
      'lengthChange': false,
      'autoWidth': false, 
      'pageLength': 25, // (opcional) fija 10 por página
      'buttons': [
        { 
          'extend': 'excelHtml5', 
          'text': '📊 Excel', 
          'exportOptions': { 
            'columns': ':visible' 
          } 
        },
        {
          'extend': 'pdfHtml5',
          'text': '📄 PDF',
          'orientation': 'landscape',
          'pageSize': 'A4',
          'exportOptions': { 
            'columns': ':visible' 
          },
          'customize': function (doc) {
            doc.styles.tableHeader = { 
              'fillColor': '#003366', 
              'color': 'white', 
              'bold': true, 
              'fontSize': 10 
            };
            if (doc.content[1] && doc.content[1].table && doc.content[1].table.body && doc.content[1].table.body[0]) {
              doc.content[1].table.body[0].forEach(function (headerCell) { headerCell.alignment = 'center'; });
              doc.defaultStyle.fontSize = 8;
              doc.defaultStyle.alignment = 'left';
              doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
              var rowCount = doc.content[1].table.body.length;
              for (var i = 1; i < rowCount; i++) {
                if (i % 2 === 0) {
                  doc.content[1].table.body[i].forEach(function (cell) { cell.fillColor = '#f3f3f3'; });
                }
              }
              var objLayout = {
                'hLineWidth': function() { return 0.5; },
                'vLineWidth': function() { return 0.5; },
                'hLineColor': function() { return '#cccccc'; },
                'vLineColor': function() { return '#cccccc'; },
                'paddingLeft': function() { return 4; },
                'paddingRight': function() { return 4; },
                'paddingTop': function() { return 2; },
                'paddingBottom': function() { return 2; }
              };
              doc.content[1].layout = objLayout;
            }
          }
        }
      ],
      'language': {
        'lengthMenu': '📄 Mostrar _MENU_ registros por página',
        'zeroRecords': '⚠️ No se encontraron resultados',
        'info': '📊 Viendo <b>_START_ → _END_</b> de un total de <b>_TOTAL_</b> registros',
        'infoEmpty': '📊 No hay registros para mostrar',
        'infoFiltered': '(filtrado de <b>_MAX_</b> registros totales)',
        'search': '🔍 Buscar:',
        'paginate': {
          'first': '⏮️ Primero',
          'last': '⏭️ Último',
          'next': '➡️ Siguiente',
          'previous': '⬅️ Anterior'
        }
      }, 
      'initComplete': function () {
        const w = document.querySelector('.content-wrapper.fadeInUp-animation');
        if (w) w.classList.add('is-ready');
      }
    });

    // Colocar los botones como en tu ejemplo, sin requerir ID del <table>
    dt.buttons().container().appendTo($(dt.table().container()).find('.col-md-6:eq(0)'));
  }
} 

// FIN RENDERIZAR TABLA 

document.addEventListener('DOMContentLoaded', async () => {
  const clientes = await getListadoClientesComercial();
  listadoClientes = clientes;
  console.log('Listado clientes listo para render');
  renderTablaclientesComercial(clientes);
});

getListadoClientesComercial(); 

// ========================= FIN FETCHES API ===================


// ======================== DATA DE CLIENTES =================== 
/* VARIABLES */ 

// Envío muestras (Data quemada mientras el api está apagada)
const enviomuestras = [
  {
    'id': 26,
    'empresa': 'BERVIBOX, S.L.',
    'nombre': 'Agregada Direccion',
    'personaContacto': 'dirne',
    'telefono': '122212121',
    'direccion': 'Nueva direccion agregada',
    'codigoPostal': '32323',
    'ciudad': 'Valencia',
    'pais': 'España'
  },
  {
    'id': 22,
    'empresa': 'Cartonajes BernabeU',
    'nombre': 'nuevo contacto',
    'personaContacto': '16',
    'telefono': '111111111',
    'direccion': 'Nueva dirección test',
    'codigoPostal': '123321',
    'ciudad': 'Ciudad',
    'pais': 'España'
  }
]

// Envío de mercancías (direcciones de entrega) (Data quemada mientras el api está apagada)
const envioMercancias = [
  {
    'id': 200,
    'descripcion': 'Almacén central',
    'direccion': 'Av. de América 123',
    'codigoPostal': '28028',
    'ciudad': 'Madrid',
    'pais': 'España',
    'alturaMaxima': 220,
    'listadoPalets': 'EURO 80x120',
    'puedeSobresalir': false,
    'paletTablero': true,
    'cantoneras': true,
    'flejado': true,
    'retractilado': true,
    'observacionesPaletizado': 'Usar cantoneras en las 4 esquinas',
    'horarioDescarga': '08:00-14:00',
    'cliente': 443
  },
  {
    'id': 201,
    'descripcion': 'Tienda Diagonal',
    'direccion': 'C/ Aragó 77',
    'codigoPostal': '08015',
    'ciudad': 'Barcelona',
    'pais': 'España',
    'alturaMaxima': 190,
    'listadoPalets': 'AMERICANO 100x120',
    'puedeSobresalir': true,
    'paletTablero': false,
    'cantoneras': false,
    'flejado': true,
    'retractilado': false,
    'observacionesPaletizado': 'Admiten ligera sobresalida lateral',
    'horarioDescarga': '09:00-13:00',
    'cliente': 443
  },
  {
    'id': 202,
    'descripcion': 'Plataforma Levante',
    'direccion': 'C/ San Vicente 12',
    'codigoPostal': '46002',
    'ciudad': 'Valencia',
    'pais': 'España',
    'alturaMaxima': 240,
    'listadoPalets': 'EURO 80x120',
    'puedeSobresalir': false,
    'paletTablero': true,
    'cantoneras': true,
    'flejado': false,
    'retractilado': true,
    'observacionesPaletizado': 'Retractilar bien la parte superior',
    'horarioDescarga': '07:30-15:00',
    'cliente': 443
  },
  {
    'id': 203,
    'descripcion': 'Cliente Sur',
    'direccion': 'Av. de la Constitución 5',
    'codigoPostal': '41001',
    'ciudad': 'Sevilla',
    'pais': 'España',
    'alturaMaxima': 200,
    'listadoPalets': 'ANCHO 120x120',
    'puedeSobresalir': false,
    'paletTablero': false,
    'cantoneras': true,
    'flejado': false,
    'retractilado': true,
    'observacionesPaletizado': 'Evitar flejado por normativa interna',
    'horarioDescarga': '10:00-18:00',
    'cliente': 443
  },
  {
    'id': 204,
    'descripcion': 'Delegación Norte',
    'direccion': 'C/ Gran Vía 4',
    'codigoPostal': '48001',
    'ciudad': 'Bilbao',
    'pais': 'España',
    'alturaMaxima': 210,
    'listadoPalets': 'EURO 80x120',
    'puedeSobresalir': false,
    'paletTablero': false,
    'cantoneras': false,
    'flejado': true,
    'retractilado': true,
    'observacionesPaletizado': '',
    'horarioDescarga': '08:00-12:00',
    'cliente': 443
  },
  {
    'id': 205,
    'descripcion': 'Zona Logística PLAZA',
    'direccion': 'C/ Ebro 33',
    'codigoPostal': '50197',
    'ciudad': 'Zaragoza',
    'pais': 'España',
    'alturaMaxima': 230,
    'listadoPalets': 'AMERICANO 100x120',
    'puedeSobresalir': true,
    'paletTablero': true,
    'cantoneras': false,
    'flejado': true,
    'retractilado': false,
    'observacionesPaletizado': 'Admiten sobresalida solo frontal',
    'horarioDescarga': '06:00-14:00',
    'cliente': 443
  },
  {
    'id': 206,
    'descripcion': 'Muelle Costa',
    'direccion': 'Pº del Parque 18',
    'codigoPostal': '29016',
    'ciudad': 'Málaga',
    'pais': 'España',
    'alturaMaxima': 185,
    'listadoPalets': 'EURO 80x120',
    'puedeSobresalir': false,
    'paletTablero': false,
    'cantoneras': true,
    'flejado': false,
    'retractilado': false,
    'observacionesPaletizado': 'Altura limitada por portón',
    'horarioDescarga': '11:00-17:00',
    'cliente': 443
  },
  {
    'id': 207,
    'descripcion': 'Parque Empresarial Oeste',
    'direccion': 'Av. Juan Carlos I 90',
    'codigoPostal': '30008',
    'ciudad': 'Murcia',
    'pais': 'España',
    'alturaMaxima': 225,
    'listadoPalets': 'ANIFE 100x120',
    'puedeSobresalir': false,
    'paletTablero': true,
    'cantoneras': true,
    'flejado': true,
    'retractilado': true,
    'observacionesPaletizado': 'Requieren tablero por normativa PRL',
    'horarioDescarga': '08:30-16:30',
    'cliente': 443
  },
  {
    'id': 208,
    'descripcion': 'Centro Noroeste',
    'direccion': 'C/ Santiago 21',
    'codigoPostal': '47001',
    'ciudad': 'Valladolid',
    'pais': 'España',
    'alturaMaxima': 200,
    'listadoPalets': 'EURO 80x120',
    'puedeSobresalir': false,
    'paletTablero': false,
    'cantoneras': false,
    'flejado': true,
    'retractilado': true,
    'observacionesPaletizado': 'Sin sobresalida por pasillos estrechos',
    'horarioDescarga': '09:00-15:00',
    'cliente': 443
  },
  {
    'id': 209,
    'descripcion': 'Nave Mediterráneo',
    'direccion': 'Av. Oscar Esplá 2',
    'codigoPostal': '03003',
    'ciudad': 'Alicante',
    'pais': 'España',
    'alturaMaxima': 215,
    'listadoPalets': 'AMERICANO 100x120',
    'puedeSobresalir': true,
    'paletTablero': false,
    'cantoneras': true,
    'flejado': false,
    'retractilado': true,
    'observacionesPaletizado': 'Sobresalida máxima 3 cm',
    'horarioDescarga': '07:00-13:00',
    'cliente': 443
  }
];

// Contactos clientes (Data quemada mientras el api está apagada)
const contactosClientes = [
  {
    'id': 23,
    'nombre': 'dirne',
    'email': 'w@gmail.com',
    'telefono': '122212121'
  },
  {
    'id': 25,
    'nombre': 'nuevo contacto',
    'email': 'emailnuevo@nuevo.com',
    'telefono': '+123 325 325 325'
  }
];

// Troqueles Clientes (Data quemada mientras el api está apagada)
const troquelesClientes = [
  {
    'id': 5925,
    'cajasPorPalet': 14,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 2,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 125,
    'numeroTroquel': '14536',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO'
  },
  {
    'id': 5211,
    'cajasPorPalet': 28,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 4,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 125,
    'numeroTroquel': '14537',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO, YA NO EXISTE'
  },
  {
    'id': 5288,
    'cajasPorPalet': 14,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 2,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 125,
    'numeroTroquel': '14538',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO, YA NO EXISTE'
  },
  {
    'id': 2931,
    'cajasPorPalet': 21,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 100,
    'unidadesBase': 3,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 0,
    'numeroTroquel': '14546',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO, YA NO EXISTE 31/03/25'
  },
  {
    'id': 2894,
    'cajasPorPalet': 28,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 4,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 125,
    'numeroTroquel': '14585',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO, YA NO EXISTE'
  },
  {
    'id': 9666,
    'cajasPorPalet': 14,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 2,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 125,
    'numeroTroquel': '14586',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'TROQUEL RETIRADO, YA NO EXISTE'
  },
  {
    'id': 8911,
    'cajasPorPalet': 21,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 100,
    'unidadesBase': 3,
    'unidadesAltura': 7,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 0,
    'numeroTroquel': '14777',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': null
  },
  {
    'id': 7341,
    'cajasPorPalet': 42,
    'medidaPalet': '80x120',
    'cajaAgrupadora': false,
    'unidadesPorPaquete': 50,
    'unidadesBase': 3,
    'unidadesAltura': 14,
    'paquetesVolteados': '2',
    'observacionesPaletizado': '',
    'alturaPalet': 0,
    'numeroTroquel': '15187',
    'clienteNombre': 'BERVIBOX, S.L.',
    'observacionesTroquel': 'HAY UNO IGUAL DE MITSUBISHI N.T.60253 A 2 POSES'
  },
];

// Fichas Clientes (Data quemada mientras el api está apagada)
const fichasClientes = [
  {
    'id': 22309,
    'numeroFicha': '1006401',
    'codigoCliente': '43648'
  },
  {
    'id': 23601,
    'numeroFicha': '1006411',
    'codigoCliente': '43648'
  },
  {
    'id': 23602,
    'numeroFicha': '1006412',
    'codigoCliente': '43648'
  },
  {
    'id': 23603,
    'numeroFicha': '1006413',
    'codigoCliente': '43648'
  },
  {
    'id': 23604,
    'numeroFicha': '1006415',
    'codigoCliente': '43648'
  },
  {
    'id': 23605,
    'numeroFicha': '1006416',
    'codigoCliente': '43648'
  },
  {
    'id': 22563,
    'numeroFicha': '1006420',
    'codigoCliente': '43648'
  },
  {
    'id': 22678,
    'numeroFicha': '1006430',
    'codigoCliente': '43648'
  },
  {
    'id': 22679,
    'numeroFicha': '1006431',
    'codigoCliente': '43648'
  },
  {
    'id': 22680,
    'numeroFicha': '1006432',
    'codigoCliente': '43648'
  },
  {
    'id': 24144,
    'numeroFicha': '1006440',
    'codigoCliente': '43648'
  },
  {
    'id': 25015,
    'numeroFicha': '1006450',
    'codigoCliente': '43648'
  },
  {
    'id': 25016,
    'numeroFicha': '1006451',
    'codigoCliente': '43648'
  },
  {
    'id': 25049,
    'numeroFicha': '1006460',
    'codigoCliente': '43648'
  },
  {
    'id': 25050,
    'numeroFicha': '1006461',
    'codigoCliente': '43648'
  },
  {
    'id': 25051,
    'numeroFicha': '1006462',
    'codigoCliente': '43648'
  },
  {
    'id': 24733,
    'numeroFicha': '1006470',
    'codigoCliente': '43648'
  }, 
];

 
// ==========================
//  VISTA: CLIENTE (cliente.html)
//  Se ejecuta solo si existen los contenedores de la vista
// ==========================
 

// Exponer (tu mismo bloque)
(function exponerDatosEnWindow() {
  try {
    if (typeof contactosClientes !== 'undefined') window.contactosClientes = contactosClientes;
    if (typeof troquelesClientes !== 'undefined') window.troquelesClientes = troquelesClientes;
    if (typeof fichasClientes    !== 'undefined') window.fichasClientes    = fichasClientes;
    if (typeof clientes          !== 'undefined') window.clientes          = clientes;
    if (typeof envioMercancias   !== 'undefined') window.envioMercancias   = envioMercancias;
    if (typeof enviomuestras     !== 'undefined') window.enviomuestras     = enviomuestras;
  } catch (e) { /* no-op */ }
})();

/* ============================================================
  VISTA: CLIENTE (cliente.html)  + PAGINACIÓN (DataTables)
============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Gate
  const cuerpoContactos = document.getElementById('tbody-contactos');
  const cuerpoTroqueles = document.getElementById('tbody-troqueles');
  const cuerpoFichas    = document.getElementById('tbody-fichas');
  const cuerpoEnvios    = document.getElementById('tbody-envios');
  if (!cuerpoContactos && !cuerpoTroqueles && !cuerpoFichas && !cuerpoEnvios) return;

  // Helpers
  const $id = (id) => document.getElementById(id);
  const ponerTexto = (id, val) => { const el = $id(id); if (el) el.textContent = val; };
  const alternarVacio = (id, len) => { const el = $id(id); if (el) el.classList.toggle('d-none', len > 0); };
  const letraAvatar = (txt) => (txt || '?').trim().charAt(0).toUpperCase() || '?';

  (function renderizarCabecera() {
    const nombre = 'Cliente';
    ponerTexto('cli-nombre', nombre);
    ponerTexto('cli-codigo', 'Código: —');
    const av = $id('cli-avatar');
    if (av) av.textContent = letraAvatar(nombre);
  })();

  // ========== FUNCIÓN: INICIALIZAR PAGINACIÓN (DataTables) ==========
  function inicializarPaginacionPorTbody(idTbody) {
    const jq = window.jQuery;
    if (!jq || !jq.fn || !jq.fn.DataTable) return;
    const $tabla = jq('#' + idTbody).closest('table');
    if ($tabla.length === 0) return;

    $tabla.DataTable({
      'destroy': true,
      'paging': true,
      'pageLength': 25,
      'lengthChange': false,
      'searching': false,
      'ordering': false,
      'info': true,
      'autoWidth': false,
      'responsive': true,
      'language': {
        'lengthMenu': '📄 Mostrar _MENU_ registros por página',
        'zeroRecords': '⚠️ No se encontraron resultados',
        'info': '📊 Viendo <b>_START_ → _END_</b> de un total de <b>_TOTAL_</b> registros',
        'infoEmpty': '📊 No hay registros para mostrar',
        'infoFiltered': '(filtrado de <b>_MAX_</b> registros totales)',
        'search': '🔍 Buscar:',
        'paginate': { 
          'first': '⏮️ Primero', 
          'last': '⏭️ Último', 
          'next': '➡️ Siguiente', 
          'previous': '⬅️ Anterior' 
        }
      }
    });
  }

  // ========== RENDER: ENVÍOS ==========
  function renderizarEnvios(lista) {
    const tbody = $id('tbody-envios');
    if (!tbody) return;
    const siNo = (v) => v ? 'Sí' : 'No';
    const seguro = (v) => (v ?? '—');

    const filas = (lista || []).map(envio => `
      <tr>
        <td class='td-fonts font-weight-bold'>${seguro(envio['id'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['descripcion'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['direccion'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['codigoPostal'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['ciudad'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['pais'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['alturaMaxima'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envio['listadoPalets'])}</td>
        <td class='td-fonts font-weight-bold'>${siNo(envio['paletTablero'])}</td>
        <td class='td-fonts font-weight-bold'>${siNo(envio['cantoneras'])}</td>
        <td class='td-fonts font-weight-bold'>${siNo(envio['flejado'])}</td>
        <td class='td-fonts font-weight-bold'>${siNo(envio['retractilado'])}</td>
        <td class='td-fonts font-weight-bold'>${siNo(envio['puedeSobresalir'])}</td>
        <td class='td-fonts font-weight-bold' title='${seguro(envio['observacionesPaletizado'])}'>${envio['observacionesPaletizado'] ? envio['observacionesPaletizado'] : '—'}</td>
      </tr>
    `).join('');

    tbody.innerHTML = filas || '';
    const n = (lista || []).length;
    ponerTexto('kpi-enviomer', n);
    ponerTexto('badge-envios', n);
    alternarVacio('empty-envios', n);
    inicializarPaginacionPorTbody('tbody-envios');
  }

  // ========== RENDER: CONTACTOS ==========
  function renderizarContactos(lista) {
    const tbody = $id('tbody-contactos');
    if (!tbody) return;

    renderizarContactos.ultimaLista = Array.isArray(lista) ? lista.slice() : [];

    const filas = (renderizarContactos.ultimaLista || []).map((contacto, i) => `
      <tr>
        <td class='td-fonts font-weight-bold'>${contacto['nombre'] ?? ''}</td>
        <td class='td-fonts font-weight-bold'><a href='mailto:${contacto['email'] ?? ''}'>${contacto['email'] ?? ''}</a></td>
        <td class='td-fonts font-weight-bold'>${contacto['telefono'] ?? ''}</td>
        <td class='td-fonts'>
          <button type='button' class='btn btn-sm btn-info btn-edit-contacto mb-0' data-index='${i}'>
            <i class='fas fa-pen mr-1'></i>
          </button>
          <button type='button' class='btn btn-sm btn-danger btn-edit-contacto mb-0' data-index='${i}'>
            <i class='fa-solid fa-trash'></i>
          </button>
        </td>
      </t--r>
    `).join('');

    tbody.innerHTML = filas || '';
    const n = (renderizarContactos.ultimaLista || []).length;
    ponerTexto('kpi-contactos', n);
    ponerTexto('badge-contactos', n);
    alternarVacio('empty-contactos', n);

    if (!tbody._delegadoEditar) {
      tbody.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-edit-contacto');
        if (!btn) return;
        const idx = Number(btn.dataset.index);
        const c = renderizarContactos.ultimaLista[idx] || { 'nombre':'', 'email':'', 'telefono':'' };
        abrirModalEditarContacto(c, idx);
      });
      tbody._delegadoEditar = true;
    }
    inicializarPaginacionPorTbody('tbody-contactos');
  }

  // Modal editar contacto
  function abrirModalEditarContacto(contacto, idx) {
    $id('ec-index').value    = idx;
    $id('ec-nombre').value   = contacto['nombre']   || '';
    $id('ec-email').value    = contacto['email']    || '';
    $id('ec-telefono').value = contacto['telefono'] || '';
    if (window.jQuery) { jQuery('#modalEditarContacto').modal('show'); }
    else { const m = $id('modalEditarContacto'); m.classList.add('show'); m.style.display = 'block'; }
  }

  (function adjuntarGuardar() {
    const formulario = $id('formEditarContacto');
    if (!formulario) return;
    formulario.addEventListener('submit', function(e) {
      e.preventDefault();
      const idx = Number($id('ec-index').value);
      const actualizado = {
        'nombre':   $id('ec-nombre').value.trim(),
        'email':    $id('ec-email').value.trim(),
        'telefono': $id('ec-telefono').value.trim()
      };
      if (Array.isArray(renderizarContactos.ultimaLista) && idx >= 0) {
        renderizarContactos.ultimaLista[idx] = actualizado;
        renderizarContactos(renderizarContactos.ultimaLista);
      }
      $id('modalEditarContacto')
        .dispatchEvent(new CustomEvent('contacto:edit:save', { 'bubbles': true, 'detail':{ 'index': idx, 'contacto': actualizado }}));
      if (window.jQuery) { jQuery('#modalEditarContacto').modal('hide'); }
    });
  })();

  // Sincroniza edición con el array fuente
  (() => {
    const modal = document.getElementById('modalEditarContacto');
    if (!modal || window._bindSyncEditContacto) return;
    window._bindSyncEditContacto = true;

    modal.addEventListener('contacto:edit:save', (ev) => {
      const { index, contacto } = ev.detail || {};
      if (!Array.isArray(window.contactosClientes) || index == null) return;
      if (window.contactosClientes[index]) {
        window.contactosClientes[index] = { ...window.contactosClientes[index], ...contacto };
      }
      window.renderizarContactos?.(window.contactosClientes);
      if (typeof mostrarAlerta === 'function') {
        mostrarAlerta('Contacto', 'Se ha guardado la información correctamente.', 'success', 1800);
      }
    });
  })();

  // ========== RENDER: TROQUELES ==========
  function renderizarTroqueles(lista) {
    const tbody = $id('tbody-troqueles');
    if (!tbody) return;

    const filas = (lista || []).map(troquel => `
      <tr>
        <td class='td-fonts font-weight-bold'>${troquel['numeroTroquel']}</td>
        <td class='td-fonts font-weight-bold'>${troquel['clienteNombre'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['cajasPorPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['medidaPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['unidadesPorPaquete'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['alturaPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold' title='${troquel['observacionesTroquel'] ?? ''}'>${troquel['observacionesTroquel'] ?? '—'}</td>
      </tr>
    `).join('');

    tbody.innerHTML = filas || '';
    const n = (lista || []).length;
    ponerTexto('kpi-troqueles', n);
    ponerTexto('badge-troqueles', n);
    alternarVacio('empty-troqueles', n);
    inicializarPaginacionPorTbody('tbody-troqueles');
  }

  // ========== RENDER: FICHAS ==========
  function renderizarFichas(lista) {
    const tbody = $id('tbody-fichas');
    if (!tbody) return;

    const filas = (lista || []).map(ficha => `
      <tr>
        <td class='td-fonts font-weight-bold'>${ficha['numeroFicha']}</td>
        <td class='td-fonts font-weight-bold'>${ficha['codigoCliente']}</td>
        <td class='td-fonts font-weight-bold'>${ficha['id']}</td>
      </tr>
    `).join('');

    tbody.innerHTML = filas || '';
    const n = (lista || []).length;
    ponerTexto('kpi-fichas', n);
    ponerTexto('badge-fichas', n);
    alternarVacio('empty-fichas', n); 
    inicializarPaginacionPorTbody('tbody-fichas');
  }

  function renderizarEnvioMuestras(lista) {
    const tbody = document.getElementById('tbody-enviomuestras');
    if (!tbody) return;

    // guardamos la lista para poder abrir/editar por índice sin tocar el array fuente aún
    renderizarEnvioMuestras.ultimaLista = Array.isArray(lista) ? lista.slice() : [];

    const seguro = (v) => (v ?? '—'); 
    const filas = (renderizarEnvioMuestras.ultimaLista || []).map((envioMuestra, i) => `
      <tr>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['id'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['empresa'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['nombre'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['personaContacto'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['telefono'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['direccion'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['codigoPostal'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['ciudad'])}</td>
        <td class='td-fonts font-weight-bold'>${seguro(envioMuestra['pais'])}</td>
        <td class='td-fonts'>
          <button type='button' class='btn btn-sm btn-info btn-em-editar mb-0' data-index='${i}' title='Editar'>
            <i class='fas fa-pen mr-1'></i>
          </button>
          <button type='button' class='btn btn-sm btn-danger btn-em-eliminar mb-0' data-index='${i}' title='Eliminar'>
            <i class='fa-solid fa-trash'></i>
          </button>
        </td>
      </tr>
    `).join('');

    tbody.innerHTML = filas || '';

    const n = (renderizarEnvioMuestras.ultimaLista || []).length;
    const ponerTexto = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const alternarVacio = (id, len) => { const el = document.getElementById(id); if (el) el.classList.toggle('d-none', len > 0); };
    ponerTexto('kpi-enviom', n) 
    ponerTexto('badge-enviomuestras', n);
    alternarVacio('empty-enviomuestras', n);

    // Paginación (reinit seguro)
    inicializarPaginacionPorTbody('tbody-enviomuestras');

    // Delegación de eventos (una sola vez)
    if (!tbody._delegadoEM) {
      tbody.addEventListener('click', function (ev) {
        const btnEdit = ev.target.closest('.btn-em-editar');
        const btnDel  = ev.target.closest('.btn-em-eliminar');
        if (!btnEdit && !btnDel) return;

        const idx = Number((btnEdit || btnDel).dataset.index);
        const item = renderizarEnvioMuestras.ultimaLista[idx];
        if (!item) return;

        if (btnEdit) abrirModalEditarEnvioMuestra(item, idx);
        if (btnDel)  eliminarEnvioMuestra(idx);
      });
      tbody._delegadoEM = true;
    }
  }

  // export
  // Exponer renders “oficiales”
  window.renderizarContactos     = renderizarContactos;
  window.renderizarTroqueles     = renderizarTroqueles;
  window.renderizarFichas        = renderizarFichas;
  window.renderizarEnvios        = renderizarEnvios;
  window.renderizarEnvioMuestras = renderizarEnvioMuestras;

  // -------- Buscador genérico (DataTables si existe) --------
  function conectarBuscador(idInput, idLimpiar, idTbody) {
    const input = $id(idInput);
    const btnLimpiar = $id(idLimpiar);
    const tbody = $id(idTbody);
    if (!input || !tbody) return;

    const usarFiltro = () => {
      const q = (input.value || '').toLowerCase();
      const jq = window.jQuery;
      const $tabla = jq ? jq('#' + idTbody).closest('table') : null;
      const hayDT = jq && jq.fn && jq.fn.dataTable && $tabla && $tabla.length && jq.fn.dataTable.isDataTable($tabla);

      if (hayDT) {
        $tabla.DataTable().search(q).draw();
      } else {
        [...tbody.querySelectorAll('tr')].forEach(tr => {
          tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      }
    };

    input.addEventListener('input', usarFiltro);
    btnLimpiar?.addEventListener('click', () => {
      input.value = '';
      usarFiltro();
      input.focus();
    });
  }

  // ===== Inicialización de datos =====
  const todosContactos = Array.isArray(window.contactosClientes) 
    ? window.contactosClientes 
    : (typeof contactosClientes !== 'undefined' ? contactosClientes : []);

  const todosTroqueles = Array.isArray(window.troquelesClientes) 
    ? window.troquelesClientes 
    : (typeof troquelesClientes !== 'undefined' ? troquelesClientes : []); 
  
  const todasFichas = Array.isArray(window.fichasClientes)    
    ? window.fichasClientes   
    : (typeof fichasClientes !== 'undefined' ? fichasClientes : []);
  
  const todosEnvios = Array.isArray(window.envioMercancias)   
    ? window.envioMercancias  
    : (typeof envioMercancias   !== 'undefined' ? envioMercancias : []);

  const todosEnvioMuestras = Array.isArray(window.enviomuestras)
    ? window.enviomuestras
    : (typeof enviomuestras !== 'undefined' ? enviomuestras : []);
  
  renderizarContactos(todosContactos);
  renderizarTroqueles(todosTroqueles);
  renderizarFichas(todasFichas);
  renderizarEnvios(todosEnvios);
  renderizarEnvioMuestras(todosEnvioMuestras);
 
  // Guardar del modal genérico: mete en arrays + re-render
  document.addEventListener('DOMContentLoaded', () => {
    const btn  = document.getElementById('btn-guardar-agregar');
    const form = document.getElementById('formAgregarGenerico');
    if (!btn || !form) { console.warn('[AGREGAR] Falta botón o form'); return; }
    if (btn._hooked) return; btn._hooked = true;

    const v = (id) => (document.getElementById(id)?.value || '').trim();
    const n = (id) => { const x = v(id); return x === '' || isNaN(+x) ? null : +x; };
    const b = (id) => !!document.getElementById(id)?.checked;

    btn.addEventListener('click', () => { 
      const tipo = v('agregarTipo'); // 'contacto' | 'troquel' | 'ficha' | 'envio'
      if (!tipo) { console.warn('[AGREGAR] Falta agregarTipo'); return; }

      if (tipo === 'contacto') {
        const nombre = v('ac-nombre');
        const email  = v('ac-email');
        if (!nombre || !email) return;
        (window.contactosClientes ||= []).push({
          'id': Date.now(),
          nombre,
          email,
          'telefono': v('ac-telefono')
        });
        window.renderizarContactos?.(window.contactosClientes);
      }

      if (tipo === 'troquel') {
        const numeroTroquel = v('at-numero');
        if (!numeroTroquel) return;
        (window.troquelesClientes ||= []).push({
          'id': Date.now(),
          numeroTroquel,
          'clienteNombre': v('at-cliente') || '—',
          'cajasPorPalet': n('at-cajas'),
          'medidaPalet': v('at-medida') || '—',
          'unidadesPorPaquete': n('at-uds'),
          'alturaPalet': n('at-altura'),
          'observacionesTroquel': v('at-observ') || null
        });
        window.renderizarTroqueles?.(window.troquelesClientes);
      }

      if (tipo === 'ficha') {
        const numeroFicha   = v('af-numero');
        const codigoCliente = v('af-codigo');
        if (!numeroFicha || !codigoCliente) return;
        (window.fichasClientes ||= []).push({
          'id': Date.now(),
          numeroFicha,
          codigoCliente
        });
        window.renderizarFichas?.(window.fichasClientes);
      }

      if (tipo === 'envio') {
        const descripcion = v('ae-descripcion');
        const direccion   = v('ae-direccion');
        if (!descripcion || !direccion) return;

        const lista = (window.envioMercancias ||= []);
        const nextId = lista.length
          ? Math.max(...lista.map(e => +e.id || 0)) + 1
          : Math.floor(Date.now()/1000);

        lista.push({
          'id': nextId,
          descripcion,
          direccion,
          'codigoPostal': v('ae-cp') || null,
          'ciudad': v('ae-ciudad') || null,
          'pais': v('ae-pais') || null,
          'alturaMaxima': n('ae-altura'),
          'listadoPalets': v('ae-palets') || null,
          'paletTablero': b('ae-tablero'),
          'cantoneras': b('ae-cantoneras'),
          'flejado': b('ae-flejado'),
          'retractilado': b('ae-retractilado'),
          'puedeSobresalir': b('ae-sobresalir'),
          'observacionesPaletizado': v('ae-observ') || null
        });
        window.renderizarEnvios?.(window.envioMercancias);
      }

      // cerrar y limpiar
      if (window.jQuery) { jQuery('#modalAgregarGenerico').modal('hide'); }
      const activo = document.querySelector('#modalAgregarGenerico .fieldset:not(.d-none)');
      activo?.querySelectorAll('input, textarea').forEach(el => {
        if (el['type'] === 'checkbox') el['checked'] = false;
        else el['value'] = '';
      });
    });
  });


  // Buscadores (DataTables si existe)
  conectarBuscador('search-contactos', 'clear-contactos', 'tbody-contactos');
  conectarBuscador('search-troqueles', 'clear-troqueles', 'tbody-troqueles');
  conectarBuscador('search-fichas', 'clear-fichas', 'tbody-fichas');
  conectarBuscador('search-envios', 'clear-envios', 'tbody-envios');
  conectarBuscador('search-enviomuestras', 'clear-enviomuestras', 'tbody-enviomuestras');

  // CSS opcional tabs
  if (!document.getElementById('cliente-tabs-css')) {
    const style = document.createElement('style');
    style.id = 'cliente-tabs-css';
    style.textContent = `
      .nav-tabs .nav-link{font-size:15px;font-weight:700;display:flex;align-items:center;}
      .nav-tabs .nav-link i{font-size:15px;margin-right:4px;}
      .nav-tabs .nav-link .badge{font-size:13px;font-weight:600;margin-left:6px;align-self:center;}
    `;
    document.head.appendChild(style);
  }
  console.log('[Cliente+Paginación] Contactos:', todosContactos.length, '| Troqueles:', todosTroqueles.length, '| Fichas:', todasFichas.length, '| Envíos:', todosEnvios.length);
});


// --- listeners globales (tuyos) ---
(() => {
  if (window._bindGuardarContacto) return;
  window._bindGuardarContacto = true;
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-guardar-contacto');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    mostrarAlerta('Contacto','Se ha guardado la información correctamente.', 'success', 1800);
    $('#modalEditarContacto').modal('hide');
  });
})();

// ====== Buscador clientes (SIN CAMBIOS) ======

function prepararFila(fila) {
  if (fila.dataset.preparada === '1') return;
  const elNombre = fila.querySelector('.col-cliente .info-destacada');
  const elCodigo = fila.querySelector('.col-codigo .info-destacada');
  fila.dataset.nombre = (elNombre ? elNombre.textContent : '').trim();
  fila.dataset.codigo = (elCodigo ? elCodigo.textContent : '').trim();
  fila.dataset.preparada = '1';
}

function filtrarClientes(termino) {
  const q = normalizar(termino);
  obtenerFilas().forEach(fila => {
    prepararFila(fila);
    const n = normalizar(fila.dataset.nombre);
    const c = normalizar(fila.dataset.codigo);
    const coincide = !q || n.includes(q) || c.includes(q);
    fila.style.display = coincide ? '' : 'none';
  });
}

(function initBuscadorClientes() {
  const input = document.getElementById('buscar-clientes');
  const btnLimpiar = document.getElementById('limpiar-buscar-clientes');
  if (!input) return;

  let t;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => filtrarClientes(input.value), 120);
  });

  const limpiar = () => {
    input.value = '';
    filtrarClientes('');
    input.focus();
  };

  btnLimpiar?.addEventListener('click', limpiar);
  btnLimpiar?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') limpiar(); });

  obtenerFilas().forEach(prepararFila);
  filtrarClientes('');
})();

/* ===========================================================
  VISTA: CLIENTE (cliente.html)
  Renderiza tablas y buscadores SIN FILTROS por URL
============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Gate: si no estamos en la página Cliente, salir
  const tbodyContactos = document.getElementById('tbody-contactos');
  const tbodyTroqueles = document.getElementById('tbody-troqueles');
  const tbodyFichas    = document.getElementById('tbody-fichas');
  const tbodyEnvios    = document.getElementById('tbody-envios');

  // Si no existe ninguno, salimos (pero si existe al menos uno, seguimos)
  if (!tbodyContactos && !tbodyTroqueles && !tbodyFichas && !tbodyEnvios) return;

  // -------- Helpers locales -------- 
  const $ = (id) => document.getElementById(id);
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const toggleEmpty = (id, len) => { const el = $(id); if (el) el.classList.toggle('d-none', len > 0); };
  const avatarLetter = (txt) => (txt || '?').trim().charAt(0).toUpperCase() || '?';

  // -------- Header simple (sin depender de querystring) --------
  (function renderHeader() {
    // Si tienes window.clientes y quieres tomar el primero, descomenta:
    // const firstCliente = Array.isArray(window.clientes) && window.clientes[0] ? window.clientes[0] : null;
    // const nombre = firstCliente ? firstCliente.nombre : 'Cliente';
    const nombre = 'Cliente';
    setText('cli-nombre', nombre);
    setText('cli-codigo', 'Código: —');
    const av = $('cli-avatar');
    if (av) av.textContent = avatarLetter(nombre);
  })();
 
// === Render con columna "Acciones" + modal ===
function renderEnvios(list) {
  const $ = (id) => document.getElementById(id);
  const tbody = $('tbody-envios');
  if (!tbody) return;

  const siNo = (v) => v ? 'Sí' : 'No';
  const seguro = (v) => (v ?? '—');

  const rows = (list || []).map(envioMercancia => `
    <tr>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['id'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['descripcion'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['direccion'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['codigoPostal'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['ciudad'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['pais'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['alturaMaxima'])}</td>
      <td class='td-fonts font-weight-bold'>${seguro(envioMercancia['listadoPalets'])}</td>
      <td class='td-fonts font-weight-bold'>${siNo(envioMercancia['paletTablero'])}</td>
      <td class='td-fonts font-weight-bold'>${siNo(envioMercancia['cantoneras'])}</td>
      <td class='td-fonts font-weight-bold'>${siNo(envioMercancia['flejado'])}</td>
      <td class='td-fonts font-weight-bold'>${siNo(envioMercancia['retractilado'])}</td>
      <td class='td-fonts font-weight-bold'>${siNo(envioMercancia['puedeSobresalir'])}</td>
      <td class='td-fonts font-weight-bold' title='${safe(envioMercancia['observacionesPaletizado'])}'>
        ${envioMercancia['observacionesPaletizado'] ? envioMercancia['observacionesPaletizado'] : '—'}
      </td>
    </tr>
  `).join('');

  tbody.innerHTML = rows || ''; 
  const n = (list || []).length;
  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const toggleEmpty = (id, len) => { const el = $(id); if (el) el.classList.toggle('d-none', len > 0); };

  setText('badge-envios', n);
  toggleEmpty('empty-envios', n);
}

function renderContactos(list) {
  const tbody = $('tbody-contactos');
  if (!tbody) return;

  // guardamos la lista para usarla al abrir el modal (sin tocar tu fuente)
  renderContactos.lastList = Array.isArray(list) ? list.slice() : [];

  const rows = (renderContactos.lastList || []).map((contacto, i) => `
    <tr>
      <td class='td-fonts font-weight-bold'>${contacto['nombre'] ?? ''}</td>
      <td class='td-fonts font-weight-bold'><a href='mailto:${contacto['email'] ?? ''}'>${contacto['email'] ?? ''}</a></td>
      <td class='td-fonts font-weight-bold'>${contacto['telefono'] ?? ''}</td>
      <td class='td-fonts'>
        <button type='button' class='btn btn-sm btn-info btn-edit-contacto mb-0' data-index='${i}'>
          <i class='fas fa-pen mr-1'></i> 
        </button>
        <button type='button' class='btn btn-sm btn-danger btn-edit-contacto mb-0' data-index='${i}'>
          <i class='fa-solid fa-trash'></i> 
        </button>
      </td>
    </tr>
  `).join('');

  tbody.innerHTML = rows || '';

  const n = (renderContactos.lastList || []).length;
  setText('kpi-contactos', n);
  setText('badge-contactos', n);
  toggleEmpty('empty-contactos', n);

  // Delegación (se ata una sola vez aunque re-renderices)
  if (!tbody._editDelegated) {
    tbody.addEventListener('click', function (ev) {
      const btn = ev.target.closest('.btn-edit-contacto');
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      const c = renderContactos.lastList[idx] || { 'nombre': '', 'email': '', 'telefono': '' };
      openEditarContactoModal(c, idx);
    });
    tbody._editDelegated = true;
  }
}

// Abre y precarga el modal
function openEditarContactoModal(contacto, idx) {
  // set values
  document.getElementById('ec-index').value    = idx;
  document.getElementById('ec-nombre').value   = contacto.nombre   || '';
  document.getElementById('ec-email').value    = contacto.email    || '';
  document.getElementById('ec-telefono').value = contacto.telefono || '';

  // mostrar (usamos jQuery explícito para no chocar con tu $)
  if (window.jQuery) { jQuery('#modalEditarContacto').modal('show'); }
  else {
    // fallback Bootstrap 4/5
    document.getElementById('modalEditarContacto').classList.add('show');
    document.getElementById('modalEditarContacto').style.display = 'block';
  }
}

// Guardado del modal (actualiza tabla y dispara evento para que persistas si quieres)
(function attachGuardar() { 
  const form = document.getElementById('formEditarContacto');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const idx = Number(document.getElementById('ec-index').value);
    const updated = {
      'nombre':   document.getElementById('ec-nombre').value.trim(),
      'email':    document.getElementById('ec-email').value.trim(),
      'telefono': document.getElementById('ec-telefono').value.trim()
    };

    // Actualiza la tabla inmediatamente (sin tocar tu fuente original)
    if (Array.isArray(renderContactos.lastList) && idx >= 0) {
      renderContactos.lastList[idx] = updated;
      renderContactos(renderContactos.lastList);
    }

    // Notifica hacia fuera por si quieres persistir (opcional)
    document.getElementById('modalEditarContacto')
      .dispatchEvent(new CustomEvent('contacto:edit:save', { 'bubbles': true, 'detail':{ 'index': idx, 'contacto': updated }}));

    if (window.jQuery) { jQuery('#modalEditarContacto').modal('hide'); }
  });
})();
  
  // -------- Render: Troqueles --------
  function renderTroqueles(list) {
    const tbody = $('tbody-troqueles');
    if (!tbody) return;

    const rows = (list || []).map(troquel => `
      <tr>
        <td class='td-fonts font-weight-bold'>${troquel['numeroTroquel']}</td>
        <td class='td-fonts font-weight-bold'>${troquel['clienteNombre'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['cajasPorPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['medidaPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['unidadesPorPaquete'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold'>${troquel['alturaPalet'] ?? '—'}</td>
        <td class='td-fonts font-weight-bold' title='${troquel['observacionesTroquel'] ?? ''}'>${troquel['observacionesTroquel'] ?? '—'}</td>
      </tr>
    `).join('');

    tbody.innerHTML = rows || '';
    const n = (list || []).length;
    setText('kpi-troqueles', n);
    setText('badge-troqueles', n);
    toggleEmpty('empty-troqueles', n);
  }

  // -------- Render: Fichas --------
  function renderFichas(list) {
    const tbody = $('tbody-fichas');
    if (!tbody) return;

    const rows = (list || []).map(ficha => `
      <tr>
        <td class='td-fonts font-weight-bold'>${ficha['numeroFicha']}</td>
        <td class='td-fonts font-weight-bold'>${ficha['codigoCliente']}</td>
        <td class='td-fonts font-weight-bold'>${ficha['id']}</td>
      </tr>
    `).join('');

    tbody.innerHTML = rows || '';
    const n = (list || []).length;
    setText('kpi-fichas', n);
    setText('badge-fichas', n);
    toggleEmpty('empty-fichas', n);
  }

  // -------- Buscador genérico --------
  function hookSearch(inputId, clearId, tableBodyId) {
    const input = $(inputId);
    const clear = $(clearId);
    const tbody = $(tableBodyId);
    if (!input || !tbody) return; 
    const doFilter = () => {
      const q = (input.value || '').toLowerCase();
      [...tbody.querySelectorAll('tr')].forEach(tr => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    };

    input.addEventListener('input', doFilter);
    if (clear) {
      clear.addEventListener('click', () => {
        input.value = '';
        doFilter();
        input.focus();
      });
    }
  }

  // ===== Inicialización de datos (SIN FILTROS) =====
  const contactosAll = Array.isArray(window.contactosClientes)
    ? window.contactosClientes
    : (typeof contactosClientes !== 'undefined' ? contactosClientes : []);
  const troquelesAll = Array.isArray(window.troquelesClientes)
    ? window.troquelesClientes
    : (typeof troquelesClientes !== 'undefined' ? troquelesClientes : []);
  const fichasAll = Array.isArray(window.fichasClientes)
    ? window.fichasClientes
    : (typeof fichasClientes !== 'undefined' ? fichasClientes : []);

  const enviosAll = Array.isArray(window.envioMercancias)
    ? window.envioMercancias
    : (typeof envioMercancias !== 'undefined' ? envioMercancias : []);

  renderContactos(contactosAll);
  renderTroqueles(troquelesAll);
  renderFichas(fichasAll);
  renderEnvios(enviosAll);

  // Activar buscadores
  hookSearch('search-contactos', 'clear-contactos', 'tbody-contactos');
  hookSearch('search-troqueles', 'clear-troqueles', 'tbody-troqueles');
  hookSearch('search-fichas', 'clear-fichas', 'tbody-fichas');
  hookSearch('search-envios', 'clear-envios', 'tbody-envios');

  // (Opcional) Uniformar tipografías tabs + badge (en caso de mismatch visual)
  if (!document.getElementById('cliente-tabs-css')) {
    const style = document.createElement('style');
    style.id = 'cliente-tabs-css';
    style.textContent = 
    `
      .nav-tabs .nav-link { 
        font-size: 15px; 
        font-weight: 700; 
        display: flex; 
        align-items: center; 
      }

      .nav-tabs .nav-link i { 
        font-size: 15px; 
        margin-right: 4px; 
      }

      .nav-tabs .nav-link .badge { 
        font-size: 13px; 
        font-weight: 600; 
        margin-left :6px; 
        align-self: center; 
      }
    `;
    document.head.appendChild(style);
  }

  // Debug
  console.log('[Cliente] Contactos:', contactosAll.length, '| Troqueles:', troquelesAll.length, '| Fichas:', fichasAll.length, '| Envíos Mercancías:', enviosAll.length);
});

// --- listeners globales (pegar al final de scripts.js, fuera de funciones) ---
(() => {
  if (window._bindGuardarContacto) return;   // evita múltiples registros
  window._bindGuardarContacto = true;

  // Delegación por si el modal se inserta dinámicamente
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-guardar-contacto');
    if (!btn) return;  
    e.preventDefault();
    e.stopPropagation(); 
    mostrarAlerta(
      'Contacto',
      'Se ha guardado la información correctamente.',
      'success',
      1800
    );  
    $('#modalEditarContacto').modal('hide'); // Bootstrap/AdminLTE
  });
})();

// ====== Buscar cliente ======
  const normalizar = txt =>
    (txt || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const obtenerFilas = () => Array.from(document.querySelectorAll('.fila-cliente'));

  // Guarda nombre y código en data-* para filtrar rápido
  function prepararFila(fila) {
    if (fila.dataset.preparada === '1') return;
    const elNombre = fila.querySelector('.col-cliente .info-destacada');
    const elCodigo = fila.querySelector('.col-codigo .info-destacada');
    fila.dataset.nombre = (elNombre ? elNombre.textContent : '').trim();
    fila.dataset.codigo = (elCodigo ? elCodigo.textContent : '').trim();
    fila.dataset.preparada = '1';
  }

  function filtrarClientes(termino) {
    const q = normalizar(termino);
    obtenerFilas().forEach(fila => {
      prepararFila(fila);
      const n = normalizar(fila.dataset.nombre);
      const c = normalizar(fila.dataset.codigo);
      const coincide = !q || n.includes(q) || c.includes(q);
      fila.style.display = coincide ? '' : 'none';
    });
  }

  // ====== Inicialización ======
  (function initBuscadorClientes() {
    const input = document.getElementById('buscar-clientes');
    const btnLimpiar = document.getElementById('limpiar-buscar-clientes');
    if (!input) return;

    // Debounce ligero
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => filtrarClientes(input.value), 120);
    });

    const limpiar = () => {
      input.value = '';
      filtrarClientes('');
      input.focus();
    };

    btnLimpiar?.addEventListener('click', limpiar);
    btnLimpiar?.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') limpiar(); });

    // Prepara filas ya renderizadas y muestra todo
    obtenerFilas().forEach(prepararFila);
    filtrarClientes('');

  })();
// ======================== FIN DATA DE CLIENTES ===============

// ========================= MAQUETAS Y TRAZADOS ===============

// Datos de ejemplo (pueden venir de tu API)
  const datosMaquetas = [
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },
    { 
      'fecha': '11/07/2025', 
      'proyecto': '77461', 
      'maqueta': '52579', 
      'troquel': '85187', 
      'cliente': 'Nestlé España, S.A.U', 
      'comercial': 'Pedro Nadal', 
      'gestorEstructural': 'Vero', 
      'gestorProyecto': 'Maite', 
      'urgente': '', 
      'estado': '', 
      'observaciones': '' 
    },

  ];

  // Renderizar tabla dinámicamente
  function renderTabla() {
    const tbody = document.getElementById('bodyMaquetas');
    tbody.innerHTML = datosMaquetas.map(datoMaqueta => `
      <tr>
        <td class='td-fonts'>${datoMaqueta['fecha']}</td>
        <td class='td-fonts'>${datoMaqueta['proyecto']}</td>
        <td class='td-fonts'>${datoMaqueta['maqueta']}</td>
        <td class='td-fonts'>${datoMaqueta['troquel']}</td>
        <td class='td-fonts'>${datoMaqueta['cliente']}</td>
        <td class='td-fonts'>${datoMaqueta['comercial']}</td>
        <td class='td-fonts'>${datoMaqueta['gestorEstructural']}</td>
        <td class='td-fonts'>${datoMaqueta['gestorProyecto']}</td>
        <td class='td-fonts'>${datoMaqueta['urgente']}</td>
        <td class='td-fonts'>${datoMaqueta['estado']}</td>
        <td class='td-fonts'>${datoMaqueta['observaciones']}</td>
      </tr>
    `).join('');
  }

  // Inicializar DataTable
  function initDataTable() {

    $('#tablaMaquetas').DataTable({
      'responsive': true,
      'lengthChange': false,
      'autoWidth': false,
      'initComplete': function () {
        const w = document.querySelector('.content-wrapper.fadeInUp-animation');
        if (w) w.classList.add('is-ready');   // ← dispara el fade in sin “brinco”
      },

      'buttons': [
        { 
          'extend': 'excelHtml5', 
          'text': '📊 Excel', 
          'exportOptions': { 
            'columns': ':visible' 
          } 
        },

        {
          'extend': 'pdfHtml5',
          'text': '📄 PDF',
          'orientation': 'landscape',
          'pageSize': 'A4',
          'exportOptions': { 
            'columns': ':visible' 
          },
          'customize': function (doc) {
            doc.content[1].table.body[0].forEach(function (headerCell) { headerCell.alignment = 'center'; });
            doc.defaultStyle.fontSize = 8;
            doc.defaultStyle.alignment = 'left';
            doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
            var rowCount = doc.content[1].table.body.length;
            for (var i = 1; i < rowCount; i++) {
              if (i % 2 === 0) {
                doc.content[1].table.body[i].forEach(function (cell) { cell.fillColor = '#f3f3f3'; });
              }
            } 
            
            doc.styles.tableHeader = { 
              'fillColor': '#003366', 
              'color': 'white', 
              'bold': true, 
              'fontSize': 10 
            };

            var objLayout = {
              'hLineWidth': function() { return 0.5; },
              'vLineWidth': function() { return 0.5; },
              'hLineColor': function() { return '#cccccc'; },
              'vLineColor': function() { return '#cccccc'; },
              'paddingLeft': function() { return 4; },
              'paddingRight': function() { return 4; },
              'paddingTop': function() { return 2; },
              'paddingBottom': function() { return 2; }
            };

            doc.content[1].layout = objLayout;
          }
        }
      ],

      'language': {
        'lengthMenu': '📄 Mostrar _MENU_ registros por página',
        'zeroRecords': '⚠️ No se encontraron resultados',
        'info': '📊 Viendo <b>_START_ → _END_</b> de un total de <b>_TOTAL_</b> registros',
        'infoEmpty': '📊 No hay registros para mostrar',
        'infoFiltered': '(filtrado de <b>_MAX_</b> registros totales)',
        'search': '🔍 Buscar:',
        'paginate': { 
          'first': '⏮️ Primero', 
          'last': '⏭️ Último', 
          'next': '➡️ Siguiente', 
          'previous': '⬅️ Anterior' 
        }
      }
    }).buttons().container().appendTo('#tablaMaquetas_wrapper .col-md-6:eq(0)');
  }

// ========================= FIN MAQUETAS Y TRAZADOS ===========


getData();
