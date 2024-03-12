    document.getElementById("exportarHechizoAO").addEventListener("click", exportarHechizoAO);
        document.getElementById("exportarHechizoArray").addEventListener("click", exportarHechizoArray);
document.getElementById("exportarHechizoJSON").addEventListener("click", exportarHechizoJSON);



function exportarHechizoJSON() {
    let datosHechizo = obtenerDatosFormulario();
     let nombreHechizo = datosHechizo.nombre.replace(/\s/g, "_");
    let datosJSON = JSON.stringify(datosHechizo);
    let enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = "data:application/json;charset=utf-8," + encodeURIComponent(datosJSON);
    enlaceDescarga.download = nombreHechizo+".json";
    enlaceDescarga.style.display = "none";
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
}



        function exportarHechizoArray() {
            let hechizoArgentumOnline = datosArray();
            let nombreHechizo = obtenerDatosFormulario().nombre.replace(/\s/g, "_"); 
            let enlaceDescarga = document.createElement("a");
            enlaceDescarga.href = "data:text/plain;charset=utf-8," + encodeURIComponent(hechizoArgentumOnline);
            enlaceDescarga.download = nombreHechizo+"_formato_array.txt";
            enlaceDescarga.style.display = "none";
            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();
            document.body.removeChild(enlaceDescarga);
        }




function datosArray() {
  let datos = obtenerDatosFormulario();
    let arrayAO = formateoArray(datos);
    console.log(arrayAO);
    const contenidoArchivo = JSON.stringify(arrayAO);
    return contenidoArchivo;
}



function formateoArray(datos) {
    let valores = [];
    for (let propiedad in datos) {
        valores.push(datos[propiedad]);
    }
    return valores;
}

        function exportarHechizoAO() {
      let datosHechizo = obtenerDatosFormulario();
    let nombreHechizo = datosHechizo.nombre.replace(/\s/g, "_"); // Reemplazar espacios con guiones bajos para el nombre del archivo
    let hechizoArgentumOnline = datosAO();

            let enlaceDescarga = document.createElement("a");
            enlaceDescarga.href = "data:text/plain;charset=utf-8," + encodeURIComponent(hechizoArgentumOnline);
            enlaceDescarga.download = nombreHechizo+"_formato_ao.txt";
            enlaceDescarga.style.display = "none";
            document.body.appendChild(enlaceDescarga);
            enlaceDescarga.click();
            document.body.removeChild(enlaceDescarga);
        }



function datosAO() {
  let datos = obtenerDatosFormulario();
    let formateadoAO = formateoAo(datos);
    console.log(formateadoAO);
    return formateadoAO;
}



function formateoAo(datos) {
    let hechizoFormatoAo = '';
    for (let propiedad in datos) {
        hechizoFormatoAo += `${propiedad}=${datos[propiedad]}\n`;
    }
    return hechizoFormatoAo;
}


function obtenerDatosFormulario() {
    let datos = {};
    datos.id = document.querySelector('input[name="id"]').value;
    datos.nombre = document.querySelector('input[name="nombre"]').value;
    datos.desc = document.querySelector('textarea[name="desc"]').value;
    datos.palabrasMagicas = document.querySelector('input[name="palabras_magicas"]').value;
    datos.hechizeroMsg = document.querySelector('input[name="hechizero_msg"]').value;
    datos.propioMsg = document.querySelector('input[name="propio_msg"]').value;
    datos.targetMsg = document.querySelector('input[name="target_msg"]').value;
    datos.tipo = document.querySelector('input[name="tipo"]').value;
    datos.wav = document.querySelector('select[name="wav"]').value;
    datos.fxGrh = document.querySelector('input[name="fx_grh"]').value;
    datos.loops = document.querySelector('input[name="loops"]').value;
    datos.minSkill = document.querySelector('input[name="min_skill"]').value;
    datos.manaRequerido = document.querySelector('input[name="mana_requerido"]').value;
    datos.staRequerido = document.querySelector('input[name="sta_requerido"]').value;
    datos.target = document.querySelector('input[name="target"]').value;
    datos.subeHP = document.querySelector('input[name="sube_hp"]').value;
    datos.minHP = document.querySelector('input[name="min_hp"]').value;
    datos.maxHP = document.querySelector('input[name="max_hp"]').value;
    datos.subeMana = document.querySelector('input[name="sube_mana"]').value;
    datos.minMana = document.querySelector('input[name="min_mana"]').value;
    datos.maxMana = document.querySelector('input[name="max_mana"]').value;
    datos.subeSta = document.querySelector('input[name="sube_sta"]').value;
    datos.minSta = document.querySelector('input[name="min_sta"]').value;
    datos.maxSta = document.querySelector('input[name="max_sta"]').value;
    datos.subeHam = document.querySelector('input[name="sube_ham"]').value;
    datos.minHam = document.querySelector('input[name="min_ham"]').value;
    datos.maxHam = document.querySelector('input[name="max_ham"]').value;
    datos.subeSed = document.querySelector('input[name="sube_sed"]').value;
    datos.minSed = document.querySelector('input[name="min_sed"]').value;
    datos.maxSed = document.querySelector('input[name="max_sed"]').value;
    datos.subeAG = document.querySelector('input[name="sube_ag"]').value;
    datos.minAG = document.querySelector('input[name="min_ag"]').value;
    datos.maxAG = document.querySelector('input[name="max_ag"]').value;
    datos.subeFU = document.querySelector('input[name="sube_fu"]').value;
    datos.minFU = document.querySelector('input[name="min_fu"]').value;
    datos.maxFU = document.querySelector('input[name="max_fu"]').value;
    datos.subeCA = document.querySelector('input[name="sube_ca"]').value;
    datos.minCA = document.querySelector('input[name="min_ca"]').value;
    datos.maxCA = document.querySelector('input[name="max_ca"]').value;
    datos.invisibilidad = document.querySelector('input[name="invisibilidad"]').value;
    datos.paraliza = document.querySelector('input[name="paraliza"]').value;
    datos.inmoviliza = document.querySelector('input[name="inmoviliza"]').value;
    datos.removerParalisis = document.querySelector('input[name="remover_paralisis"]').value;
    datos.removerEstupidez = document.querySelector('input[name="remover_estupidez"]').value;
    datos.remueveInvisibilidadParcial = document.querySelector('input[name="remueve_invisibilidad_parcial"]').value;
    datos.curaVeneno = document.querySelector('input[name="cura_veneno"]').value;
    datos.envenena = document.querySelector('input[name="envenena"]').value;
    datos.revivir = document.querySelector('input[name="revivir"]').value;
    datos.ceguera = document.querySelector('input[name="ceguera"]').value;
    datos.estupidez = document.querySelector('input[name="estupidez"]').value;
    datos.invoca = document.querySelector('input[name="invoca"]').value;
    datos.numNpc = document.querySelector('input[name="num_npc"]').value;
    datos.cant = document.querySelector('input[name="cant"]').value;
    datos.mimetiza = document.querySelector('input[name="mimetiza"]').value;
    datos.materializa = document.querySelector('input[name="materializa"]').value;
    datos.itemindex = document.querySelector('input[name="itemindex"]').value;
    datos.staffAffected = document.querySelector('input[name="staff_affected"]').value;
    datos.needStaff = document.querySelector('input[name="need_staff"]').value;
    datos.resis = document.querySelector('input[name="resis"]').value;

    return datos;
}

