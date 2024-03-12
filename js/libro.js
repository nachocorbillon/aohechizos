let hechizos = []; // Aquí almacenaremos los hechizos
let numeroTotalHechizos = 0; // Número total de hechizos en el archivo
let indiceActual = 0; // Índice del hechizo actual

document.getElementById('cargar').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      //console.log('Contenido del archivo:', content);
      cargarHechizos(content);
      cargarListaHechizos();
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
    reader.readAsText(file,"Windows-1252");
  }
});

// Función para cargar los hechizos desde el contenido del archivo
function cargarHechizos(content) {
  // const hechizosRaw = content.split(/\[HECHIZO\d+\]/).filter(Boolean);
  const hechizosRaw = content.match(/\[HECHIZO\d*\][\s\S]*?(?=\[HECHIZO\d*\[|\[|$)/g);
  // const hechizosRaw = content.match(/\[HECHIZO\d+\][\s\S]*?(?=\[HECHIZO\d+\[|\[)/g);

  for (let i = 0; i < hechizosRaw.length; i++) { // Cambio en el punto de inicio del bucle
    const lines = hechizosRaw[i].split('\n').filter(Boolean);
    let hechizoObj = { Id: '' };
    const idMatch = hechizosRaw[i].match(/\[HECHIZO(\d+)\]/);
    if (idMatch && idMatch.length > 1) {
      hechizoObj.Id = idMatch[0]; // Se utiliza idMatch[1] para obtener el valor del número dentro de los corchetes
    }
    for (let j = 0; j < lines.length; j++) {
      const line = lines[j].trim();
      const separatorIndex = line.indexOf('=');
      if (separatorIndex !== -1) {
        const key = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        hechizoObj[key] = value;
      }
    }
    hechizos.push(hechizoObj);
  }

numeroTotalHechizos=hechizos.length;
  console.log('Total de hechizos:',numeroTotalHechizos);
  console.log('Hechizos parseados:', hechizos);

  cargarListaHechizos();
  document.querySelectorAll('section').forEach(seccion => {
    seccion.style.visibility = 'visible';
  });
  mostrarHechizo(indiceActual);
}






// Mostrar el hechizo en el índice especificado
function mostrarHechizo(index) {
 console.log("index:"+index +" hechizos.length:"+hechizos.length+" hechizos[index]:"+hechizos[index]);
 const hechizoActual = hechizos[index];
  if (hechizoActual !== undefined) {
    console.log('Mostrando hechizo:', hechizoActual);
    const hechizoDiv = document.getElementById('hechizo');
    let hechizoHTML = '<table id="tablaHechizos">'; // Comenzamos la tabla

    // Mostrar los primeros dos datos en una fila con cuatro columnas

  const idynombre = Object.keys(hechizoActual).slice(0, 2);
    hechizoHTML += '<tr style="background-color:#8a3ab9">';
    idynombre.forEach((key, index) => {
      if (index % 2 === 0) {
        hechizoHTML += `<th colspan="1"><strong>${key}</strong>: ${hechizoActual[key]}</th>`;
      } else {
        hechizoHTML += `<th colspan="3"><strong>${key}</strong>: ${hechizoActual[key]}</th></tr><tr>`; // Cerrar y abrir una nueva fila
      }
    });
    hechizoHTML += '</tr>';



    const primerasFilas = Object.keys(hechizoActual).slice(2, 4);
        hechizoHTML += '<tr>';
    primerasFilas.forEach((key, index) => {
      if (index % 2 === 0) {
        hechizoHTML += `<td colspan="3"><strong>${key}</strong>: ${hechizoActual[key]}</td>`;
      } else {
        hechizoHTML += `<td colspan="1" style="text-align:center;"><strong>${key}</strong>: ${hechizoActual[key]}</td></tr><tr>`; // Cerrar y abrir una nueva fila
      }
    });
    hechizoHTML += '</tr>';
/*
    primerasFilas.forEach(key => {
          hechizoHTML += '<tr>';
      hechizoHTML += `<td colspan="4"><strong>${key}</strong>: ${hechizoActual[key]}</td>`;
       hechizoHTML += '</tr>';
    });
*/

    // Mostrar los siguientes cuatro datos de a dos en dos
    const siguientesDatos = Object.keys(hechizoActual).slice(4, 6);
    hechizoHTML += '<tr>';
    siguientesDatos.forEach((key, index) => {
      if (index % 2 === 0) {
        hechizoHTML += `<td colspan="2"><strong>${key}</strong>: ${hechizoActual[key]}</td>`;
      } else {
        hechizoHTML += `<td colspan="2"><strong>${key}</strong>: ${hechizoActual[key]}</td></tr><tr>`; // Cerrar y abrir una nueva fila
      }
    });
    hechizoHTML += '</tr>';

    // Mostrar el resto de los datos de a cuatro por fila
    const restoDatos = Object.keys(hechizoActual).slice(6);
    for (let i = 0; i < restoDatos.length; i += 4) {
      hechizoHTML += '<tr>'; // Comenzar una nueva fila
      for (let j = i; j < i + 4; j++) {
        if (restoDatos[j]) {
          hechizoHTML += `<td><strong>${restoDatos[j]}</strong>: ${hechizoActual[restoDatos[j]]}</td>`;
        } else {
          hechizoHTML += `<td></td>`; // Agregar celdas vacías si no hay más datos
        }
      }
      hechizoHTML += '</tr>'; // Cerrar la fila
    }

    hechizoHTML += '</table>';
    hechizoDiv.innerHTML = hechizoHTML;

 // Actualizar el número del hechizo actual
    const numeroHechizoDiv = document.getElementById('numeroHechizo');
    numeroHechizoDiv.textContent = `${index + 1}/${numeroTotalHechizos}`;
  } else {
    console.log('Índice de hechizo fuera de rango:', index);
  }
  agregarBotonReproduccion() 
}

function agregarBotonReproduccion() {
  const tablaHechizos = document.getElementById('tablaHechizos');
  const filas = tablaHechizos.getElementsByTagName('tr');

  for (let i = 0; i < filas.length; i++) {
    const celdas = filas[i].getElementsByTagName('td');
    for (let j = 0; j < celdas.length; j++) {
      const textoCelda = celdas[j].textContent.trim();
      if (textoCelda.includes('WAV')) {
        // Encontramos la celda que contiene el campo "WAV"
        // Extraemos el número del WAV
        const numeroWAV = textoCelda.match(/\d+/);
        if (numeroWAV) {

          // Creamos el elemento de reproducción
const simboloReproduccion = document.createElement('span');
simboloReproduccion.id='play';
simboloReproduccion.innerHTML = '&#9654;&#xFE0E;'; // Símbolo de reproducción (U+25B6) con variante de estilo FE0E para forzar texto

          // Agregamos el evento de reproducción al hacer clic en el símbolo
          simboloReproduccion.addEventListener('click', () => {
            const audio = new Audio(`./WAV/${numeroWAV}.wav`);
            audio.play()
              .then(() => console.log('Sonido reproduciéndose...'))
              .catch(error => console.error('Error al reproducir el sonido:', error));
          });

          // Agregamos el botón de reproducción junto al contenido existente en la celda
          const contenidoExistente = celdas[j].innerHTML;
          celdas[j].innerHTML = contenidoExistente + ' '; // Añadimos un espacio para separar el contenido existente del botón
          celdas[j].appendChild(simboloReproduccion);
        }
      }
    }
  }
}



// Función para cargar la lista de hechizos
const hechizosPorPagina = 30;
let paginaActual = 0;

function cargarListaHechizos() {
  const listaHechizos = document.getElementById('listaHechizos');
  listaHechizos.innerHTML = '';

  const inicio = paginaActual * hechizosPorPagina;
  const fin = Math.min(inicio + hechizosPorPagina, hechizos.length);
  const hechizosPagina = hechizos.slice(inicio, fin);

  hechizosPagina.forEach((hechizo, index) => {
    const nombreHechizo = hechizo.Nombre;
    const enlaceHechizo = document.createElement('a');
    enlaceHechizo.textContent = nombreHechizo;
    enlaceHechizo.href = '#';
    enlaceHechizo.addEventListener('click', (event) => {
      event.preventDefault();
      const indexGlobal = inicio + index;
      indiceActual = indexGlobal; // Actualizamos el índice actual
      mostrarHechizo(indiceActual);
    });
    const itemLista = document.createElement('li');
    itemLista.appendChild(enlaceHechizo);
    listaHechizos.appendChild(itemLista);

    const numeroHechizo = inicio + index + 1;
    const numeroItem = document.createElement('span');
    numeroItem.textContent = `${numeroHechizo}. `;
    itemLista.insertBefore(numeroItem, enlaceHechizo);
  });

  actualizarBotonesPaginacion();
}

function actualizarBotonesPaginacion() {
  const botonAnterior = document.getElementById('anteriorPagina');
  const botonSiguiente = document.getElementById('siguientePagina');

  botonAnterior.disabled = paginaActual === 0;
  botonSiguiente.disabled = paginaActual === Math.ceil(hechizos.length / hechizosPorPagina) - 1;
}




document.getElementById('anteriorPagina').addEventListener('click', () => {
  if (paginaActual > 0) {
    paginaActual--;
    cargarListaHechizos();
  }
});

document.getElementById('siguientePagina').addEventListener('click', () => {
  if (paginaActual < Math.ceil(hechizos.length / hechizosPorPagina) - 1) {
    paginaActual++;
    cargarListaHechizos();
  }
});

document.getElementById('anteriorPagina').addEventListener('click', () => {
  if (paginaActual > 0) {
    paginaActual--;
    cargarListaHechizos();
  }
});

document.getElementById('siguientePagina').addEventListener('click', () => {
  if (paginaActual < Math.ceil(hechizos.length / hechizosPorPagina) - 1) {
    paginaActual++;
    cargarListaHechizos();
  }
});



document.getElementById('siguiente').addEventListener('click', () => {
  indiceActual = (indiceActual + 1) % hechizos.length;
  mostrarHechizo(indiceActual);
});
document.getElementById('anterior').addEventListener('click', () => {
  if (indiceActual === 0) {
    indiceActual = hechizos.length - 1;
  } else {
    indiceActual--;
  }
  mostrarHechizo(indiceActual);
});


/************** EXPORTAR *******************/

function exportarTodoJSON() {
  const datosJSON = JSON.stringify(hechizos, null, 2);
  const blob = new Blob([datosJSON], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const linkDescarga = document.createElement('a');
  linkDescarga.href = url;
  linkDescarga.download = 'exportado_hechizos.json';
  document.body.appendChild(linkDescarga);
  linkDescarga.click();
  document.body.removeChild(linkDescarga);
  URL.revokeObjectURL(url);
}
document.getElementById('exportarTodoJSON').addEventListener('click', exportarTodoJSON);


function exportarHechizoJSON() {
  const hechizoActual = hechizos[indiceActual];
  if (hechizoActual) {
    const datosJSON = JSON.stringify(hechizoActual, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const linkDescarga = document.createElement('a');
    linkDescarga.href = url;
    linkDescarga.download = `exportado_${hechizoActual.Nombre.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(linkDescarga);
    linkDescarga.click();
    document.body.removeChild(linkDescarga);
    URL.revokeObjectURL(url);
  } else {
    console.error('No hay ningún hechizo actual para exportar.');
  }
}

document.getElementById('exportarHechizoJSON').addEventListener('click', exportarHechizoJSON);


//exportar normal
function exportarHechizoAO() {
    const hechizoActual = hechizos[indiceActual];
    let contenidoArchivo = '';

    for (const key in hechizoActual) {
        if (Object.hasOwnProperty.call(hechizoActual, key)) {
            const value = hechizoActual[key];
            if (key === 'Id') {
                contenidoArchivo += `${value}\n`; 
            } else {
                contenidoArchivo += `${key}=${value}\n`;
            }
        }
    }

    const blob = new Blob([contenidoArchivo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exportado_${hechizoActual.Nombre.replace(/\s+/g, '_')}_formatoao.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('exportarHechizoAO').addEventListener('click', exportarHechizoAO);




//exportar a array

function exportarHechizoArray() {
    const hechizoActual = hechizos[indiceActual];
    console.log(hechizoActual);
    const campos = ['Id', 'Nombre', 'Desc', 'PalabrasMagicas', 'HechizeroMsg', 'PropioMsg', 'TargetMsg', 'Tipo', 'WAV', 'FXgrh', 'Loops',
        'MinSkill', 'ManaRequerido', 'StaRequerido', 'Target', 'SubeHP', 'MinHP', 'MaxHP', 'SubeMana', 'MinMana',
        'MaxMana', 'SubeSta', 'MinSta', 'MaxSta', 'SubeHam', 'MinHam', 'MaxHam', 'SubeSed', 'MinSed', 'MaxSed',
        'SubeAG', 'MinAG', 'MaxAG', 'SubeFU', 'MinFU', 'MaxFU', 'SubeCA', 'MinCA', 'MaxCA', 'Invisibilidad',
        'Paraliza', 'Inmoviliza', 'RemoverParalisis', 'RemoverEstupidez', 'RemueveInvisibilidadParcial', 'CuraVeneno',
        'Envenena', 'Revivir', 'Ceguera', 'Estupidez', 'Invoca', 'NumNpc', 'Cant', 'Mimetiza', 'Materializa',
        'itemindex', 'StaffAffected', 'NeedStaff', 'Resis'
    ];

      const valoresHechizo = campos.map(campo => {
        if (campo === 'Nombre' || campo === 'Desc' || campo === 'PalabrasMagicas' || campo === 'HechizeroMsg' || campo === 'PropioMsg' || campo === 'TargetMsg') {
            return hechizoActual[campo] || '';
        } else {
            return hechizoActual[campo] || "0";
        }
    });

    const contenidoArchivo = JSON.stringify(valoresHechizo);

    const blob = new Blob([contenidoArchivo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exportado_${hechizoActual.Nombre.replace(/\s+/g, '_')}_array.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('exportarHechizoArray').addEventListener('click', exportarHechizoArray);


function exportarTodoArrays() {
       const hechizosArray = hechizos.map(hechizo => {
        return [
            hechizo.Id || '',
            hechizo.Nombre || '',
            hechizo.Desc || '',
            hechizo.PalabrasMagicas || '',
            hechizo.HechizeroMsg || '',
            hechizo.PropioMsg || '',
            hechizo.TargetMsg || '',
            hechizo.Tipo || "0",
            hechizo.WAV || "0",
            hechizo.FXgrh || "0",
            hechizo.Loops || "0",
            hechizo.MinSkill || "0",
            hechizo.ManaRequerido || "0",
            hechizo.StaRequerido || "0",
            hechizo.Target || "0",
            hechizo.SubeHP || "0",
            hechizo.MinHP || "0",
            hechizo.MaxHP || "0",
            hechizo.SubeMana || "0",
            hechizo.MinMana || "0",
            hechizo.MaxMana || "0",
            hechizo.SubeSta || "0",
            hechizo.MinSta || "0",
            hechizo.MaxSta || "0",
            hechizo.SubeHam || "0",
            hechizo.MinHam || "0",
            hechizo.MaxHam || "0",
            hechizo.SubeSed || "0",
            hechizo.MinSed || "0",
            hechizo.MaxSed || "0",
            hechizo.SubeAG || "0",
            hechizo.MinAG || "0",
            hechizo.MaxAG || "0",
            hechizo.SubeFU || "0",
            hechizo.MinFU || "0",
            hechizo.MaxFU || "0",
            hechizo.SubeCA || "0",
            hechizo.MinCA || "0",
            hechizo.MaxCA || "0",
            hechizo.Invisibilidad || "0",
            hechizo.Paraliza || "0",
            hechizo.Inmoviliza || "0",
            hechizo.RemoverParalisis || "0",
            hechizo.RemoverEstupidez || "0",
            hechizo.RemueveInvisibilidadParcial || "0",
            hechizo.CuraVeneno || "0",
            hechizo.Envenena || "0",
            hechizo.Revivir || "0",
            hechizo.Ceguera || "0",
            hechizo.Estupidez || "0",
            hechizo.Invoca || "0",
            hechizo.NumNpc || "0",
            hechizo.Cant || "0",
            hechizo.Mimetiza || "0",
            hechizo.Materializa || "0",
            hechizo.itemindex || "0",
            hechizo.StaffAffected || "0",
            hechizo.NeedStaff || "0",
            hechizo.Resis || "0"
        ];
    });

const contenidoArchivo = '[\n' + hechizosArray.map(arr => '\t[' + arr.map(item => typeof item === 'string' ? `"${item}"` : item).join(',') + ']').join(',\n\n') + '\n]';

    const blob = new Blob([contenidoArchivo], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exportado_hechizos_arrays.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

document.getElementById('exportarTodoArrays').addEventListener('click', exportarTodoArrays);
